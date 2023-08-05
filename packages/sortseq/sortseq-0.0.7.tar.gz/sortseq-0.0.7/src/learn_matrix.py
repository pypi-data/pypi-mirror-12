#!/usr/bin/env python

'''A script which produces linear energy matrix models for a given data set.'''
from __future__ import division
#Our standard Modules
import argparse
import numpy as np
import scipy as sp
import sys
#Our miscellaneous functions
import pandas as pd
import sortseq.utils as utils
import sortseq.Models as Models
from sklearn import linear_model
import sortseq.EstimateMutualInfo as EstimateMutualInfo
import sortseq.EstimateMutualInfoforMImax as EstimateMutualInfoforMImax
from sklearn.grid_search import GridSearchCV
import pymc
import sortseq.stepper as stepper
#The profile_counts module also allows us to determine wt sequence
import sortseq.profile_counts as profile_counts
import sortseq.profile_freqs as profile_freqs

class score_MI():
    def __call__(self,estimator,X,y,sample_weight=None):
        mymodel = Models.RaveledModel(estimator.coef_)
        expression = mymodel.genexp(X)
        if isinstance(sample_weight,(list,np.ndarray)):
            expression,y = utils.expand_sw(expression,y,sample_weight)            
        rankexpression,batch = utils.shuffle_rank(expression,y)
        
        MI,V = EstimateMutualInfo.EstimateMI(
            rankexpression,batch,'Continuous','Discrete')
        return MI
    

def MaximizeMI(
        seq_mat,batch,emat_0,db=None,burnin=1000,iteration=30000,thin=10,
        runnum=0):    
    @pymc.stochastic(observed=True,dtype=int)
    def sequences(value=seq_mat):
        return 0
    @pymc.stochastic(observed=True,dtype=int)
    def batches(value=batch):
        return 0
    @pymc.stochastic(dtype=float)
    def emat(s=sequences,b=batches,value=emat_0):               
        dot = value[:,:,sp.newaxis]*s
        expression = dot.sum(0).sum(0)                    
        rankexpression,batch = utils.shuffle_rank(expression,b)        
        n_seqs = len(b)     
        MI = EstimateMutualInfoforMImax.alternate_calc_MI(rankexpression,batch)
        return n_seqs*MI
    if db:
        dbname = db + '_' + str(runnum) + '.sql'
	M = pymc.MCMC([sequences,batches,emat],db='sqlite',dbname=dbname)
    else:
	M = pymc.MCMC([sequences,batches,emat])
    M.use_step_method(stepper.GaugePreservingStepper,emat)
    M.sample(iteration,thin=thin)
    emat_mean = np.mean(M.trace('emat')[burnin:],axis=0)
    return emat_mean

def Berg_von_Hippel(df,foreground=1,background=0):
    '''Learn models using berg von hippel model. The foreground sequences are
         usually bin_1 and background in bin_0, this can be changed via flags.''' 
    #foreground_counts = profile_counts.main(df,'dna',bin_k=foreground)
    foreground_freqs = profile_freqs.main(df,'dna',bin_k=foreground)
    #background_counts = profile_counts.main(df,'dna',bin_k=background)
    background_freqs = profile_freqs.main(df,'dna',bin_k=background)
    
    output_df = -np.log(foreground_freqs/background_freqs)
    
    return output_df


def Lasso_CV(raveledmat,batch):
    '''Use lasso regression to learn the model, we do cross validation 
        to maximize mutual info'''
    grid = GridSearchCV(
        linear_model.Lasso(),{'alpha': np.logspace(-5.5, -2, 30)},
        refit=True,scoring=score_MI())
    grid.fit(raveledmat,batch)  
    return emat


def Compute_Least_Squares(raveledmat,batch,sw):
    '''Ridge regression is the only sklearn regressor that supports sample
        weights, which will make this much faster'''
    clf = linear_model.Ridge(alpha=0)
    clf.fit(raveledmat,batch,sample_weight=sw)
    emat = clf.coef_
    return emat

def main(
        df,dicttype,lm,db=None,iteration=30000,burnin=1000,thin=10,runnum=0,
        exptype='sortseq',initialize='Rand',start=0,end=None,foreground=1,
        background=0):
    
    seq_dict,inv_dict = utils.choose_dict(dicttype)
    par_seq_dict = {v:k for v,k in seq_dict.items() if k != (len(seq_dict)-1)}
    df['seq'] = df['seq'].str.slice(start,end)
    df = utils.collapse_further(df)
    col_headers = utils.get_column_headers(df)
    if 'ct' not in df.columns:
            df['ct'] = df[col_headers].sum(axis=1)
    df = df[df.ct != 0]        
    df.reset_index(inplace=True,drop=True)
    if end:
        df = df[df['seq'].apply(len) == (end-start)]
    df.reset_index(inplace=True,drop=True)
    #Drop any sequences with incorrect length
    if not end:
        seqL = len(df['seq'][0]) - start
    else:
        seqL = end-start
    df = df[df.seq.apply(len) == (seqL)]
    df.reset_index(inplace=True,drop=True)
    if lm == 'bvh':
        emat = Berg_von_Hippel(df,foreground=foreground,background=background)
    if lm == 'leastsq':                   
        raveledmat,batch,sw = utils.genweightandmat(df,par_seq_dict)        
        emat = Compute_Least_Squares(raveledmat,batch,sw)   
    if lm == 'lasso':
        raveledmat,batch = utils.genlassomat(df,'1Point',par_seq_dict)
        emat = Lasso_CV(raveledmat,batch)
    if lm == 'mi':
        #choose starting point for MCMC
        if initialize == 'Rand':
            emat_0 = utils.RandEmat(len(df['seq'][0]),len(seq_dict))
        elif initialize == 'LeastSquares':
            raveledmat,batch,sw = utils.genweightandmat(df,par_seq_dict)
            emat_0 = Compute_Least_Squares(raveledmat,batch,sw)
            emat_0 = utils.emat_typical_parameterization(emat_0,len(seq_dict))
        seq_mat,batch = utils.array_seqs_weights(df,seq_dict) 
        #pymc doesn't take sparse mat        
        emat = MaximizeMI(
        seq_mat,batch,emat_0,db=db,iteration=iteration,burnin=burnin,
        thin=thin,runnum=runnum)
    wtseq = profile_counts.main(df,dicttype,return_wtseq=True)
    # The different learning methods produce different formats for the emat
    cols = ['val_' + inv_dict[i] for i in range(len(seq_dict))]
    if lm == 'mi':
        emat_typical = emat
        energy = np.sum(utils.seq2mat(wtseq,seq_dict)*emat_typical)
    elif lm == 'bvh': 
        '''the emat for this format is currently transposed compared to other formats
        it is also already a data frame with columns [pos,freq_...]'''
        freq_cols = ['freq_' + inv_dict[i] for i in range(len(seq_dict))]
        emat_typical = emat[freq_cols]
        energy = ((utils.seq2mat(wtseq,seq_dict)).transpose()*(emat_typical)).sum().sum()
        
    else:
        emat_typical = utils.emat_typical_parameterization(emat,len(seq_dict))
        energy = np.sum(utils.seq2mat(wtseq,seq_dict)*emat_typical)
    #if wt energy is not negative, then negate the matrix
    
    if energy < 0:
        emat_typical = -emat_typical
    em = pd.DataFrame(emat_typical)
    if lm != 'bvh':
        em = em.transpose()
    em.columns = cols 
    pos = pd.Series(range(start,start + len(df['seq'][0])),name='pos')    
    output_df = pd.concat([pos,em],axis=1)
    return output_df

# Define commandline wrapper
def wrapper(args):        

    if args.i:
        df = pd.io.parsers.read_csv(args.i,delim_whitespace=True)
    else:
        df = pd.io.parsers.read_csv(sys.stdin,delim_whitespace=True)
    
    output_df = main(df,args.type,args.learningmethod,db=args.db_filename,
        iteration=args.numiterations,burnin=args.
        burnin,thin=args.thin,start=args.start,end=args.end,
        runnum=args.runnum,exptype=args.exptype,initialize=args.initialize,
        foreground=args.foreground,background=args.background)
    if args.out:
        outloc = open(args.out,'w')
    else:
        outloc = sys.stdout
    pd.set_option('max_colwidth',int(1e8))
    output_df.to_string(
        outloc, index=False,col_space=10,float_format=utils.format_string)

# Connects argparse to wrapper
def add_subparser(subparsers):
    p = subparsers.add_parser('learn_matrix')
    p.add_argument(
        '-s','--start',type=int,default=0,
        help ='Position to start your analyzed region')
    p.add_argument(
        '-e','--end',type=int,default = None,
        help='Position to end your analyzed region')
    p.add_argument(
        '-t', '--type', choices=['dna','rna','protein'], default='dna')
    p.add_argument(
        '-et','--exptype',choices=['sortseq','mpra','selection'],
        default='sortseq',help='''Type of experiment.''')
    p.add_argument(
        '-lm','--learningmethod',choices=['bvh','leastsq','lasso','mi'],
        default='leastsq',
        help = '''Algorithm for determining matrix parameters.''')
    p.add_argument(
        '-fg','--foreground',default=1,type=int,help='''The sequence bin to use
        as foreground for the berg-von-hippel model''')
    p.add_argument(
        '-bg','--background',default=0,type=int,help='''The sequence bin to use
        as background for the berg-von-hippel model''')
    p.add_argument(
        '--initialize',default='Rand',choices=['Rand','LeastSquares'],
        help='''How to choose starting point for MCMC''')
    p.add_argument(
        '-rn','--runnum',default=0,help='''For multiple runs this will change
        output data base file name''')            
    p.add_argument(
        '-db','--db_filename',default=None,help='''For mi, If you wish to save
        the trace in a database, put the name of the sqlite data base''')
    p.add_argument(
        '-iter','--numiterations',type = int,default=30000,
        help='''For mi, Number of MCMC iterations''')
    p.add_argument(
        '-b','--burnin',type = int, default=1000,
        help='For mi, Number of burn in iterations')
    p.add_argument(
        '-th','--thin',type=int,default=10,help='''For mi, this option will 
        set the number of iterations during which only 1 iteration 
        will be saved.''')
    p.add_argument(
        '-i','--i',default=False,help='''Read input from file instead 
        of stdin''')
    p.add_argument('-o', '--out', default=None)
    p.set_defaults(func=wrapper)
