import seldon.pipeline.pipelines as pl
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_selection import SelectKBest, chi2
import logging 

class Tfidf_transform(pl.Feature_transform):
    """create TF-IDF (term frequency - inverse document frequency) features. 

    can use chi-squared test to limit features. Assumes string based input feature that can be split.
    Uses scikit-learn based transformers internally

    Args:
        min_df (int): min document frequency (for sklearn vectorizer)

        max_df (float): max document frequency (for sklearn vectorizer)

        select_features (bool): use chi-squared test to select features

        topn_features (int): keep top features from chi-squared test

        stop_words (str): stop words (for sklearn vectorizer)

        target_feature (str): target feature for chi-squared test
    """
    def __init__(self,min_df=0,max_df=1.0,select_features=False,topn_features=50000,stop_words=None,target_feature=None):
        super(Tfidf_transform, self).__init__()
        self.min_df=min_df
        self.max_df=max_df
        self.select_features = select_features
        self.topn_features=topn_features
        self.stop_words = stop_words
        self.target_feature = target_feature
        self.ch2 = ""
        self.feature_names_support = []

    def get_models(self):
        return super(Tfidf_transform, self).get_models() + [(self.min_df,self.max_df,self.select_features,self.topn_features,self.stop_words,self.target_feature),self.vectorizer,self.tfidf_transformer,self.ch2,self.fnames,self.feature_names_support]
    
    def set_models(self,models):
        models = super(Tfidf_transform, self).set_models(models)
        (self.min_df,self.max_df,self.select_features,self.topn_features,self.stop_words,self.target_feature) = models[0]
        self.vectorizer = models[1]
        self.tfidf_transformer = models[2]
        self.ch2 = models[3]
        self.fnames = models[4]
        self.feature_names_support = models[5]

    def get_tokens(self,v):
        """basic method to get "document" string from feature
        """
        if isinstance(v, list):
            return " ".join([i if isinstance(i, basestring) else str(i) for i in v])
        elif isinstance(v,basestring):
            return v
        else:
            return str(v)


    
    def fit(self,df):
        self.vectorizer = CountVectorizer(min_df=self.min_df,max_df=self.max_df,stop_words=self.stop_words)
        self.tfidf_transformer = TfidfTransformer()
        print "getting docs"
        docs = df[self.input_feature].apply(self.get_tokens)
        print "running vectorizer"
        counts = self.vectorizer.fit_transform(docs.as_matrix())
        print "run tfidf transform"
        self.tfidf = self.tfidf_transformer.fit_transform(counts)
        self.fnames = self.vectorizer.get_feature_names()
        print "base tfidf features",len(self.fnames)
        if self.select_features:
            self.ch2 = SelectKBest(chi2, k=self.topn_features)
            self.ch2.fit_transform(self.tfidf, df[self.target_feature])
            self.feature_names_support = set([self.fnames[i] for i in self.ch2.get_support(indices=True)])
            print "selected tfidf features",len(self.feature_names_support)


    def create_tfidf(self,v):
        s = [self.get_tokens(v)]
        counts = self.vectorizer.transform(s)
        self.tfidf = self.tfidf_transformer.transform(counts)
        if self.select_features:
            self.ch2.transform(self.tfidf)
        doc_tfidf = {}
        for (col,val) in zip(self.tfidf[0].indices,self.tfidf[0].data):
            fname = self.fnames[col]
            if self.select_features:
                if fname in self.feature_names_support:
                    doc_tfidf[fname] = val
            else:
                doc_tfidf[fname] = val
        return doc_tfidf
        

    def transform(self,df):
        df[self.output_feature] = df[self.input_feature].apply(self.create_tfidf)
        return df



