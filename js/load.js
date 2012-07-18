/*jslint white: true, vars: true, browser: true, newcap: true*/
/*global localStorage, MAIN_CONTAINER, Menu, OPTIONS: true*/


'use strict';

function Load()
{

    
Menu();
 
Load.options();

Load.notes();

MAIN_CONTAINER.addDummyNote();
}



/*
 * load the notes
 */

Load.notes = function()
{   
var notes;
    
    // load from the server -- USER_DATA and USER_OPTIONS have the stuff
if ( TYPE == 'server' )
    {
    try 
        {
        notes = JSON.parse( USER_DATA );
        }
    
    catch( error )
        {
        return;
        }
    }

else
    {
    notes = localStorage.getObject( 'notes' );        
    }


if (notes === null)
    {
    return;
    }


for (var i = 0 ; i < notes.length ; i++)
    {
    MAIN_CONTAINER.newNote( notes[ i ].text, notes[ i ].backgroundColorComponents, false );
    }



    // set focus on the element that was active last time
if (OPTIONS.activeNotePosition >= 0)
    {
    var noteObject = MAIN_CONTAINER.getChild( OPTIONS.activeNotePosition );
    
    if (noteObject !== null)
        {
        noteObject.gainFocus();
        }
    }
};



/*
 * 
 */

Load.options = function()
{
var options;
    
if (TYPE == 'server')
    {
    try 
        {
        options = JSON.parse( USER_OPTIONS );
        }
    
    catch( error )
        {
        return;
        }
    }
    
else
    {
    options = localStorage.getObject( 'options' );    
    }
    


if (options === null || options == "")
    {
    return;
    }
    

    // i have to change each option, and not do something like OPTIONS = options, because otherwise when adding new 
    // options (to the OPTIONS object), it won't matter, since it will be overwritten with the old options
    // by changing each one, if I add later another option, it will keep its default value

if ( isNaN( options.noteWidth ) === false )
    {
    OPTIONS.noteWidth = options.noteWidth;    
    }


if ( isNaN( options.noteHeight ) === false )
    {
    OPTIONS.noteHeight = options.noteHeight;    
    }


if ( isNaN( options.noteMargin ) === false )
    {
    OPTIONS.noteMargin = options.noteMargin;    
    }


if ( isNaN( options.activeNotePosition ) === false )
    {
    OPTIONS.activeNotePosition = options.activeNotePosition;    
    }


if (typeof options.generateColorType != 'undefined' && options.generateColorType != null)
    {
    OPTIONS.generateColorType  = options.generateColorType;    
    }


if ( isNaN( options.spellCheck ) === false )
    {
    OPTIONS.spellCheck = options.spellCheck;
    }
    
if ( isNaN( options.analytics ) === false )
    {
    OPTIONS.analytics = options.analytics;
    }    
};
