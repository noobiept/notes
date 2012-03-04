/*global MAIN_CONTAINER, OptionsPage*/


/*
 * 
 */

function Menu()
{
var menu = document.querySelector( '#menu' );

    
    // :: New Note :: //

var newNote = menu.querySelector( '#newNote' );

newNote.addEventListener( 'click', function(event) { MAIN_CONTAINER.add(); }, false );


var options = menu.querySelector( '#options' );

options.addEventListener( 'click', function() { new OptionsPage(); }, false );
}
