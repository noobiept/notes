class DragDrop
{
    //has the object of the note that is being dragged
static currentDragNote: Note | null = null;

private dragHandler: HTMLElement;   // the element that starts the drag
private dragElement: HTMLElement;   // the element that is dragged
private noteObject: Note;           // the object that represents the element being dragged


/*
 * Notes can be sorted.
 *
 * Arguments:
 *
 *     dragElement : the html element that can be dragged
 *     dragHandler : the html element that is used to start the drag of the actual element
 *     noteObject  : the object that represents the element
 */
constructor( dragElement: HTMLElement, dragHandler: HTMLElement, noteObject: Note )
    {
    var dragObject = this;

    dragElement.addEventListener( 'dragstart', function(event) { dragObject.onDragStart(event); }, false );
    dragElement.addEventListener( 'drop'     , function(event) { dragObject.onDrop(event);      }, false );
    dragElement.addEventListener( 'dragover' , function(event) { dragObject.onDragOver(event);  }, false );
    dragElement.addEventListener( 'dragleave', function(event) { dragObject.onDragLeave(event); }, false );

        //the drag handler
    $( dragHandler ).attr( 'draggable', 'true' );

    this.dragHandler = dragHandler;
    this.dragElement = dragElement;
    this.noteObject = noteObject;
    }


/*
 * Checks if its a valid drop place, for the element you're dragging
 */
isValidDrop()
    {
        //the element of where we drop the drag one
    var elementObject = this.noteObject;

        //what we're dragging
    var dragObject = DragDrop.currentDragNote;

        //see if we're not dropping on the same place
    if ( dragObject !== elementObject )
        {
        return true;
        }

    return false;
    }


/*
 * when the drag of an element starts
 */
onDragStart( event: DragEvent )
    {
    var dataTransfer = event.dataTransfer;

    dataTransfer.setData("text", "");   // required on some browsers
    dataTransfer.effectAllowed = 'move';

        //so that the image that is shown during the drag, is of the element, and not the drag handle
        // not all browsers support this
    if ( dataTransfer.setDragImage )
        {
        dataTransfer.setDragImage(this.dragElement, 0, 0);
        }

        //the element that is been dragged
    DragDrop.currentDragNote = this.noteObject;

    event.stopPropagation();
    }


/*
 * when an element is dropped over a valid place, we have to switch the positions between the element that is was
 *      been dragged, and the element where the drop occurred
 */
onDrop( event: DragEvent )
    {
        //remove the css effect for valid drop places
    this.dragElement.classList.remove( 'validDrop' );

        //the element of where we drop the drag one
    var elementObject = this.noteObject;

        //what we're dragging
    var dragObject = DragDrop.currentDragNote!;

        //see if we're not dropping on the same place
    if ( dragObject !== elementObject )
        {
        MAIN_CONTAINER.moveNoteTo( dragObject, elementObject.getPosition() );
        }

    DragDrop.currentDragNote = null;

    event.stopPropagation();
    return false;
    }


/*
 * Allows or not the drop to occur
 */
onDragOver( event: DragEvent )
    {
        //if this is a valid drop, let it be possible to occur
    if ( this.isValidDrop() === true )
        {
            //add the css effect for valid drop places (this is also added in the onDragEnter, but having it here helps)
        this.dragElement.classList.add( 'validDrop' );

            //to allow the drop to occur
        event.preventDefault();

            //cancel as-well when its a valid drop
        event.stopPropagation();
        return false;
        }

    event.stopPropagation();
    return true;
    }


/*
 * Remove the effect of a valid drop place
 */
onDragLeave( event: DragEvent )
    {
    if ( this.isValidDrop() === true )
        {
            //remove the css effect for valid drop places
        this.dragElement.classList.remove( 'validDrop' );
        }

    event.stopPropagation();
    }
}