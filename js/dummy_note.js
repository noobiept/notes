/*jslint white: true, vars: true, browser: true*/
/*global MAIN_CONTAINER, EVENT_KEY, OPTIONS*/


'use strict';

function DummyNote()
{
var dummyObject = this;
    
var dummy = document.createElement( 'div' );

dummy.setAttribute( 'contenteditable', 'true' );
dummy.className = "dummyNote";
dummy.innerHTML = "New Note";


dummy.style.width  = OPTIONS.noteWidth + 'px';  //HERE
dummy.style.height = OPTIONS.noteHeight + 'px';
dummy.style.margin = OPTIONS.noteMargin + 'px';


dummy.onclick = function()
    {
    var tempNote = MAIN_CONTAINER.newNote();
    
    tempNote.gainFocus();  
    };


dummy.addEventListener( 'keydown', function(event) { dummyObject.keyboardEvents( event ); }, false );


this.dummy_html = dummy;

return this;
}



/*
 * 
 */

DummyNote.prototype.keyboardEvents = function(event)
{
var key = event.which;
var noteObject;

    //allow the F1, F2, ... until F12 keys to pass
if ( key >= EVENT_KEY.f1 && key <= EVENT_KEY.f12 )
    {
    return;
    }

if (event.type == 'keydown')
    {
        // add a new note
    if (key == EVENT_KEY.newLine)
        {
        noteObject = MAIN_CONTAINER.newNote();
        
        noteObject.gainFocus();
        }
    
        // focus to the last note
    else if (event.ctrlKey && key == EVENT_KEY.leftArrow)
        {
        noteObject = MAIN_CONTAINER.getLastChild();
        
        if (noteObject !== null)
            {
            noteObject.gainFocus();
            }
        }
    
        // focus to the first note
    else if (event.ctrlKey && key == EVENT_KEY.rightArrow)
        {
        noteObject = MAIN_CONTAINER.getFirstChild();
        
        if (noteObject !== null)
            {
            noteObject.gainFocus();
            }
        }    
    
        // else --> cancel other input

    
    event.preventDefault();
    event.stopPropagation();
    }
};



/*
 * 
 */

DummyNote.prototype.getHtmlElement = function()
{
return this.dummy_html;
};



/*
 * 
 */

DummyNote.prototype.gainFocus = function()
{
this.dummy_html.focus();
};
