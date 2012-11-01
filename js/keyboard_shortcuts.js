/*jslint white: true, vars: true, browser: true, newcap: true*/
/*global Note, MAIN_CONTAINER, NoteWindow*/

'use strict';

/*
 * Keys code for the keyboard events
 */

var EVENT_KEY = {

    backspace  : 8,
    tab        : 9,
    enter      : 13,
    esc        : 27,
    space      : 32,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    del        : 46,

    "0" : 48,
    "1" : 49,
    "2" : 50,
    "3" : 51,
    "4" : 52,
    "5" : 53,
    "6" : 54,
    "7" : 55,
    "8" : 56,
    "9" : 57,

    a : 65,
    b : 66,
    c : 67,
    d : 68,
    e : 69,
    f : 70,
    g : 71,
    h : 72,
    i : 73,
    j : 74,
    k : 75,
    l : 76,
    m : 77,
    n : 78,
    o : 79,
    p : 80,
    q : 81,
    r : 82,
    s : 83,
    t : 84,
    u : 85,
    v : 86,
    w : 87,
    x : 88,
    y : 89,
    z : 90,

    f1  : 112,
    f2  : 113,
    f3  : 114,
    f4  : 115,
    f5  : 116,
    f6  : 117,
    f7  : 118,
    f8  : 119,
    f9  : 120,
    f10 : 121,
    f11 : 122,
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
    
if (event.type === 'keydown')
    {
        // focus to the note to the left (or the dummy note, if its the first note)
    if ( event.ctrlKey && key === EVENT_KEY.leftArrow )
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
    else if ( event.ctrlKey && key === EVENT_KEY.rightArrow )
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
    else if ( event.ctrlKey && key === EVENT_KEY.enter )
        {
        otherNoteObject = MAIN_CONTAINER.newNote( "", null, true, this.getPosition() + 1 );
        
        otherNoteObject.gainFocus();
        }
    
    event.stopPropagation();
    }
    
else if (event.type === 'keyup')
    {
            // remove the note
    if ( event.ctrlKey && key === EVENT_KEY.del )
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
    else if (event.altKey && key === EVENT_KEY.w)
        {
        NoteWindow( noteObject );
        }
    }
};


