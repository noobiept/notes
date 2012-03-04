/*global PopupWindow, EVENT_KEY, MAIN_CONTAINER*/



/*
 * Open a popup window for a note
 */

function NoteWindow( noteObject )
{
    // :: Title :: //
    
var title = document.createElement( 'div' );

title.setAttribute( 'contenteditable', 'true' );
title.className = "NoteWindow-title";

title.innerHTML = noteObject.getTitle();


    // :: Text :: //

var text = document.createElement( 'div' );

text.setAttribute( 'contenteditable', 'true' );
text.className = "NoteWindow-text";
text.innerHTML = noteObject.getText();


    // :: Container :: //

var container = document.createElement( 'div' );

container.style.backgroundColor = noteObject.getBackgroundColor();

container.appendChild( title );
container.appendChild( text );


    // :: Other :: //

NoteWindow.title_ui = title;
NoteWindow.text_ui = text;
NoteWindow.container_ui = container;
NoteWindow.noteObject_obj = noteObject;



new PopupWindow( container, NoteWindow.onStart, NoteWindow.onHide, NoteWindow.shortcuts );
}



/*
 * To be executed when the window is created
 * 
 * Set focus on the title entry
 */

NoteWindow.onStart = function()
{
NoteWindow.title_ui.focus();
};



/*
 * To be executed when the window is closed
 * 
 * Save the title/text, and set focus to the note
 */

NoteWindow.onHide = function()
{
var noteObject = NoteWindow.noteObject_obj;

noteObject.setTitle( NoteWindow.title_ui.innerHTML );
noteObject.setText( NoteWindow.text_ui.innerHTML );

noteObject.gainFocus();
};



/*
 * Change the note that is on the NoteWindow (the title/text)
 */

NoteWindow.updateContent = function( noteObject )
{
NoteWindow.title_ui.innerHTML = noteObject.getTitle();
NoteWindow.text_ui.innerHTML = noteObject.getText();


NoteWindow.container_ui = noteObject.getBackgroundColor();

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
    

        // ctrl + up/down arrow --> go to the element above/below
        // since we only have two elements, they both to the same thing (toggle between title and text)    
    else if (event.ctrlKey && (key == EVENT_KEY.upArrow || key == EVENT_KEY.downArrow ))
        {
        if (document.activeElement == NoteWindow.title_ui)
            {
            NoteWindow.text_ui.focus();
            }
        
        else
            {
            NoteWindow.title_ui.focus();
            }
        }
    }
};
