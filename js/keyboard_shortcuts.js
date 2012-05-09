/*jslint white: true, vars: true, browser: true, newcap: true*/
/*global Note, MAIN_CONTAINER, NoteWindow*/

'use strict';

/*
 * Keys code for the keyboard events
 */

var EVENT_KEY = {

    backspace  : 8,
    newLine    : 13,
    esc        : 27,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    del        : 46,
   
    c : 67,
    l : 76,
    o : 79,
    r : 82,
    t : 84,
    u : 85,
    w : 87,
    
    f1  : 112,
    f12 : 123
    
};



/*
    - ctrl + left arrow  : focus to the note to the left (or the dummy note, if its the first note)
    - ctrl + right arrow : focus to the note to the right (or dummy note, if its the last one)
    - ctrl + delete      : delete the note
    - ctrl + enter       : create a new note in the next position
    - alt + w            : open the NoteWindow
    
 
 */

Note.prototype.keyboardShortcuts = function( event )
{
var noteObject = this;
var key = event.which;
    
    // used when we're selecting another element than this
var otherNoteObject;
    
if (event.type == 'keydown')
    {
        // focus to the note to the left (or the dummy note, if its the first note)
    if ( event.ctrlKey && key == EVENT_KEY.leftArrow )
        {
        otherNoteObject = noteObject.previous();
        
        if (otherNoteObject !== null)
            {
            otherNoteObject.gainFocus();
            }
        
            // means this is the first note, go to the .dummyNote
        else
            {
            MAIN_CONTAINER.getDummy().gainFocus();
            }
        }
    
        // focus to the note to the right (or dummy note, if its the last one)
    else if ( event.ctrlKey && key == EVENT_KEY.rightArrow )
        {
        otherNoteObject = noteObject.next();
        
        if (otherNoteObject !== null)
            {
            otherNoteObject.gainFocus();
            }
        
            // means this is the last element, go to .dummyNote
        else
            {
            MAIN_CONTAINER.getDummy().gainFocus();
            }
        }
       
        // create a new note in the next position    
    else if ( event.ctrlKey && key == EVENT_KEY.newLine )
        {
        otherNoteObject = MAIN_CONTAINER.newNote( "", null, true, this.getPosition() + 1 );
        
        otherNoteObject.gainFocus();
        }
    
    event.stopPropagation();
    }
    
else if (event.type == 'keyup')
    {
            // remove the note
    if ( event.ctrlKey && key == EVENT_KEY.del )
        {
            // we'll try to give focus to the next note, or the previous if this is the last note
            // if this is the only note left, focus goes to the dummy note
        otherNoteObject = this.next();
        
        if (otherNoteObject === null)
            {
            otherNoteObject = this.previous();
            
            if (otherNoteObject === null)
                {
                otherNoteObject = MAIN_CONTAINER.getDummy();
                }
            }
        
      
        this.remove();
        
        
        otherNoteObject.gainFocus();
        } 
        
        // open the NoteWindow
    else if (event.altKey && key == EVENT_KEY.w)
        {
        NoteWindow( noteObject );
        }
    }
};


