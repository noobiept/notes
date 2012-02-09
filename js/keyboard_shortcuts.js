/*global Note*/

/*
 * Keys code for the keyboard events
 */

var EVENT_KEY = {

    backspace  : 8,
    newLine    : 13,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    delKey     : 46,
   
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



Note.prototype.keyboardShortcuts = function( event )
{
var noteObject = this;
var key = event.which;
    
    // used when we're selecting another element than this
var otherNoteObject;
    
if (event.type == 'keydown')
    {
    if ( key == EVENT_KEY.home )
        {
        otherNoteObject = noteObject.previous();
        
        if (otherNoteObject !== null)
            {
            otherNoteObject.gainFocus();
            }
        }
    
    else if ( key == EVENT_KEY.end )
        {
        otherNoteObject = noteObject.next();
        
        if (otherNoteObject !== null)
            {
            otherNoteObject.gainFocus();
            }
        }
    }
};


