/*global MAIN_CONTAINER, OptionsPage, UndoRedo*/

/*
 * Menu initialization.
 */
function Menu()
{
var menu = document.querySelector( '#menu' );

    // :: New Note :: //

var newNote = menu.querySelector( '#newNote' );

newNote.addEventListener( 'click', function(event)
    {
    var noteObject = MAIN_CONTAINER.newNote();

    noteObject.gainFocus();

    }, false );


var options = menu.querySelector( '#options' );
options.addEventListener( 'click', function() { new OptionsPage(); }, false );

Menu.message = menu.querySelector( '#message' );

var undo = menu.querySelector( '#undo' );
undo.addEventListener( 'click', function() { UndoRedo.stuff( 'undo' ); }, false );

var redo = menu.querySelector( '#redo' );
redo.addEventListener( 'click', function() { UndoRedo.stuff( 'redo' ); }, false );

var donate = menu.querySelector( '#donate' );
donate.addEventListener( 'click', function()
    {
    window.open( 'http://nbpt.eu/donate/', '_blank' );
    }, false );
}


/* ******************* Deals with messages **************** */
/*
 * Arguments:
 *      - content (string) -> the stuff to be written
 *
 */
Menu.messageTimeout_f = null;


Menu.showMessage = function (content)
{
Menu.message.innerHTML = content;

    // show the message
Menu.message.style.opacity = 1;

    // if there was a previous message being displayed before, we need to cancel its timeout (otherwise, this message will end sooner)
if ( Menu.messageTimeout_f !== null)
    {
    window.clearTimeout( Menu.messageTimeout_f );
    }

    // adds a fade style
Menu.messageTimeout_f = setTimeout(
    function()
        {
        Menu.message.style.opacity = 0;
        Menu.messageTimeout_f = null;
        },
    1000);
};
