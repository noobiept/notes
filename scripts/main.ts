type BackgroundColorType = 'fixed_order' | 'color_gradient' | 'random';


var MAIN_CONTAINER: MainContainer;


window.onload = function()
{
Data.load( initApp );
};


function initApp()
{
MAIN_CONTAINER = new MainContainer();

Menu.init();
OptionsPage.init();

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
    MAIN_CONTAINER.newNote({
        text: notes[ i ].text,
        colorComponents: notes[ i ].backgroundColorComponents,
        saveToUndo: false,
        position: -1,
        fromLoad: true
        });
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

window.addEventListener( 'keyup', globalShortcuts, true );
}


/*
    Keyboard shortcuts (don't work when a PopupWindow is opened)

    - alt + u : call Undo
    - alt + r : call Redo
    - alt + o : open the options
    - alt + n : create a new note
 */
function globalShortcuts( event: KeyboardEvent )
{
    //when the popup window is opened, its best to cancel these events, since they would happen
    //in the 'background' (from a user point of view)
if (PopupWindow.hasOpenedWindows() === true)
    {
    return;
    }

var key = event.which;

if ( event.type === 'keyup' )
    {
        // alt + u -- (u)ndo
    if ( event.altKey && key === Utilities.EVENT_KEY.u )
        {
        UndoRedo.stuff( 'undo' );

        event.stopPropagation();
        }

        // alt + r -- (r)edo
    else if ( event.altKey && key === Utilities.EVENT_KEY.r )
        {
        UndoRedo.stuff( 'redo' );

        event.stopPropagation();
        }

        // alt + o -- open the (o)ptions
    else if ( event.altKey && key === Utilities.EVENT_KEY.o )
        {
        OptionsPage.open();

        event.stopPropagation();
        }

        // alt + n -- create a new (n)ote
    else if ( event.altKey && key === Utilities.EVENT_KEY.n )
        {
        var noteObject = MAIN_CONTAINER.newNote();
        noteObject.gainFocus();

        event.stopPropagation();
        }
    }
}
