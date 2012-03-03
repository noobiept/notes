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
}
