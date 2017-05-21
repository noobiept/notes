class MainContainer
{
private htmlElement: HTMLElement;
private childrenObjects: Note[];
private dummyNote: DummyNote;


/*
 * container of all the notes (there can be only one)
 *
 */
constructor()
    {
    this.htmlElement = <HTMLElement> document.querySelector( '#mainContainer' );
    this.childrenObjects = [];
    }


/*
 *
 * See Note() for the arguments description
 *
 * Creates a note and adds it to the main container
 */
newNote( args?: NoteArgs )
    {
    var noteObject = new Note( this,  args );

        // we're getting the position from the object and not from the argument, because the argument may not have an acceptable value
    var notePosition = noteObject.getPosition();

    var container = this.htmlElement;

        // add to the html container element
    container.insertBefore( noteObject.getHtmlElement(), container.childNodes[ notePosition ] );

        //add to the array
    this.childrenObjects.splice( notePosition, 0, noteObject );

        // update the position property
    for (var a = notePosition ; a < this.childrenObjects.length ; a++)
        {
        this.childrenObjects[ a ].setPosition( a );
        }

    return noteObject;
    }


/**
 * Remove a note.
 */
removeNote( note: Note, saveToUndo?: boolean )
    {
    if ( saveToUndo !== false )
        {
        UndoRedo.add( 'removedNote', note );
        }

    var position = note.getPosition();

        // remove from the array
    this.childrenObjects.splice( position, 1 );

        // remove the html element
    this.htmlElement.removeChild( note.getHtmlElement() );

        // update the position property
    for (var a = position ; a < this.childrenObjects.length ; a++)
        {
        this.childrenObjects[ a ].setPosition( a );
        }

    Data.removeNote( note );
    }


moveNoteTo( note: Note, position: number, saveToUndo?: boolean )
    {
        //if there's an active element (with focus), we need to remove the focus before starting moving stuff around
        //since there are events (blur) attached to the elements, which are triggered when we move the html elements
        //so we 'call' them now, while we haven't done anything yet
    if (document.activeElement)
        {
            //this will probably be always called, since there's always an element on focus, even if it is just the <body>
        (<HTMLElement>document.activeElement).blur();
        }

        //for undo
    var previousPosition = note.getPosition();

        //find the position from where we need to update (depends if we move from an higher position to a lower, or the other way around)
    var lessPosition;

        //from an higher position to a lower
    if ( previousPosition > position )
        {
        lessPosition = position;
        }

        //from a lower position to a higher
    else
        {
        lessPosition = previousPosition;
        }


        // insert the html element on the new position
    if ( position > previousPosition )
        {
        this.getChild( position )!.getHtmlElement().insertAdjacentElement( 'afterend', note.getHtmlElement() );
        }

    else
        {
        this.getChild( position )!.getHtmlElement().insertAdjacentElement( 'beforebegin', note.getHtmlElement() );
        }

        // remove from array
    this.childrenObjects.splice( previousPosition, 1 );

        // add in the new position
    this.childrenObjects.splice( position, 0, note );

        // update the notes object with the current position
    for (var a = lessPosition ; a < this.childrenObjects.length ; a++)
        {
        this.childrenObjects[ a ].setPosition( a );
        }

        // update the database
    Data.updateNotesPosition( previousPosition, position );

    if ( saveToUndo !== false )
        {
        UndoRedo.add( 'draggedNote', note, previousPosition );
        }

        //focus on the element that was dragged
    note.gainFocus();
    }


addDummyNote()
    {
    this.dummyNote = new DummyNote();

    this.htmlElement.appendChild( this.dummyNote.getHtmlElement() );

        // has to be called after it is appended, otherwise the calculations will give 'wrong' results
    this.dummyNote.centerText();
    }


getDummy()
    {
    return this.dummyNote;
    }


getHtmlElement()
    {
    return this.htmlElement;
    }


/*
 * returns the first child element object (null if it doesn't exist)
 */
getFirstChild()
    {
    if (this.childrenObjects.length !== 0)
        {
        return this.childrenObjects[0];
        }

    return null;
    }


/*
 * returns the last child object (null if it doesn't exist)
 */
getLastChild()
    {
    var children = this.childrenObjects;

    if (children.length !== 0)
        {
        return children[ children.length - 1 ];
        }

    return null;
    }


/*
 * get a specific child object (null if not found)
 */
getChild( position: number )
    {
        //see if it exists
    if ( position >= this.childrenCount() || position < 0)
        {
        return null;
        }

    return this.childrenObjects[ position ];
    }


/*
 * returns the number of children elements (do note, that it may not make sense (for example for an entry.. it doesn't have children))
 */
childrenCount()
    {
    return this.childrenObjects.length;
    }


/**
 * Returns a list with all the notes text.
 */
getTextList()
    {
    var children = this.childrenObjects;
    var textList = [];

    for (var a = 0 ; a < children.length ; a++)
        {
        textList.push( children[ a ].getRenderedText() );
        }

    return textList;
    }
}