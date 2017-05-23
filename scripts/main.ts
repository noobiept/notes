type BackgroundColorType = 'fixed_order' | 'color_gradient' | 'random';


var MAIN_CONTAINER: MainContainer;


window.onload = function()
{
Data.load( initApp );
};


function initApp( notes: Data.NoteData[], notesPosition: number[], options: Data.LoadedOptionsData[] )
{
MAIN_CONTAINER = new MainContainer();

Options.load( options );
Menu.init();
OptionsPage.init();

    // load the notes
var activeNotePosition = Options.get( 'activeNotePosition' );

var notesById: { [id: number]: Data.NoteData } = {};

    // create a temporary dictionary to helps add the notes in the right position
for (let a = 0 ; a < notes.length ; a++)
    {
    let noteData = notes[ a ];
    notesById[ noteData.id ] = noteData;
    }

    // 'notesPosition' is sorted with the ids of the notes
    // so we need to add the notes in that order
for (let a = 0 ; a < notesPosition.length ; a++)
    {
    let id = notesPosition[ a ];
    let noteData = notesById[ id ];

    MAIN_CONTAINER.newNote({
        id: noteData.id,
        text: noteData.text,
        colorComponents: noteData.backgroundColor,
        position: -1,
        saveToUndo: false,
        saveToStorage: false
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
    Global keyboard shortcuts (don't work when a 'PopupWindow' is opened)
    Check the readme for a list with all the keyboard shortcuts available.
 */
function globalShortcuts( event: KeyboardEvent )
{
    //when the popup window is opened, its best to cancel these events, since they would happen
    //in the 'background' (from a user point of view)
if (PopupWindow.hasOpenedWindows() === true)
    {
    return;
    }

if ( event.altKey )
    {
    switch( event.keyCode )
        {
        case Utilities.EVENT_KEY.one:
            var noteObject = MAIN_CONTAINER.newNote();
            noteObject.gainFocus();

            event.stopPropagation();
            break;

        case Utilities.EVENT_KEY.two:
            UndoRedo.stuff( 'undo' );

            event.stopPropagation();
            break;

        case Utilities.EVENT_KEY.three:
            UndoRedo.stuff( 'redo' );

            event.stopPropagation();
            break;

        case Utilities.EVENT_KEY.four:
            OptionsPage.open();

            event.stopPropagation();
            break;

        case Utilities.EVENT_KEY.q:
            if ( document.activeElement === document.body )
                {
                let note = MAIN_CONTAINER.getLastChild();
                if ( note )
                    {
                    note.gainFocus();
                    }

                else
                    {
                    MAIN_CONTAINER.getDummy().gainFocus();
                    }
                }

            event.stopPropagation();
            break;

        case Utilities.EVENT_KEY.w:
            if ( document.activeElement === document.body )
                {
                let note = MAIN_CONTAINER.getFirstChild();
                if ( note )
                    {
                    note.gainFocus();
                    }

                else
                    {
                    MAIN_CONTAINER.getDummy().gainFocus();
                    }
                }

            event.stopPropagation();
            break;
        }
    }
}
