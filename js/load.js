function Load( data )
{
Menu();

Options.load( data[ 'notes_options' ] );
Load.notes( data[ 'notes' ], data[ 'notes_activeNotePosition' ] );

MAIN_CONTAINER.addDummyNote();
}


/*
 * load the notes
 */

Load.notes = function( notes, activeNotePosition )
{
    // first time the program runs
if ( !notes )
    {
    return;
    }

for (var i = 0 ; i < notes.length ; i++)
    {
    MAIN_CONTAINER.newNote( notes[ i ].text, notes[ i ].backgroundColorComponents, false );
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
