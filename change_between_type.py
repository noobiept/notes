import os.path

'''
    To accommodate the small differences between the various types of the notes program.

'''


'''
    to doo :
    
        actualizar a versao tb (var VERSION = '024';)

    #HERE nao eh preciso, devido a ter uma template para o servidor (ver no website/templates)
'''

import argparse
import shutil
import re


def change( type ):

    validValues = ( 'app', 'server' )
    
    if type not in validValues:
    
        validValuesString = " "
        
        for value in validValues:
            validValuesString += value + " "
            
        print( "Invalid type ( valid values:" + validValuesString + ")" )
        print( "You wrote: " + type )
        return
        
    
    updateTypeVariable( type )
    

    

def updateTypeVariable( type ):

    '''
        Updates the TYPE variable in main.js
    '''

    path = os.path.join('js', 'main.js')

    with open( path, 'r', encoding = 'utf-8' ) as f:
    
        text = f.read()


        # change the type

    newType = "var TYPE = '" + type + "';"  #HERE uma maneira k substitua logo
    
    text = re.sub( "var TYPE = '.*';", newType, text, 1 )


        # re-write to the file

    with open( path, 'w', encoding = 'utf-8' ) as f:
    
        f.write( text )
    

    

if __name__ == '__main__':

	parser = argparse.ArgumentParser( description = 'Change between type' )

	parser.add_argument( 'type', help = "The type we'll change to ('app' or 'server')." )

	args = parser.parse_args()

	change( args.type )
    