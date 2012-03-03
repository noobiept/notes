/*global Storage, localStorage, MAIN_CONTAINER*/


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





function Save()
{
var notes = [];

var noteObject = MAIN_CONTAINER.getFirstChild();

for ( ; noteObject !== null ; noteObject = noteObject.next() )
    {
    notes.push({
        title : noteObject.getTitle(),
        text  : noteObject.getText() 
        });
    }

localStorage.setObject( 'notes', notes );
}






