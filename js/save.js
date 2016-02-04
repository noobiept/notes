/*
 * Converts an object to string, and saves it in storage
 * 
 * usage: 
 *      localStorage.setObject( "...", { ... } );
 */

Storage.prototype.setObject = function( key, value )
{
this.setItem( key, JSON.stringify( value ) );  
};



/*
 * Returns null if it doesn't find, otherwise returns the string correspondent
 */

Storage.prototype.getObject = function( key )
{
var value = this.getItem( key );

return value && JSON.parse( value );  
};


/*
 * Save the data to localStorage or to the server
 * 
 * Arguments :
 * 
 *      logout (bool) : to logout the user aswell (server only)
 */

function Save( logout )
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

AppStorage.setData( { notes: notes, options: Options.getNextOptions() } );
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
