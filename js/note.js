/*jslint newcap: true*/
/*global $, DragDrop, MAIN_CONTAINER, Draw, NoteWindow, OPTIONS, UndoRedo, Color*/


'use strict';


/*
 * Note's class -- its called from a MainContainer object (not directly)
 * 
 * colorComponents:
 *      {
 *      red: (int),
 *      green: (int),
 *      blue: (int),
 *      alpha: (float),
 *      wasSetByUser: (bool)
 *      }
 *  
 */

function Note( containerObject, text, colorComponents, saveToUndo, position )
{
var noteObject = this;
    
    
    // :: Deal with the note's position :: //
    
    // add at the end (its not -1, since we still didn't add to the array)
if ( typeof position == 'undefined' || isNaN( position ) === true )
    {
    position = containerObject.childrenCount();
    }

this.position_int = position;


    // :: Note entry -- where you write the title :: //
    
var noteEntry = document.createElement( 'div' );

noteEntry.className = "noteEntry";


if ( typeof text == 'undefined' || text === "" )
    {
    text = "<br>";
    }

noteEntry.innerHTML = text;
noteEntry.setAttribute( 'contenteditable', 'true' );


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

noteContainer.style.width = OPTIONS.noteWidth + 'px';
noteContainer.style.height = OPTIONS.noteHeight + 'px'; //HERE -- dps se mudar nas opcoes e adicionar uma nota vai ter dimensoes diferentes...
noteContainer.style.margin = OPTIONS.noteMargin + 'px'; //HERE o mesmo, se mudar e dps adicionar notas


var noteControlsHeight = 20;

var bb = OPTIONS.noteHeight - noteControlsHeight;

noteEntry.style.width  = OPTIONS.noteWidth + 'px';   //HERE evil
noteEntry.style.height = bb + 'px';

noteContainer.appendChild( noteControls );
noteContainer.appendChild( noteEntry );

var colorObject;


    // if a color is not given, we generate one
if (typeof colorComponents == 'undefined' || colorComponents === null || colorComponents.wasSetByUser === false || colorComponents.red < 0)
    {
    colorObject = noteObject.generateColor();            
    }

    // otherwise, use the color that is set
else
    {
    colorObject = new Color( colorComponents.red, colorComponents.green, colorComponents.blue, colorComponents.alpha, colorComponents.wasSetByUser );
    }


var backgroundColor = colorObject.getCssRepresentation();
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



    // :: Events :: //

var noteKeyEvents = function(event) { noteObject.keyboardShortcuts( event ); };

noteEntry.addEventListener( 'keydown' , noteKeyEvents, false );

$( noteEntry ).bind( 'focus',
    function()
    {
    noteObject.setFocusStyle();
    });


$( noteEntry ).bind( 'blur',
    function()
    {
    noteObject.removeFocusStyle();
    });





openWindow.addEventListener( 'click', function() { NoteWindow( noteObject ); }, false );

delNote.addEventListener( 'click', function() { noteObject.remove(); }, false );


    // :: Other :: //

noteContainer.noteObject = this;


    // make notes draggable
this.dragDrop_obj = new DragDrop( noteContainer , noteControls, this );



this.parentObject = containerObject;
this.noteEntry_obj = noteEntry;
this.noteContainer_ui = noteContainer;
this.backgroundColor_obj = colorObject;


if (saveToUndo !== false)
    {
    UndoRedo.add( 'addedNote', this );
    }


return this;
}



/*
 * Generates a color and returns a Color object
 * 
 *      With red/green/blue going from 0 to 255
 *          and alpha from 0 to 1
 * 
 * 
 * reads OPTIONS.generateBackgroundColor, to see in what way to generate the background colors
 * 
 * There's 3 ways to generate the color:
 * 
 *      "fixed_order"  : switch between a number of known colors
 *      "random"       : generate a random color every time
 *      "red_gradient" : a gradient, starting at a darker color, then moving to a red color, then back to the darker color...  
 */


    // only used with the gradient option, to tell if the color we're generating is brighter (as in, closer to red -- going up)
    // or darker (going down)
Note.gradientGoingUp_bool = true;    

    // gradient only, the lower limit of the red component (the high limit is 255 -- red color)
Note.gradientLowerLimit_int = 100;

    // for the gradient only, has previous red component of the background color
Note.gradientRedColor_int = Note.gradientLowerLimit_int;                           

Note.prototype.generateColor = function()
{
var red = 0, green = 0, blue = 0, alpha = 1;
    
if (OPTIONS.generateBackgroundColor == 'fixed_order')
    {
    var color = this.getPosition() % 3;
    
    switch( color )
        {
        case 0:
        
            red = 255;
            green = 0;
            blue = 0;
            alpha = 0.6;
            break; 
            
        case 1:
        
            red = 0;
            green = 255;
            blue = 0;
            alpha = 0.6;
            break;
        
        case 2:
        
            red = 0;
            green = 0;
            blue = 255;
            alpha = 0.6;
            break;
            
        }
    }
    
else if (OPTIONS.generateBackgroundColor == 'random')
    {
        // Math.random() --> returns a random number from 0 to 1 (not including 1)
        // Math.round()  --> to get an integer
    red   = Math.round( Math.random() * 255 );
    green = Math.round( Math.random() * 255 );
    blue  = Math.round( Math.random() * 255 );
    
        // means its a bright color -- choose another to get a darker color
    if ( red > 200 && green > 200 && blue && 200 )
        {
            // change two of them
        red   = Math.round( Math.random() * 100 );
        green = Math.round( Math.random() * 100 );
        }
    
        // get a value between 1 and 0.5
    alpha = Math.random() * 0.5 + 0.5;
    }
    
    // "red_gradient"
else
    {
    var colorStep = 10;

        // get the previous red component
    red = Note.gradientRedColor_int;

        // the gradient is going from the darker color to red
    if (Note.gradientGoingUp_bool === true)
        {
            // add the step
        red += colorStep;        
        
            // reached the limit (the red color), going down
        if (red >= 255)
            {
            Note.gradientGoingUp_bool = false;
            }
        }
        
    else
        {
        red -= colorStep;
        
            // reached the lower limit
        if (red <= Note.gradientLowerLimit_int)
            {
            Note.gradientGoingUp_bool = true;
            }
        }
    
        // save the current red component, for the next time this is called
    Note.gradientRedColor_int = red;
    
    green = 0;
    blue  = 0; 
    alpha = 0.7;
    }


return new Color( red, green, blue, alpha ); 
};





/*
 * remove the note
 */

Note.prototype.remove = function( saveToUndo )
{
var position = this.getPosition();
    

if (saveToUndo !== false)
    {
    UndoRedo.add( 'removedNote', this );
    }



    //remove from the array
MAIN_CONTAINER.childrenObjects_array.splice( position, 1 );


    //remove the html element
MAIN_CONTAINER.getHtmlElement().removeChild( this.getHtmlElement() );


MAIN_CONTAINER.updateOrder( position );  
};



/*
 * Put (keyboard) focus on a note 
 */

Note.prototype.gainFocus = function()
{
this.noteEntry_obj.focus();
};



/*
 * A style for the note that is currently on focus
 */

Note.prototype.setFocusStyle = function()
{
$( this.noteContainer_ui ).addClass( 'NoteOnFocus' );
};


/*
 * Remove the special styling for the note on focus (when it no longer is (on blur, for example))
 */

Note.prototype.clearFocusStyle = function()
{
$( this.noteContainer_ui ).removeClass( 'NoteOnFocus' );
};





/*
 * returns the element's position
 */

Note.prototype.getPosition = function()
{
return this.position_int;
};



/*
 * get the text of the note
 */

Note.prototype.getText = function ()
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

Note.prototype.setText = function( text )
{
if (typeof text == 'undefined' || text === null)
    {
    text = "<br>";
    }

this.noteEntry_obj.innerHTML = text;
};



/*
 * Returns a Color object, representing the background color
 */

Note.prototype.getColorObject = function()
{
return this.backgroundColor_obj;
};



Note.prototype.updateBackgroundColor = function()
{
this.noteContainer_ui.style.backgroundColor = this.backgroundColor_obj.getCssRepresentation();
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

Note.prototype.moveTo = function( position, saveToUndo )
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


if ( saveToUndo !== false )
    {
    UndoRedo.add( 'draggedNote', this, previousPosition );
    }


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
