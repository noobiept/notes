/*global $, window, PopupWindow, EVENT_KEY, MAIN_CONTAINER, Draw*/



/*
 * Open a popup window for a note
 */

function NoteWindow( noteObject )
{
    // :: Text :: //

var text = document.createElement( 'div' );

text.setAttribute( 'contenteditable', 'true' );
text.className = "NoteWindow-text";
text.innerHTML = noteObject.getText();


    // :: Left arrow -- change to the note to the left :: //

var left = Draw( 'NoteWindow-leftArrow' );

var width = $(window).width();
var height = $(window).height();

var halfHeight = height / 2;


$( left ).css( 'left', '100px' );  //HERE  -- por a ficar a uma certa distancia sempre da NoteWindow
$( left ).css( 'top', halfHeight + 'px' );


    // :: Right arrow -- change to the note to the right :: //

var right = Draw( 'NoteWindow-rightArrow' );


$( right ).css( 'right', '100px' );//HERE
$( right ).css( 'top', halfHeight + 'px' );

    // :: Container :: //

var container = document.createElement( 'div' );

container.style.backgroundColor = noteObject.getBackgroundColor();
//$(container).css('position', 'relative');

container.appendChild( text );

document.body.appendChild( left );
document.body.appendChild( right );



    // :: Other :: //

NoteWindow.text_ui = text;
NoteWindow.container_ui = container;
NoteWindow.noteObject_obj = noteObject;

NoteWindow.leftArrow_ui = left;
NoteWindow.rightArrow_ui = right;


new PopupWindow( container, NoteWindow.onStart, NoteWindow.onHide, NoteWindow.shortcuts );
}



/*
 * To be executed when the window is created
 * 
 * Set focus on the title entry
 */

NoteWindow.onStart = function()
{
NoteWindow.text_ui.focus();
};



/*
 * To be executed when the window is closed
 * 
 * Save the title/text, and set focus to the note
 */

NoteWindow.onHide = function()
{
var noteObject = NoteWindow.noteObject_obj;

noteObject.setText( NoteWindow.text_ui.innerHTML );

noteObject.gainFocus();


    // remove the left/right arrow
    
document.body.removeChild( NoteWindow.leftArrow_ui );
document.body.removeChild( NoteWindow.rightArrow_ui );
};



/*
 * Change the note that is on the NoteWindow (the title/text)
 */

NoteWindow.updateContent = function( noteObject )
{
NoteWindow.text_ui.innerHTML = noteObject.getText();


NoteWindow.container_ui.style.backgroundColor = noteObject.getBackgroundColor();

NoteWindow.noteObject_obj = noteObject;
};





/*
 * - ctrl + left arrow  : move to the note to the left (or if this is the first one, go to the last)
 * - ctrl + right arrow : move to the note to the right (or if this is the last one, go to the first)
 */

NoteWindow.shortcuts = function( event )
{
var key = event.which;
var elementObject = NoteWindow.noteObject_obj;
var otherElement = null;


if (event.type == 'keyup')
    {
        // move to the note to the left (or if this is the first one, go to the last)
    if (event.ctrlKey && key == EVENT_KEY.leftArrow)
        {
            // if there's only one, do nothing
        if ( MAIN_CONTAINER.childrenCount() > 1 )
            {
            otherElement = elementObject.previous();
            
                // this is the first one
            if ( otherElement === null )
                {
                otherElement = MAIN_CONTAINER.getLastChild();
                }     
            
            NoteWindow.updateContent( otherElement );
            //HERE ter k por focus?...
            }
        }
        
        // move to the note to the right (or if this is the last one, go to the first)
    else if (event.ctrlKey && key == EVENT_KEY.rightArrow)
        {
            // if there's only one, do nothing
        if ( MAIN_CONTAINER.childrenCount() > 1 )
            {
            otherElement = elementObject.next();
            
                // this is the first one
            if ( otherElement === null )
                {
                otherElement = MAIN_CONTAINER.getFirstChild();
                }     
            
            NoteWindow.updateContent( otherElement );
            //HERE ter k por focus?...
            } 
        }
    }
};
