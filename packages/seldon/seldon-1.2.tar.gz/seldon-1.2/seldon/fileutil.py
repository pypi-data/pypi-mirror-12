__authour__ = 'Clive Cox'
import sys
import zlib
import boto
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import glob
from shutil import copyfile
import os
import math
from filechunkio import FileChunkIO

class FileUtil:
    """utilities to input and output files. Locally or from AWS S3.

    Args:
        key [Optional(str)]: aws key

        secret [Optional(str)]: aws secret
    """
    def __init__(self, key = None, secret = None):
        self.key = key
        self.secret = secret

    def stream_decompress(self,stream):
        """decompress a stream
        """
        dec = zlib.decompressobj(16+zlib.MAX_WBITS)  # same as gzip module
        for chunk in stream:
            rv = dec.decompress(chunk)
            if rv:
                yield rv

    def stream_text(self,k,fn):
        """stream text line by line calling function for each line
        
        Args:
            k (file): input text file
            fn (function): function to call for each line
        """
        unfinished = ""
        for data in k:
            data = unfinished + data
            lines = data.split("\n");
            unfinished = lines.pop()
            for line in lines:
                fn(line)

    def stream_gzip(self,k,fn):
        """stream from gzip file and call function for each line
        
        Args:
            k (file): input gziped file
            fn (function): function to call for each line
        """
        unfinished = ""
        for data in self.stream_decompress(k):
            data = unfinished + data
            lines = data.split("\n");
            unfinished = lines.pop()
            for line in lines:
                fn(line)

    def getFolders(self,baseFolder,startDay,numDays):
        """construct list of folders for a range of days

        Args:
            baseFolder (str): base folder prefix
            startDay (int): start day inclusive
            numDays (int): number of day folders to list
        """
        folders = []
        for day in range(startDay-numDays+1,startDay+1):
            folders.append(baseFolder+str(day)+"/*")
        return folders


    def stream_local(self,folders,fn):
        """stream from local folders call a function

        Args:
            folders (list): list of folders
            fn (function): function to call
        """
        for folder in folders:
            for f in glob.glob(folder):
                k = open(f,"r")
                if f.endswith(".gz"):
                    self.stream_gzip(k,fn)
                else:
                    self.stream_text(k,fn)

    def copy_local(self,fromPath,toPath):
        """copy local folders

        Args:
            fromPath (str): local from path to copy all files under
            toPath (str): local destination folder (will be created if does not exist)
        """
        print "copy ",fromPath,"to",toPath
        if os.path.isfile(fromPath):
            dir = os.path.dirname(toPath)
            if len(dir) > 0 and not os.path.exists(dir):
                os.makedirs(dir)
            copyfile(fromPath,toPath)
        elif os.path.isdir(fromPath):
            if not os.path.exists(toPath):
                os.makedirs(toPath)
            for f in glob.glob(fromPath+"/*"):
                basename = os.path.basename(f)
                fnew = toPath+"/"+basename
                print "copying ",f,"to",fnew
                copyfile(f,fnew)

    def stream_s3(self,bucket,prefix,fn):
        """stream from an AWS S3 bucket all files under a prefix and call a function

        Args:
            bucket (str): name of S3 bucket
            prefix (str): prefix in bucket
            fn (function): function to call for each line
        """
        if self.key:
            self.conn = boto.connect_s3(self.key,self.secret)
        else:
            self.conn = boto.connect_s3()
        b = self.conn.get_bucket(bucket)
        for k in b.list(prefix=prefix):
            print k.name
            if k.name.endswith(".gz"):
                self.stream_gzip(k,fn)
            else:
                self.stream_text(k,fn)

            
    def copy_s3_file(self,fromPath,bucket,path):
        """copy from local file to S3 

        Args:
            fromPath (str): local file
            bucket (str): S3 bucket
            path (str): S3 prefix to add to files
        """
        if self.key:
            self.conn = boto.connect_s3(self.key,self.secret)
        else:
            self.conn = boto.connect_s3()
        print fromPath, bucket, path
        b = self.conn.get_bucket(bucket)
        source_size = os.stat(fromPath).st_size
        # Create a multipart upload request
        uploadPath = path
        print "uploading to bucket ",bucket," path ",uploadPath
        mp = b.initiate_multipart_upload(uploadPath)
        chunk_size = 10485760
        chunk_count = int(math.ceil(source_size / float(chunk_size)))
        for i in range(chunk_count):
            offset = chunk_size * i
            bytes = min(chunk_size, source_size - offset)
            with FileChunkIO(fromPath, 'r', offset=offset,bytes=bytes) as fp:
                print "uploading to s3 chunk ",(i+1),"/",chunk_count
                mp.upload_part_from_file(fp, part_num=i + 1)
        # Finish the upload
        print "completing transfer to s3"
        mp.complete_upload()

    
    def stream_multi(self,inputPaths,fn):
        """ stream multilple paths calling a function on each line

        Args:
            inputPaths (list): list of input folders
            fn (function): function to call
        """
        for path in inputPaths:
            self.stream(path,fn)

    def stream(self,inputPath,fn):
        """stream from an inputpath calling function

        Args:
            inputPath (str): input path to stream from
            fn (function): function to call
        """
        if inputPath.startswith("s3n://"):
            isS3 = True
            inputPath = inputPath[6:]
        elif inputPath.startswith("s3://"):
            isS3 = True
            inputPath = inputPath[5:]
        else:
            isS3 = False
        if isS3:
            print "AWS S3 input path ",inputPath
            parts = inputPath.split('/')
            bucket = parts[0]
            prefix = inputPath[len(bucket)+1:]
            self.stream_s3(bucket,prefix,fn)
        else:
            folders = [inputPath+"/*"]
            print "local input folders: ",folders
            self.stream_local(folders,fn)

    def upload_s3(self,fromPath,toPath):
        """upload from local path to S3

        Args:
            fromPath (str): folder to copy from
            toPath (str): S3 URL
        """
        if toPath.startswith("s3n://"):
            noSchemePath = toPath[6:]
        elif toPath.startswith("s3://"):
            noSchemePath = toPath[5:]
        parts = noSchemePath.split('/')
        bucket = parts[0]
        opath = noSchemePath[len(bucket)+1:]
        if os.path.isfile(fromPath):
            self.copy_s3_file(fromPath,bucket,opath)
        elif os.path.isdir(fromPath):
            for f in glob.glob(fromPath+"/*"):
                basename = os.path.basename(f)
                fnew = opath+"/"+basename
                print "copying ",f,"to",fnew
                self.copy_s3_file(f,bucket,fnew)

    def download_s3(self,fromPath,toPath):
        """download from S3 to local folder

        Args:
            fromPath (str): S3 URL
            toPath (str): local folder
        """
        if fromPath.startswith("s3n://"):
            noSchemePath = fromPath[6:]
        elif fromPath.startswith("s3://"):
            noSchemePath = fromPath[5:]
        parts = noSchemePath.split('/')
        bucket = parts[0]
        s3path = noSchemePath[len(bucket)+1:]
        if self.key:
            self.conn = boto.connect_s3(self.key,self.secret)
        else:
            self.conn = boto.connect_s3()
        print bucket, s3path, toPath
        b = self.conn.get_bucket(bucket)
        for k in b.list(prefix=s3path):
            basename = os.path.basename(k.name)
            fnew = toPath+"/"+basename
            print "copying ",k.name,"to",fnew
            k.get_contents_to_filename(fnew)


    def copy(self,fromPath,toPath):
        """copy files. local->local, S3->local, local->S3 (S3->S3 not supported)
        
        Args:
            fromPath (str): local or S3 URL
            toPath (str): local or S3 URL
        """
        if fromPath.startswith("s3n://") or fromPath.startswith("s3://"):
            fromS3 = True
        else:
            fromS3 = False
        if toPath.startswith("s3n://") or toPath.startswith("s3://"):
            toS3 = True
        else:
            toS3 = False
        if not fromS3 and not toS3:
            self.copy_local(fromPath,toPath)
        elif not fromS3 and toS3:
            self.upload_s3(fromPath,toPath)
        elif fromS3 and not toS3:
            if os.path.isdir(toPath):
                self.download_s3(fromPath,toPath)
            else:
                print "Local destination folder must exist :",toPath
        else:
            print "can't copy from s3 to s3"
            

        
