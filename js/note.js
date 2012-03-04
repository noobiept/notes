/*global DragDrop, MAIN_CONTAINER, Draw, NoteWindow*/

'use strict';


/*
 * 
 */

function Note( containerObject, title, text, position )
{
var noteObject = this;
    
    // add at the end (its not -1, since we still didn't add to the array)
if ( typeof position == 'undefined' || isNaN( position ) === true )
    {
    position = containerObject.childrenCount();
    }


    // :: Note entry -- where you write the title :: //
    
var noteEntry = document.createElement( 'div' );

noteEntry.className = "noteEntry";


if (typeof title == 'undefined' || title === "" )
    {
    title = "<br>";
    }

noteEntry.innerHTML = title;
noteEntry.setAttribute( 'contenteditable', 'true' );
//noteEntry.style.backgroundColor = "rgb(" + position * 10 + ",40,40)";       //HERE Note.generateColor();

    // :: Open the popup window :: //
    
var openWindow = Draw( 'openWindow' );

    
    // :: Remove the entry :: //

var delNote = Draw( 'delNote' );


    // :: note controls :: //
    
var noteControls = document.createElement( 'div' );
noteControls.className = "noteControls";

noteControls.appendChild( delNote );
noteControls.appendChild( openWindow );


    // :: container :: //

var noteContainer = document.createElement( 'div' );

noteContainer.className = "noteContainer";

noteContainer.style.width = OPTIONS.noteDimension + 'px';
noteContainer.style.height = OPTIONS.noteDimension + 'px'; //HERE -- dps se mudar nas opcoes e adicionar uma nota vai ter dimensoes diferentes...

var aa = OPTIONS.noteDimension - 20;

noteEntry.style.width = OPTIONS.noteDimension + 'px';   //HERE evil
noteEntry.style.height = aa + 'px';

noteContainer.appendChild( noteControls );
noteContainer.appendChild( noteEntry );


var backgroundColor = "rgb(" + position * 10 + ",40,40)";       //HERE Note.generateColor();
noteContainer.style.backgroundColor = backgroundColor;

/*
if (Options.spellCheck === false)
    {
    entry.setAttribute('spellcheck', 'false');
    }

else
    {
    entry.setAttribute('spellcheck', 'true');
    }
*/


if (typeof text == 'undefined' || text === "" )
    {
    text = "<br>";
    }


    // :: Events :: //

var noteKeyEvents = function(event) { noteObject.keyboardShortcuts( event ); };

noteEntry.addEventListener( 'keydown' , noteKeyEvents, false );


openWindow.addEventListener( 'click', function() { NoteWindow( noteObject ); }, false );

delNote.addEventListener( 'click', function() { noteObject.remove(); }, false );


    // :: Other :: //

noteContainer.noteObject = this;


    // make notes draggable
this.dragDrop_obj = new DragDrop( noteContainer , noteControls, this );


this.position_int = position;
this.parentObject = containerObject;
this.noteEntry_obj = noteEntry;
this.noteContainer_ui = noteContainer;
this.text_str = text;
this.backgroundColor_str = backgroundColor;


return this;
}



/*
 * Generates randomly a background color and a text color for each entry
 */

Note.generateColor = function()
{
    //HERE
};





/*
 * remove the note
 */

Note.prototype.remove = function()
{
var position = this.getPosition();
    

    //remove from the array
MAIN_CONTAINER.childrenObjects_array.splice( position, 1 );


    //remove the html element
MAIN_CONTAINER.getHtmlElement().removeChild( this.getHtmlElement() );


MAIN_CONTAINER.updateOrder( position );  
};



/*
 * 
 */

Note.prototype.gainFocus = function()
{
this.noteEntry_obj.focus();
};



/*
 * returns the element's position
 */

Note.prototype.getPosition = function()
{
return this.position_int;
};



/*
 * 
 */

Note.prototype.getText = function()
{
return this.text_str;
};


/*
 * 
 */

Note.prototype.setText = function( text )
{
if (typeof text == 'undefined' || text === null)
    {
    text = "<br>";
    }
    
this.text_str = text;
};



/*
 * get the title of the note
 */

Note.prototype.getTitle = function ()
{
var text = this.noteEntry_obj.innerHTML;

if (text === null || typeof text == 'undefined')    //HERE eh assim?
    {
    return "";
    }

return text;
};



/*
 * 
 */

Note.prototype.setTitle = function( text )
{
if (typeof text == 'undefined' || text === null)
    {
    text = "<br>";
    }

this.noteEntry_obj.innerHTML = text;
};



/*
 * Returns the background color (a string)
 */

Note.prototype.getBackgroundColor = function()
{
return this.backgroundColor_str;
};






/*
 * tells if this is the first element or not
 */

Note.prototype.isFirst = function ()
{
if (this.position_int === 0)
    {
    return true;
    }

return false;
};



/*
 * tells if this is the last element
 */

Note.prototype.isLast = function()
{
if ( this.position_int + 1 === this.parentObject.childrenObjects_array.length )
    {
    return true;
    }  

return false;
};




/*
 * 
 */

Note.prototype.moveTo = function( position )
{
    //if there's an active element (with focus), we need to remove the focus before starting moving stuff around
    //since there are events (blur) attached to the elements, which are triggered when we move the html elements
    //so we 'call' them now, while we haven't done anything yet 
if (document.activeElement)
    {
        //this will probably be always called, since there's always an element on focus, even if it is just the <body>
    document.activeElement.blur();        
    }    
    
    
    //for undo
var previousPosition = this.getPosition();
    

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

  
    
    
    //inserting at the end
if (position == MAIN_CONTAINER.childrenCount() - 1)
    {
    MAIN_CONTAINER.getHtmlElement().insertBefore(
        this.getHtmlElement(),
        MAIN_CONTAINER.getDummy().getHtmlElement()
        );
    }
        
    //when the drag was from a higher position to a lower
else if (position > this.getPosition())
    {
    MAIN_CONTAINER.getHtmlElement().insertBefore(
        this.getHtmlElement(),
        MAIN_CONTAINER.getChild( position + 1 ).getHtmlElement()
        );
    }
    
else
    {
    MAIN_CONTAINER.getHtmlElement().insertBefore(
        this.getHtmlElement(),
        MAIN_CONTAINER.getChild( position ).getHtmlElement() 
        );
    }
    
    
    //update the order, from the lesser position that was affected
MAIN_CONTAINER.updateOrder( lessPosition );

/*
if ( saveToUndo !== false )
    {
    UndoRedo.add( 'draggedTab', this, previousPosition );
    }*/


    //focus on the element that was dragged
this.gainFocus();
};




/*
 * returns the next element object (or null if we're at the end)
 */

Note.prototype.next = function()
{
var elementsArray = this.parentObject.childrenObjects_array;
var position = this.position_int;

    //we're at the last position
if ( position + 1 === elementsArray.length )
    {
    return null;
    }

return elementsArray[ position + 1 ];
};



/*
 * returns the previous element object (or null if there isn't one)
 */

Note.prototype.previous = function()
{
var position = this.position_int;

    //if we're not on the first one
if ( position !== 0 )
    {
    return this.parentObject.childrenObjects_array[ position - 1 ];
    }

return null;
};



/*
 * 
 */

Note.prototype.getHtmlElement = function()
{
return this.noteContainer_ui;
};
