class DummyNote
{
private dummy: HTMLElement;
private dummyText: HTMLElement;


constructor()
    {
    var dummyObject = this;

    var dummy = document.createElement( 'div' );
    dummy.className = "dummyNote";

    var dummyText = document.createElement( 'div' );

    dummyText.className = "DummyNote-text";
    dummyText.innerHTML = "New Note";
    dummyText.setAttribute( 'spellcheck', 'false' );
    dummyText.setAttribute( 'contenteditable', 'true' );

    dummy.style.width  = Options.get( 'noteWidth'  ) + 'px';
    dummy.style.height = Options.get( 'noteHeight' ) + 'px';
    dummy.style.margin = Options.get( 'noteMargin' ) + 'px';

    dummy.onclick = function()
        {
        var tempNote = MAIN_CONTAINER.newNote();
        tempNote.gainFocus();
        };

    dummy.addEventListener( 'keydown', function(event) { dummyObject.keyboardEvents( event ); }, false );

    dummy.appendChild( dummyText );

    this.dummy = dummy;
    this.dummyText = dummyText;

    return this;
    }


keyboardEvents( event: KeyboardEvent )
    {
    var key = event.which;
    var noteObject;

        //allow the F1, F2, ... until F12 keys to pass
    if ( key >= Utilities.EVENT_KEY.f1 && key <= Utilities.EVENT_KEY.f12 )
        {
        return;
        }

        // add a new note
    if ( key === Utilities.EVENT_KEY.enter || key === Utilities.EVENT_KEY.tab )
        {
        noteObject = MAIN_CONTAINER.newNote();
        noteObject.gainFocus();
        }

        // focus to the last note
    else if ( event.altKey && key === Utilities.EVENT_KEY.q )
        {
        noteObject = MAIN_CONTAINER.getLastChild();

        if (noteObject !== null)
            {
            noteObject.gainFocus();
            }
        }

        // focus to the first note
    else if ( event.altKey && key == Utilities.EVENT_KEY.w )
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


/*
    Center the dummy text in the center of the note (the elements have to be already been appended, otherwise the calculations might not give the right results)
 */
centerText()
    {
    var dummy = this.dummy;
    var dummyText = this.dummyText;

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
    }


getHtmlElement()
    {
    return this.dummy;
    }


gainFocus()
    {
    this.dummyText.focus();
    }
}