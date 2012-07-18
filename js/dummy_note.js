/*jslint white: true, vars: true, browser: true*/
/*global $, MAIN_CONTAINER, EVENT_KEY, OPTIONS*/


'use strict';

function DummyNote()
{
var dummyObject = this;
    
var dummy = document.createElement( 'div' );

dummy.setAttribute( 'contenteditable', 'true' );
dummy.className = "dummyNote";

var dummyText = document.createElement( 'div' );

dummyText.className = "DummyNote-text";
dummyText.innerHTML = "New Note";
dummyText.setAttribute( 'spellcheck', 'false' );


dummy.style.width  = OPTIONS.noteWidth + 'px';  //HERE
dummy.style.height = OPTIONS.noteHeight + 'px';
dummy.style.margin = OPTIONS.noteMargin + 'px';


dummy.onclick = function()
    {
    var tempNote = MAIN_CONTAINER.newNote();
    
    tempNote.gainFocus();  
    };


dummy.addEventListener( 'keydown', function(event) { dummyObject.keyboardEvents( event ); }, false );


dummy.appendChild( dummyText );

this.dummy_html = dummy;
this.dummyText_ui = dummyText;


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

if (event.type === 'keydown')
    {
        // add a new note
    if (key === EVENT_KEY.newLine || key === EVENT_KEY.tab)
        {
        noteObject = MAIN_CONTAINER.newNote();
        
        noteObject.gainFocus();
        }
    
        // focus to the last note
    else if (event.ctrlKey && key === EVENT_KEY.leftArrow)
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
    Center the dummy text in the center of the note (the elements have to be already been appended, otherwise the calculations might not give the right results)
 */

DummyNote.prototype.centerText = function()
{
var dummy = this.dummy_html;
var dummyText = this.dummyText_ui;


    //get the dummy note measures
var dummyWidth = $( dummy ).outerWidth();
var dummyHeight = $( dummy ).outerHeight();

    //and the dummy text
var textWidth = $( dummyText ).outerWidth();
var textHeight = $( dummyText ).outerHeight();


    //we want to have the text on the center of the dummy note, so lets calculate the top and left values
var top = (dummyHeight / 2) - (textHeight / 2);
var left = (dummyWidth / 2) - (textWidth  / 2);


    //position the window at the center of the page
$( dummyText ).css('top', top + 'px');
$( dummyText ).css('left', left + 'px');
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
