/*global localStorage, MAIN_CONTAINER*/



function Load()
{
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


    // :: Load Options :: //

var options = localStorage.getObject( 'options' );

if (options === null)
    {
    return;
    }

if (options.activeNotePosition >= 0)
    {
    var noteObject = MAIN_CONTAINER.getChild( options.activeNotePosition );
    
    if (noteObject !== null)
        {
        noteObject.gainFocus();
        }
    }

}
