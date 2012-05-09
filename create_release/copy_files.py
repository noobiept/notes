import argparse
import json
import shutil
import os.path
#import os


def copyFiles( configPath, resultingFolder ):

    configFile = open( configPath, 'r' )
    
        # is a dictionary with the key the path to the files, and the value a list of the paths to the files
        # the paths (in the list) will be maintained in the copy
    configJson = json.loads( configFile.read() )

    configFile.close()
       
    for path, files in configJson.items():
    
        for file in files:
            
            sourceFilePath = os.path.join( path, file )
            
            sourceFolder = os.path.dirname( sourceFilePath )
            
            destinationFolder = os.path.join( resultingFolder, os.path.dirname( file ) )
            
            destinationFilePath = os.path.join( resultingFolder, file )
            
            fileName = os.path.basename( file )


            
                # copy all the files in this folder
            if fileName == '*':
                #shutil.copytree( os.path.dirname( filePath ), folder )
                if destinationFolder and not os.path.isdir( destinationFolder ):
                    os.makedirs( destinationFolder )
                    
                allFiles = os.listdir( sourceFolder )
                
                for aFile in allFiles:
                    
                    sourceFilePath = os.path.normpath( os.path.join( sourceFolder, aFile ) )
                    
                    destinationFilePath = os.path.join( os.path.join( destinationFolder, aFile ) )
                    
                        #HERE ser recursivo
                    if os.path.isdir( sourceFilePath ):
                        continue
                    
                    shutil.copy( sourceFilePath, destinationFilePath )
                    
                
            
            else:
            
                if destinationFolder and not os.path.isdir( destinationFolder ):
                    os.makedirs( destinationFolder )
                
                    # copy to the current directory
                shutil.copy( sourceFilePath, destinationFilePath )
    
        
    


if __name__ == '__main__':    

    parser = argparse.ArgumentParser( description = 'Copy files according to a configuration file.' )

    parser.add_argument( 'configPath', help = "path to the configuration file.", nargs="?", default="copy_files_config.txt" )
    parser.add_argument( 'resultingFolder', help = "name of the folder that is created in the current path and contains the copies.", nargs="?", default="notes" )

    args = parser.parse_args()

    copyFiles( args.configPath, args.resultingFolder )