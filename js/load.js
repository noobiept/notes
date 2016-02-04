function Load( data )
{
Menu();

Options.load( data[ 'options' ] );
Load.notes( data[ 'notes' ] );

MAIN_CONTAINER.addDummyNote();
}


/*
 * load the notes
 */

Load.notes = function( notes )
{   
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
var activeNotPosition = Options.get( 'activeNotePosition' );

if (activeNotPosition >= 0)
    {
    var noteObject = MAIN_CONTAINER.getChild( activeNotPosition );
    
    if (noteObject !== null)
        {
        noteObject.gainFocus();
        }
    }
};
