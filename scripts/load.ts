/*global Menu, MAIN_CONTAINER, Data*/

function Load()
{
Menu();
Load.notes();

MAIN_CONTAINER.addDummyNote();
}


/*
 * load the notes
 */
Load.notes = function()
{
var notes = Data.getNotes();
var activeNotePosition = Data.getNoteActivePosition();

    // first time the program runs
if ( !notes )
    {
    return;
    }

for (var i = 0 ; i < notes.length ; i++)
    {
    MAIN_CONTAINER.newNote( notes[ i ].text, notes[ i ].backgroundColorComponents, false, -1, true );
    }

    // set focus on the element that was active last time
if (activeNotePosition >= 0)
    {
    var noteObject = MAIN_CONTAINER.getChild( activeNotePosition );

    if (noteObject !== null)
        {
        noteObject.gainFocus();
        }
    }
};
