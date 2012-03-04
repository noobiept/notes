/*global Note, MAIN_CONTAINER*/

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



Note.prototype.keyboardShortcuts = function( event )
{
var noteObject = this;
var key = event.which;
    
var noteHtml = noteObject.getHtmlElement();
//console.log(noteHtml.offsetHeight, noteHtml.scrollHeight);
/*
if (noteHtml.scrollHeight > noteHtml.offsetHeight)
    {
    event.preventDefault();
    return false;
    }*/

    // used when we're selecting another element than this
var otherNoteObject;
    
if (event.type == 'keydown')
    {
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
        
        // remove the note
    else if ( event.ctrlKey && key == EVENT_KEY.del )
        {
            // we'll try to give focus to the next note, or the previous if this is the last note
            // if this is the only note left, focus goes to the dummy note
        otherNoteObject = this.next();
        
        var isDummy = false;    //HERE preciso por causa do bug do .gainFocus()
         
        if (otherNoteObject === null)
            {
            otherNoteObject = this.previous();
            
            if (otherNoteObject === null)
                {
                otherNoteObject = MAIN_CONTAINER.getDummy();
                isDummy = true;
                }
            }
        
      
        this.remove();
        
        
        if (isDummy === false)
            {
            var title = otherNoteObject.getTitle();
        
            otherNoteObject.gainFocus();

                //HERE weird behaviour, by calling .gainFocus(), it clears the otherNoteObject's first line        
            setTimeout( function() { otherNoteObject.setTitle(title); }, 20 );                
            }

        else
            {
            otherNoteObject.gainFocus();
            
            //HERE same 
            setTimeout( function() { otherNoteObject.getHtmlElement().innerHTML = "New Note"; }, 20 );
            }
        } 
    
    event.stopPropagation();
    }
};


