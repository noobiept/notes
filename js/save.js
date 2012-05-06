/*jslint white: true, vars: true, browser: true, newcap: true, plusplus: true*/
/*global Storage, localStorage, MAIN_CONTAINER, OPTIONS*/

'use strict';

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
        text  : noteObject.getText(),
        backgroundColorComponents : noteObject.getColorObject().getColor() 
        });
    }

localStorage.setObject( 'notes', notes );

    
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
OPTIONS.activeNotePosition = activePosition;

   
localStorage.setObject( 'options', OPTIONS );
}






