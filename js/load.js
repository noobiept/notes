/*jslint white: true, vars: true, browser: true, newcap: true*/
/*global $, localStorage, MAIN_CONTAINER, Menu, OPTIONS: true, TYPE*/


'use strict';

function Load()
{
Menu();

Load.data();
Load.options();
Load.notes();

MAIN_CONTAINER.addDummyNote();
}


// will have the stuff loaded (as an object, parsed from json)
Load.stuff_json = null;
Load.options_json = null;


/*
    Loads the data from the server or localStorage, and turns it from json text into the object, for later to be used to create the elements etc
 */

Load.data = function()
{
if ( TYPE === 'server' )
    {
    $.ajax({

        type: 'POST',
        async: false, //HERE ter algo a dizer k esta a fazer o load
        url: '/notes/get_data/',

        success: function(jqXHR, textStatus)
            {
            var stuff = jqXHR;

            Load.stuff_json = JSON.parse( stuff.data );
            Load.options_json = JSON.parse( stuff.options );
            },

        error: function(jqXHR, textStatus, errorThrown)
            {
                //HERE ter uma mensagem
            console.log(jqXHR, textStatus, errorThrown);
            }

        });
    }

    // localStorage
else
    {
    var stuff = localStorage.getObject( 'notes' );
    var options = localStorage.getObject( 'options' );

    Load.stuff_json = stuff;
    Load.options_json = options;
    }
};



/*
 * load the notes
 */

Load.notes = function()
{   
var notes = Load.stuff_json;
    
    // first time the program runs
if (notes === null || notes === '')
    {
    return;
    }


var i = 0;

for (i = 0 ; i < notes.length ; i++)
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
var options = Load.options_json;


    // first time program runs
if (options === null || options === "")
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


if (typeof options.generateColorType !== 'undefined' && options.generateColorType !== null)
    {
    OPTIONS.generateColorType  = options.generateColorType;    
    }


if ( isNaN( options.spellCheck ) === false )
    {
    OPTIONS.spellCheck = options.spellCheck;
    }
};
