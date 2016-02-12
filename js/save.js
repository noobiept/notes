/*
 * Save the data to local storage.
 */
function Save()
{
AppStorage.setData( Save.getSaveData() );
}


/*
    Returns an object with the notes properties
 */
Save.notesToJson = function()
{
var notes = [];

var noteObject = MAIN_CONTAINER.getFirstChild();

for ( ; noteObject !== null ; noteObject = noteObject.next() )
    {
    notes.push({
        text  : noteObject.getText(),
        backgroundColorComponents : noteObject.getColorObject().getColor()
    });
    }

return notes;
};


/**
 * Returns the data that needs to be saved.
 */
Save.getSaveData = function()
{
    // a NoteWindow may be opened when the program closes, and since we only save the text of a note when that window is closed, we have to save the text of that note now
if ( NoteWindow.isOpened() )
    {
    NoteWindow.saveNote();
    }


var notes = Save.notesToJson();
var noteObject;


    // :: Options :: //

var activeNote = document.activeElement;

var activePosition = -1;    // -1 means no focus

    // find if there is a note on focus, to save its position
if (activeNote.classList.contains('noteEntry'))
    {
    noteObject = activeNote.parentNode.noteObject;

    activePosition = noteObject.getPosition();
    }


    // update the active note
Options.set( 'activeNotePosition', activePosition );

return {
    notes: notes,
    notes_options: Options.getNextOptions()
    };
};
