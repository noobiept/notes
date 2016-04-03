/*global PopupWindow, UndoRedo, OptionsPage, MAIN_CONTAINER*/
/*exported globalShortcuts*/

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
    Keyboard shortcuts (don't work when a PopupWindow is opened)

    - alt + u : call Undo
    - alt + r : call Redo
    - alt + o : open the options
    - alt + n : create a new note
 */

function globalShortcuts( event )
{
    //when the popup window is opened, its best to cancel these events, since they would happen
    //in the 'background' (from a user point of view)
if (PopupWindow.hasOpenedWindows() === true)
    {
    return;
    }

var key = event.which;

if ( event.type === 'keyup' )
    {
        // alt + u -- (u)ndo
    if ( event.altKey && key === EVENT_KEY.u )
        {
        UndoRedo.stuff( 'undo' );

        event.stopPropagation();
        }

        // alt + r -- (r)edo
    else if ( event.altKey && key === EVENT_KEY.r )
        {
        UndoRedo.stuff( 'redo' );

        event.stopPropagation();
        }

        // alt + o -- open the (o)ptions
    else if ( event.altKey && key === EVENT_KEY.o )
        {
        new OptionsPage();

        event.stopPropagation();
        }

        // alt + n -- create a new (n)ote
    else if ( event.altKey && key === EVENT_KEY.n )
        {
        var noteObject = MAIN_CONTAINER.newNote();

        noteObject.gainFocus();

        event.stopPropagation();
        }
    }
}
