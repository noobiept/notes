/*
 * Works for:
 *
 *      - added notes
 *      - removed notes
 *      - dragged notes
 */
module UndoRedo
{
type ActionType = 'removedNote' | 'addedNote' | 'draggedNote';

interface Action
    {
    what: ActionType;
    position: number;
    text?: string;
    colorObject?: Color;
    previousPosition?: number;
    }

var UNDO_LIST: Action[] = [];
var REDO_LIST: Action[] = [];


/*
 * Arguments:
 *
 *      what     (string) : tells what we're adding
 *      noteObject (Note) : the object of the note in question
 *      usefulStuff  (??) : depends on 'what' is -- see in the code
 */
export function add( what: ActionType, noteObject: Note, previousPosition?: number )
    {
    switch( what )
        {
        case 'addedNote':

            saveAddedNote( what, noteObject );
            break;

        case 'removedNote':

            saveRemovedNote( what, noteObject );
            break;

        case 'draggedNote':

            saveDraggedNote( what, noteObject, previousPosition! );
            break;
        }
    }


function saveAddedNote( what: ActionType, noteObject: Note )
    {
    UNDO_LIST.push({

        what        : what,
        position    : noteObject.getPosition(),
        text        : "",
        colorObject : noteObject.getColorObject()

        });

        //on a new change, clean the REDO, so that it doesn't create conflicts
    cleanRedo();
    }


function saveRemovedNote( what: ActionType, noteObject: Note )
    {
    UNDO_LIST.push({

        what        : what,
        position    : noteObject.getPosition(),
        text        : noteObject.getText(),
        colorObject : noteObject.getColorObject()

        });

        //on a new change, clean the REDO, so that it doesn't create conflicts
    cleanRedo();
    }


function saveDraggedNote( what: ActionType, noteObject: Note, previousPosition: number )
    {
    UNDO_LIST.push({

        what             : what,
        position         : noteObject.getPosition(),
        previousPosition : previousPosition

        });

        //on a new change, clean the REDO, so that it doesn't create conflicts
    cleanRedo();
    }


/*
 * When there's a new change in the list, we clean the redo_obj to avoid conflicts with the undo later on
 */
function cleanRedo()
    {
    REDO_LIST.length = 0;
    }


/*
 * Say an element was removed. We saved to UndoRedo its text, background-color (among other things)
 *
 * Then we undo it, and change the text, and we redo and undo.
 *
 * Since the text changes (plus other stuff that could have been changed) aren't being saved to UndoRedo, those changes
 * are lost.
 *
 * So, before we undo/redo, we need to update the text/background-color
 */
function updateNote( element: Action, noteObject: Note )
    {
        //update the text (since it could have been changed)
    element.text = noteObject.getText();
    element.colorObject = noteObject.getColorObject();
    }


/*
 * Undo or redo an action.
 */
export function stuff( whichOne: 'undo' | 'redo' )
    {
    var element: Action;

    if ( whichOne === 'undo' )
        {
        if ( UNDO_LIST.length === 0 )
            {
            Menu.showMessage('Nothing to restore');
            return;
            }

            //get last element
        element = UNDO_LIST.pop()!;

            //send it to the redo array
        REDO_LIST.push( element );
        }

    else        //redo
        {
        if ( REDO_LIST.length === 0 )
            {
            Menu.showMessage('Nothing to redo');
            return;
            }

            //get last element
        element = REDO_LIST.pop()!;

            //send it to the UNDO array
        UNDO_LIST.push( element );
        }

    var temp;

    if (element.what === 'removedNote')
        {
        if (whichOne === 'undo')
            {
            var colorComponents = {

                    red          : element.colorObject!.red_int,
                    green        : element.colorObject!.green_int,
                    blue         : element.colorObject!.blue_int,
                    alpha        : element.colorObject!.alpha_float,
                    wasSetByUser : element.colorObject!.wasSetByUser_bool
                };

            MAIN_CONTAINER.newNote({
                container: MAIN_CONTAINER,
                text: element.text,
                colorComponents: colorComponents,
                saveToUndo: false,
                position: element.position
                });
            }

            //redo - we remove the previously added entry (by the undo)
        else
            {
            temp = MAIN_CONTAINER.getChild( element.position )!;

                //update the data on the element (some stuff could have been changed since it was first saved to UndoRedo)
            updateNote( element, temp );

            temp.remove( false );
            }
        }


    else if (element.what === 'addedNote')
        {
        if (whichOne === 'undo') // same as 'removedNote' and 'redo'
            {
            temp = MAIN_CONTAINER.getChild( element.position )!;

                //update the data on the element (some stuff could have been changed since it was first saved to UndoRedo)
            updateNote( element, temp );

            temp.remove( false );
            }

        else    // same as 'removedNote' and 'undo'
            {
            var colorComponents2 = {

                    red          : element.colorObject!.red_int,
                    green        : element.colorObject!.green_int,
                    blue         : element.colorObject!.blue_int,
                    alpha        : element.colorObject!.alpha_float,
                    wasSetByUser : element.colorObject!.wasSetByUser_bool
                };

            MAIN_CONTAINER.newNote({
                container: MAIN_CONTAINER,
                text: element.text,
                colorComponents: colorComponents2,
                saveToUndo: false,
                position: element.position
                });
            }
        }

    else if (element.what === 'draggedNote')
    {
    if (whichOne === 'undo')
        {
            //move without saving it again to undo
        MAIN_CONTAINER.getChild( element.position )!.moveTo( element.previousPosition!, false );
        }

    else
        {
            //move without saving it again to undo
        MAIN_CONTAINER.getChild( element.previousPosition! )!.moveTo( element.position, false );
        }
    }

        // what is in the form: likeThis
        // separate the words with a space
    var what = element.what.replace(/[A-Z]/, function(match) { return " " + match; });

        // capitalize everything (first letter upper case)
    what = Utilities.capitalize( what );
    var capitalizedWhichOne = Utilities.capitalize( whichOne );

    Menu.showMessage( capitalizedWhichOne + ": " + what );
    }
}