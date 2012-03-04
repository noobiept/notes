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
    MAIN_CONTAINER.add( notes[ i ].title, notes[ i ].text );
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


OPTIONS = options;
};
