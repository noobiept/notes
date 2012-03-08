/*global localStorage, MAIN_CONTAINER, Menu, OPTIONS: true*/



function Load()
{
Menu();
 
Load.options();


    // :: load the notes :: //
    
var notes = localStorage.getObject( 'notes' );

if (notes === null)
    {
    return;
    }
    
MAIN_CONTAINER.addDummyNote();



for (var i = 0 ; i < notes.length ; i++)
    {
    MAIN_CONTAINER.newNote( notes[ i ].text );
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
}



/*
 * 
 */

Load.options = function()
{
    // :: Load Options :: //

var options = localStorage.getObject( 'options' );

if (options === null)
    {
    return;
    }


    // i have to change each option, and not do something like OPTIONS = options, because otherwise when adding new 
    // options (to the OPTIONS object), it won't matter, since it will be overwritten with the old options
    // by changing each one, if I add later another option, it will keep its default value
OPTIONS.noteWidth               = options.noteWidth;
OPTIONS.noteHeight              = options.noteHeight;
OPTIONS.noteMargin              = options.noteMargin;
OPTIONS.activeNotePosition      = options.activeNotePosition;
OPTIONS.generateBackgroundColor = options.generateBackgroundColor;
};
