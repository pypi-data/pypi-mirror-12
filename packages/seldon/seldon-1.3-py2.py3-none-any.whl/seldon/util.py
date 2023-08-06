import seldon.fileutil as fu
import os.path
import logging
import shutil 
from sklearn.externals import joblib
import logging
import random

logger = logging.getLogger('seldon.util')


class Recommender(object):
    """
    General recommendation interface
    """

    def recommend(self,user,ids,recent_interactions,client,limit):
        """
        Parameters
        ----------

        user : long
           user id
        ids : list(long)
           item ids to score
        recent_interactions : list(long)
           recent items the user has interacted with
        client : str
           name of client to recommend for (business group, company, product..)
        limit : int
           number of recommendations to return


        Returns
        -------
        list of pairs of (item_id,score)
        """
        return []

    def save(self,folder):
        """
        Save the recommender model. Allows more fine grained control over model state saving than pickling would allow.

        Parameters
        ----------
        
        folder : str
           local folder to save model
        """
        pass

    def load(self,folder):
        """
        Load the model into the recommender. Allows more complex models than can easily handled via pickling.

        Parameters
        ----------

        folder : str
           local folder to load model
        """
        return self

class Recommender_wrapper(object):
    """
    Wrapper to allow recommenders to be easily saved and loaded
    """
    def __init__(self,work_folder="/tmp",aws_key=None,aws_secret=None):
        self.work_folder=work_folder
        self.aws_key=aws_key
        self.aws_secret=aws_secret

    def get_work_folder(self):
        return self.work_folder

    def create_work_folder(self):
        if not os.path.exists(self.work_folder):
            logger.info("creating %s",self.work_folder)
            os.makedirs(self.work_folder)

    def save_recommender(self,recommender,location):
        """
        Save recommender to external location

        Parameters
        ----------

        recommender : Recommender 
           recommender to be saved
        location : str
           external folder to save recommender
        """
        self.create_work_folder()
        rint = random.randint(1,999999)
        recommender_folder = self.work_folder+"/recommender_tmp"+str(rint)
        if not os.path.exists(recommender_folder):
            logger.info("creating folder %s",recommender_folder)
            os.makedirs(recommender_folder)
        tmp_file = recommender_folder+"/rec"
        joblib.dump(recommender,tmp_file)
        recommender.save(recommender_folder)
        futil = fu.FileUtil(key=self.aws_key,secret=self.aws_secret)
        futil.copy(recommender_folder,location)


    def load_recommender(self,recommender_folder):
        """
        Load scikit learn recommender from external folder
        
        Parameters
        ----------

        recommender_folder : str
           external folder holding recommender
        """
        self.create_work_folder()
        rint = random.randint(1,999999)
        local_recommender_folder = self.work_folder+"/recommender_tmp"+str(rint)
        if not os.path.exists(local_recommender_folder):
            logger.info("creating folder %s",local_recommender_folder)
            os.makedirs(local_recommender_folder)
        futil = fu.FileUtil(key=self.aws_key,secret=self.aws_secret)
        futil.copy(recommender_folder,local_recommender_folder)
        recommender =  joblib.load(local_recommender_folder+"/rec")
        recommender.load(local_recommender_folder)
        return recommender
