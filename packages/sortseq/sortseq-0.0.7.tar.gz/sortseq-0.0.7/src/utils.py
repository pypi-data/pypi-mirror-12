from __future__ import division
import sys
import numpy as np
import scipy as sp
import scipy.ndimage
import pandas as pd

def sample(weights,T_counts):
    '''Sample our library according to their energies'''
    emean = T_counts*weights/np.sum(weights)
    resampled_lib = np.random.poisson(lam=emean)
    return resampled_lib
    
def choose_dict(dicttype):
    '''Get numbering dictionary for either dna,rna, or proteins'''
    if dicttype == 'dna':
        seq_dict = {'A':0,'C':1,'G':2,'T':3}
        inv_dict = {0:'A',1:'C',2:'G',3:'T'}
    if dicttype == 'rna':
        seq_dict = {'A':0,'C':1,'G':2,'U':3}
        inv_dict = {0:'A',1:'C',2:'G',3:'U'}
    if dicttype == 'protein':
        seq_dict = {
            '*':0,'A':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'K':9,'L':10,
            'M':11,'N':12,'P':13,'Q':14,'R':15,'S':16,'T':17,'V':18,'W':19,'Y':20}
        inv_dict = {v:k for k,v in seq_dict.items()}
    return seq_dict,inv_dict

def get_column_headers(df,exptype=None):
    if exptype == 'sortseq':
        #will not include library bin
        nbins = 0    
        include = True
        while include:
            if 'ct_' + str(nbins+1) not in df.columns:
                break
            nbins = nbins + 1
        col_headers = ['ct_' + str(i+1) for i in range(nbins)] 
    elif (exptype == 'selex' or exptype == 'mpra' or exptype == 'dms'):
        #for these experiments only need library and expression bins
        col_headers = ['ct_0','ct_1'] 
    elif exptype == None:
        #Detect experiment type
        nbins = 0    
        include = True
        while include:
            if 'ct_' + str(nbins+1) not in df.columns:
                break
            nbins = nbins + 1
        
        col_headers = ['ct_' + str(i+1) for i in range(nbins)]
        if 'ct_0' in df.columns:
             col_headers = ['ct_0'] + col_headers
        if nbins == 1: #then exptype is not sort-seq
            col_headers = ['ct_0','ct_1']
              
    return col_headers

def collapse(df):
    '''Takes a list of sequences and batch numbers and returns DataFrame with seq, 
        ct, ct_0...ct_K. this only works for SortSeq type experiments'''
    # index them starting at 1
    df['batch'] = df['batch']-df['batch'].min() + 1
    output_df = pd.DataFrame()
    for i in range(1, df['batch'].max() + 1):
        thisbatch = df['seq'][df['batch']==i]
        output_df = pd.concat(
            [output_df,pd.Series(thisbatch.value_counts(),name='ct_'+str(i))],
            axis=1)
    batches = ['ct_' + str(i) for i in range(1, df['batch'].max()+1)]
    output_df['ct'] = np.sum(output_df[batches],axis=1)
    output_df = output_df.reset_index()
    output_df = output_df.rename(columns = {'index':'seq'})
    output_df = output_df.fillna(0)
    return output_df

def collapse_further(df):
    '''take clipped df and then collapse it further'''
    output_df = df.groupby('seq').sum()
    output_df = output_df.reset_index()
    #The evaluated column will now be incorrect, so we should delete it.
    try:
        output_df = output_df.drop('val',axis=1)
    except:
        pass   
    return output_df
        

def is_seq_valid(seq,seq_dict):
    # Checks validity of a sequence
    return set(seq).issubset(set(seq_dict.keys()))

def seq2matsparse(seq,par_seq_dict):
    #Parameterize each sequence and put into a sparse matrix
    seqlist = np.zeros(len(par_seq_dict)*len(seq))
    for i,bp in enumerate(seq):
        try:
            seqlist[i*(len(par_seq_dict)) + par_seq_dict[bp]] = 1
        except:
            pass
    return seqlist

def seq2mat2(seq): 
    ''' returns which parameters are true for the sequence, 
        where each parameter is a possible pairing'''
    pair_dict = {
        'AA':0,'AC':1, 'AG':2,'AT':3,'CA':4,'CC':5,'CG':6,
        'CT':7,'GA':8,'GC':9,'GG':10,'GT':11,'TA':12,'TC':13,'TG':14}
    pairlist = []
    lseq = len(seq)
    index = 0
    for i,bp in enumerate(seq):
        
        for z in range(i+1,lseq):
            if bp + seq[z] == 'TT':
                continue
            pairlist.append(index*15 + pair_dict[bp + seq[z]])
            index = index +1
    return pairlist

def remove_linear_elements(emat,seq_L):
    index = 0
    for i in range(seq_L):
        for z in range(i+1,seq_L):
            emat[index*15:index*15 + 4] = emat[index*15:index*15 + 4] - emat[index*15:index*15 + 4].mean()
            emat[index*15+4:index*15 + 8] = emat[index*15+4:index*15 + 8] - emat[index*15+4:index*15 + 8].mean()
            emat[index*15+8:index*15 + 12] = emat[index*15+8:index*15 + 12] - emat[index*15+8:index*15 + 12].mean()
            emat[index*15+12:index*15 + 15] = emat[index*15+12:index*15 + 15] - emat[index*15+12:index*15 + 15].mean()
    return emat

def seq2mat3(seq): 
    #Returns a parameterized matrix for 3 base pair interactions
    pair_dict = {'A':0,'C':1, 'G':2,'T':3}
    trilist = []
    lseq = len(seq)
    index = 0
    for i,bp in enumerate(seq):
        for z in range(i+1,lseq-1):
            for q in range(z+1,lseq):
                if bp + seq[z] + seq[q] == 'TTT':
                    continue
                trilist.append(
                    index*63 + pair_dict[bp]*16 + pair_dict[seq[z]]*4 + 
                    pair_dict[seq[q]])
                index = index +1
    return trilist  
    
def shuffle_rank(expression,y):
    # Shuffle then rank Order expression
    index_shuf = range(len(y))
    sp.random.shuffle(index_shuf)
    batchtemp = y[index_shuf]
    expressiontemp = expression[index_shuf]
    temp = expressiontemp.argsort()
    rankexpression = np.empty(len(y))
    rankexpression[temp] = np.arange(len(expressiontemp))/len(y)       
    return rankexpression,batchtemp

def genlassomat(df,modeltype,seq_dict): 
    '''generates a paramaterized form of the sequence in a csr matrix. This is for
        use in learn_matrix for lasso mat'''
    
    n_seqs = int(np.sum(df['ct']))
    batch = np.zeros(n_seqs,dtype=int)
    mut_region_length = len(df['seq'][0])
    #Find bin number    
    nbins = 0    
    include = True
    while include:
        if 'ct_' + str(nbins + 1) not in df.columns:
            break
        nbins = nbins + 1
    binheaders = ['ct_' + str(i + 1) for i in range(nbins)]
    #convert count columns to int
    df[binheaders] = df[binheaders].astype(int)
    if modeltype == '1Point':
            lasso_mat = sp.sparse.lil_matrix(
                (n_seqs,len(seq_dict)*mut_region_length))
            counter=0
            for i,s in enumerate(df['seq']):
                seqlist = seq2matsparse(s,seq_dict)
                for bnum, bh in enumerate(binheaders):
                    for c in range(df[bh][i]):
                        lasso_mat[counter,:] = seqlist
                        batch[counter] = bnum
                        counter = counter + 1
    '''
    #This section is for expanding the analysis to allow 2 and 3 point interactions
    elif modeltype == '2Point':
            lasso_mat = sp.sparse.lil_matrix((n_seqs,round(sp.misc.comb(mut_region_length,2))*15))
            for i,s in enumerate(seqs):
                lasso_mat[i,seq2mat2(s)] = 1
    elif modeltype == '3Point':
            lasso_mat = sp.sparse.lil_matrix((n_seqs,round(sp.misc.comb(mut_region_length,3))*63))
            for i,s in enumerate(seqs):
                lasso_mat[i,seq2mat3(s)] = 1
    '''
    return sp.sparse.csr_matrix(lasso_mat),batch

def expand_weights_array(expression,weights_arr):
    t_exp = np.zeros(np.sum(weights_arr))
    batch = np.zeros_like(t_exp)
    n_seqs,n_bins = weights_arr.shape
    counter = 0
    for i in range(n_seqs):
        for z in range(n_bins):
            t_exp[counter:counter+weights_arr[i,z]] = expression[i]
            batch[counter:counter+weights_arr[i,z]] = z
            counter = counter + weights_arr[i,z]
    return t_exp,batch

def expand_sw(expression,y,sample_weight):
    t_exp = np.zeros(np.sum(sample_weight))
    batch = np.zeros_like(t_exp,dtype=int)
    counter=0
    for i, sw in enumerate(sample_weight):
        t_exp[counter:counter+sample_weight[i]] = expression[i]
        batch[counter:counter+sample_weight[i]] = y[i]
        counter = counter+sample_weight[i]
    expression = t_exp
    y = batch
    return expression,y

def format_string(x):
    #This is how we control the format of our output DFs
    return '%10.6f' %x

def genweightandmat(df,seq_dict):
    '''For use with learn_matrix, linear regressions'''
    n_seqs = len(df['seq'])    
    mut_region_length = len(df['seq'][0])
    binheaders = get_column_headers(df)
    nbins=len(binheaders)
    #convert count columns to int
    df[binheaders] = df[binheaders].astype(int)
    lasso_mat = sp.sparse.lil_matrix((n_seqs,len(seq_dict)*mut_region_length))
    
    counter = 0
    sample_weights = np.zeros(n_seqs)
    batch = np.zeros(n_seqs)
    
    for i,s in enumerate(df['seq']):
             
             lasso_mat[i,:] = seq2matsparse(s,seq_dict)
                      
             batch[i] = np.sum([df[binheaders[z]][i]*z for z in range(nbins)]/df['ct'][i])
             sample_weights[i] = df['ct'][i]
             
    return sp.sparse.csr_matrix(lasso_mat),batch,sample_weights

def array_seqs_weights(df,seq_dict):
    '''This is for use with MCMC routines'''
    n_seqs = len(df['seq'])    
    mut_region_length = len(df['seq'][0])
    #Find bin number    
    binheaders = get_column_headers(df)
    nbins = len(binheaders)
    #convert count columns to int
    df[binheaders] = df[binheaders].astype(int)
    nentries = (df[binheaders]).sum().sum()
    #nentries = (df[binheaders] != 0).sum().sum()
    seq_mat = np.zeros([len(seq_dict),mut_region_length,nentries])
    counter = 0
    
    batch = np.zeros(nentries,dtype=int)
    for i,s in enumerate(df['seq']):
        for z in range(nbins):
             for q in range(df[binheaders[z]][i]):
                 seq_mat[:,:,counter] = seq2mat(s,seq_dict)
                 batch[counter] = z
                 counter = counter+1
    return seq_mat,batch

def get_PSSM_from_weight_matrix(emat,factor):
    """get position specific scoring matrix from weight matrix. There
    is an undetermined scale factor, which JBK suggests manually
    adjusting until getting a reasonable information content (say 1
    bit per bp).

    Assumes that negative energies -> better binding.
    """
    
    # need to reverse sign for PSSM
    emat = -emat
    # set lowest element to zero
    emat = emat - emat.min(axis=0)
    # exponentiate
    p = sp.exp(factor*emat)
    p = p/p.sum(axis=0)
    return p

def compute_PSSM_self_information(p):
    """Compute self information of a PSSM. See the wikipedia page on
    PSSMs, for instance."""
    return -sp.sum(p*sp.log(p))

def seq2mat(seq,seq_dict):
    '''Turn a sequence into a linear sequence matrix. This is for use with our
        linear energy matrices.'''
    mat = sp.zeros((len(seq_dict),len(seq)),dtype=int)
    for i,bp in enumerate(seq):
        mat[seq_dict[bp],i] = 1
    return mat

def parameterize_seq(seq,seq_dict):
    '''Different way to parameterize our sequence into a matrix. 
        We will use this for least squares regression. The energy matrix value 
        for all T entries is set to zero, and so all zeros in the matrix = T.'''
    
    mat = sp.zeros((len(seq_dict)-1,len(seq)),dtype=int)
    for i,bp in enumerate(seq):
        try:
            mat[seq_dict[bp],i] = 1
        except:
            pass
    return mat

def emat_typical_parameterization(emat,Ldict):
    '''Takes a parameterized emat (3xL_seq), and returns a 'typical' 
        energy matrix(4xL), with unit norm and average energy 0'''
    L = len(emat)/(Ldict-1)
    emat = emat.reshape([(Ldict-1),L],order='F')
    zmat = np.zeros(L)
    emat = np.vstack([emat,zmat])
    emat = fix_matrix_gauge(emat)
    return emat

def parameterize_emat(emat,Ldict):
    '''Turns 4xL typical Emat to a 3xL emat where all T values are set to zero''' 
    ematp = np.zeros([(Ldict-1),len(emat[0,:])])
    emat = emat - emat[(Ldict-1),:]
    ematp = emat[:(Ldict-1),:]
    return ematp


def fix_matrix_gauge(emat):
    """Fix gauge of an energy matrix such that the average value
    of each column is zero (columns correspond to positions), and
    overall matrix norm is equal to 1."""
    # fix mean
    for j in range(emat.shape[1]):
        emat[:,j] = emat[:,j] -sp.mean(emat[:,j])
    # fix inner product
    emat = emat/sp.sqrt(sp.sum(emat*emat))
    return emat


def RandEmat(L,Ldict):
    '''Makes 4xL random emat'''
    emat_0 = fix_matrix_gauge(sp.randn(Ldict,L))
    return emat_0

    
