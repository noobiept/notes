/*global MAIN_CONTAINER, OptionsPage, UndoRedo*/


'use strict';

/*
 * 
 */

function Menu()
{
var menu = document.querySelector( '#menu' );

    
    // :: New Note :: //

var newNote = menu.querySelector( '#newNote' );

newNote.addEventListener( 'click', function(event) { MAIN_CONTAINER.newNote(); }, false );


var options = menu.querySelector( '#options' );

options.addEventListener( 'click', function() { new OptionsPage(); }, false );


Menu.message = menu.querySelector( '#message' );


var undo = menu.querySelector( '#undo' );

undo.addEventListener( 'click', function() { UndoRedo.stuff( 'undo' ); }, false );

var redo = menu.querySelector( '#redo' );

redo.addEventListener( 'click', function() { UndoRedo.stuff( 'redo' ); }, false );
}



/* ******************* Deals with messages **************** */
/*
 * Arguments:
 *      - content -> the stuff to be written
 * 
 */

Menu.showMessage = function (content)
{
Menu.message.innerHTML = content;


Menu.message.style.opacity = 1;

    //adds a fade style
setTimeout(
    function() 
        {
        Menu.message.style.opacity = 0; //HERE would be cool if we set display: 'none'; so that the #message doesn't occupy space 
        },                              //i've tried it but when sending multiple messages it creates some problems..
    1000);
};
