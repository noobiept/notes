/*global Data, MainContainer, Load, PopupWindow, globalShortcuts*/
/*exported MAIN_CONTAINER*/

var MAIN_CONTAINER = null;


window.onload = function()
{
Data.load( initApp );
};


function initApp()
{
MAIN_CONTAINER = new MainContainer();

Menu.init();

    // load the notes
var notes = Data.getNotes();
var activeNotePosition = Data.getNoteActivePosition();

    // first time the program runs
if ( !notes )
    {
    return;
    }

for (var i = 0 ; i < notes.length ; i++)
    {
    MAIN_CONTAINER.newNote( notes[ i ].text, notes[ i ].backgroundColorComponents, false, -1, true );
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

    // add the dummy note at the end
MAIN_CONTAINER.addDummyNote();

var resize = function()
    {
    if (PopupWindow.hasOpenedWindows() === true)
        {
        PopupWindow.resizeAll();
        }
    };

resize();

    // resize/reposition the popup windows, according to the space available
window.addEventListener( 'resize', resize, true );
window.addEventListener( 'keyup', globalShortcuts, true );
}
