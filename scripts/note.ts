interface NoteArgs
    {
    text?: string;
    colorComponents?: ColorArgs;
    saveToUndo?: boolean;
    position?: number;
    fromLoad?: boolean;
    }


class Note
{
private position: number;
private dragDrop: DragDrop;
private parentObject: MainContainer;
private noteEntry: HTMLElement;
private noteContainer: HTMLElement;
private backgroundColor: Color;


/*
 * Note's class -- its called from a MainContainer object (not directly)
 */
constructor( container: MainContainer, args?: NoteArgs )
    {
    var noteObject = this;

    if ( !args )
        {
        args = {};
        }

        // :: Deal with the note's position :: //

        // add at the end (its not -1, since we still didn't add to the array)
    if ( typeof args.position === 'undefined' || isNaN( args.position ) === true || args.position < 0 )
        {
        args.position = container.childrenCount();
        }

    this.position = args.position;

        // :: Note entry -- where you write the title :: //

    var noteEntry = document.createElement( 'div' );
    noteEntry.className = "noteEntry";

    if ( typeof args.text === 'undefined' || args.text === "" )
        {
        args.text = "<br>";
        }

    noteEntry.innerHTML = args.text;
    noteEntry.setAttribute( 'contenteditable', 'true' );
    noteEntry.addEventListener( 'input', function()
        {
        Data.changeNoteText( noteObject );
        });

        // :: Open the popup window :: //

    var openWindow = Draw.create( 'openWindow' );

        // :: Remove the entry :: //

    var delNote = Draw.create( 'delNote' );

        // :: note controls :: //

    var noteControls = document.createElement( 'div' );
    noteControls.className = "noteControls";

    noteControls.appendChild( delNote );
    noteControls.appendChild( openWindow );

        // :: container :: //
    var noteWidth = Options.get( 'noteWidth' );
    var noteHeight = Options.get( 'noteHeight' );
    var noteMargin = Options.get( 'noteMargin' );

    var noteContainer = document.createElement( 'div' );

    noteContainer.className = "noteContainer";
    noteContainer.style.width = noteWidth + 'px';
    noteContainer.style.height = noteHeight + 'px';
    noteContainer.style.margin = noteMargin + 'px';

    var noteControlsHeight = 20;
    var noteEntryPadding = 5;

    noteEntry.style.padding = noteEntryPadding + 'px';
    noteEntry.style.width  = (noteWidth - 2 * noteEntryPadding) + 'px';
    noteEntry.style.height = (noteHeight - noteControlsHeight - 2 * noteEntryPadding) + 'px';

    noteContainer.appendChild( noteControls );
    noteContainer.appendChild( noteEntry );

    var colorObject;

        // if a color is not given, we generate one
    if ( !args.colorComponents || args.colorComponents.wasSetByUser === false || args.colorComponents.red < 0 )
        {
        colorObject = noteObject.generateColor();
        }

        // otherwise, use the color that is set
    else
        {
        colorObject = new Color( args.colorComponents );
        }

    noteContainer.style.backgroundColor = colorObject.getCssRepresentation();

    if (Options.get( 'spellCheck' ) === false)
        {
        noteEntry.setAttribute('spellcheck', 'false');
        }

    else
        {
        noteEntry.setAttribute('spellcheck', 'true');
        }

        // :: Events :: //

    var noteKeyEvents = function( event: KeyboardEvent ) { noteObject.keyboardShortcuts( event ); };

    noteEntry.addEventListener( 'keydown' , noteKeyEvents, false );
    noteEntry.addEventListener( 'keyup' , noteKeyEvents, false );

    $( noteEntry ).bind( 'focus',
        function()
        {
        noteObject.setFocusStyle();
        Data.setActiveNotePosition( noteObject.getPosition() );
        });

    $( noteEntry ).bind( 'blur',
        function()
        {
        noteObject.removeFocusStyle();
        Data.setActiveNotePosition( -1 );
        });


    openWindow.addEventListener( 'click', function() { NoteWindow.open( noteObject ); }, false );

    delNote.addEventListener( 'click', function() { noteObject.parentObject.removeNote( noteObject ); }, false );

        // :: Other :: //

        // make notes draggable
    this.dragDrop = new DragDrop( noteContainer, noteControls, this );

    this.parentObject = container;
    this.noteEntry = noteEntry;
    this.noteContainer = noteContainer;
    this.backgroundColor = colorObject;

    if ( args.saveToUndo !== false )
        {
        UndoRedo.add( 'addedNote', this );
        }

    if ( args.fromLoad !== true )
        {
        Data.newNote( this );
        }

    return this;
    }


/*
 * Generates a color and returns a Color object
 *
 *      With red/green/blue going from 0 to 255
 *          and alpha from 0 to 1
 *
 * reads OPTIONS.generateColorType, to see in what way to generate the background colors
 *
 * There's 3 ways to generate the color:
 *
 *      "fixed_order"  : switch between a number of known colors
 *      "random"       : generate a random color every time
 *      "color_gradient" : a gradient, starting at a darker color, then moving to a brighter color, then back to the darker color...
 */
generateColor()
    {
    var red = 0, green = 0, blue = 0, alpha = 1;
    var generateColorType = Options.get( 'generateColorType' );


    if ( generateColorType === 'fixed_order' )
        {
        var color = this.getPosition() % 3;

        switch( color )
            {
            case 0:

                let hexColor1 = Options.get( 'fixedColor1' );
                let color1 = Utilities.hexToRgb( hexColor1 );

                red = color1.red;
                green = color1.green;
                blue = color1.blue;;
                break;

            case 1:

                let hexColor2 = Options.get( 'fixedColor2' );
                let color2 = Utilities.hexToRgb( hexColor2 );

                red = color2.red;
                green = color2.green;
                blue = color2.blue;
                break;

            case 2:

                let hexColor3 = Options.get( 'fixedColor3' );
                let color3 = Utilities.hexToRgb( hexColor3 );

                red = color3.red;
                green = color3.green;
                blue = color3.blue;
                break;
            }

        alpha = 0.6;
        }

    else if ( generateColorType === 'random' )
        {
            // Math.random() --> returns a random number from 0 to 1 (not including 1)
            // Math.round()  --> to get an integer
        red   = Math.round( Math.random() * 255 );
        green = Math.round( Math.random() * 255 );
        blue  = Math.round( Math.random() * 255 );

            // means its a bright color -- choose another to get a darker color
        if ( red > 200 && green > 200 && blue && 200 )
            {
                // change two of them
            red   = Math.round( Math.random() * 100 );
            green = Math.round( Math.random() * 100 );
            }

            // get a value between 1 and 0.5
        alpha = Math.random() * 0.5 + 0.5;
        }

        // "color_gradient"
    else
        {
            // in hex format
        var hexStartColor = Options.get( 'colorGradientStart' );
        var hexEndColor = Options.get( 'colorGradientEnd' );

            // get the rgb components
        let start = Utilities.hexToRgb( hexStartColor );
        let end = Utilities.hexToRgb( hexEndColor );

        var notesPerCycle = 10;
        var position = this.getPosition();
        var cycles = 0;

            // 'remove' the cycles from the position
        while (position > notesPerCycle)
            {
            cycles++;
            position -= notesPerCycle;
            }

            // going up
        if ( (cycles % 2) === 0 )
            {
            red = Math.round( start.red + position * (end.red - start.red) / notesPerCycle );
            green = Math.round( start.green + position * (end.green - start.green) / notesPerCycle );
            blue = Math.round( start.blue + position * (end.blue - start.blue) / notesPerCycle );
            }

            // going down
        else
            {
            red = Math.round( start.red + (notesPerCycle - position) * (end.red - start.red) / notesPerCycle );
            green = Math.round( start.green + (notesPerCycle - position) * (end.green - start.green) / notesPerCycle );
            blue = Math.round( start.blue + (notesPerCycle - position) * (end.blue - start.blue) / notesPerCycle );
            }

        alpha = 0.7;
        }

    return new Color({ red: red, green: green, blue: blue, alpha: alpha });
    }


/*
 * Put (keyboard) focus on a note
 */
gainFocus()
    {
    this.noteEntry.focus();
    }


/*
 * A style for the note that is currently on focus
 */
setFocusStyle()
    {
    $( this.noteContainer ).addClass( 'NoteOnFocus' );
    }


/*
 * Remove the special styling for the note on focus (when it no longer is (on blur, for example))
 */
removeFocusStyle()
    {
    $( this.noteContainer ).removeClass( 'NoteOnFocus' );
    }


/*
 * returns the element's position
 */
getPosition()
    {
    return this.position;
    }


/**
 * Set the element's current position.
 */
setPosition( position: number )
    {
    this.position = position;
    }


/*
 * get the text of the note
 */
getText()
    {
    return this.noteEntry.innerHTML;
    }


setText( text: string )
    {
    if (typeof text === 'undefined' || text === null)
        {
        text = "<br>";
        }

    this.noteEntry.innerHTML = text;
    }


/*
 * Returns a Color object, representing the background color
 */
getColorObject()
    {
    return this.backgroundColor;
    }


updateBackgroundColor()
    {
    this.noteContainer.style.backgroundColor = this.backgroundColor.getCssRepresentation();
    }


/*
 * tells if this is the first element or not
 */
isFirst()
    {
    if (this.position === 0)
        {
        return true;
        }

    return false;
    }


/*
 * tells if this is the last element
 */
isLast()
    {
    if ( this.position + 1 === this.parentObject.childrenCount() )
        {
        return true;
        }

    return false;
    }


/*
 * returns the next element object (or null if we're at the end)
 */
next()
    {
    return this.parentObject.getChild( this.position + 1 );
    }


/*
 * returns the previous element object (or null if there isn't one)
 */
previous()
    {
    return this.parentObject.getChild( this.position - 1 );
    }


getHtmlElement()
    {
    return this.noteContainer;
    }


/*
    - ctrl + left arrow  : focus to the note to the left (or the dummy note, if its the first note)
    - ctrl + right arrow : focus to the note to the right (or dummy note, if its the last one)
    - ctrl + delete      : delete the note
    - ctrl + enter       : create a new note in the next position
    - alt + w            : open the NoteWindow

 */
keyboardShortcuts( event: KeyboardEvent )
    {
    var noteObject = this;
    var key = event.which;

        // used when we're selecting another element than this
    var otherNoteObject;

    if (event.type === 'keydown')
        {
            // focus to the note to the left (or the dummy note, if its the first note)
        if ( event.ctrlKey && key === Utilities.EVENT_KEY.leftArrow )
            {
            otherNoteObject = noteObject.previous();

            if (otherNoteObject !== null)
                {
                otherNoteObject.gainFocus();
                }

                // means this is the first note, go to the .dummyNote
            else
                {
                this.parentObject.getDummy().gainFocus();
                }
            }

            // focus to the note to the right (or dummy note, if its the last one)
        else if ( event.ctrlKey && key === Utilities.EVENT_KEY.rightArrow )
            {
            otherNoteObject = noteObject.next();

            if (otherNoteObject !== null)
                {
                otherNoteObject.gainFocus();
                }

                // means this is the last element, go to .dummyNote
            else
                {
                this.parentObject.getDummy().gainFocus();
                }
            }

            // create a new note in the next position
        else if ( event.ctrlKey && key === Utilities.EVENT_KEY.enter )
            {
            otherNoteObject = this.parentObject.newNote({
                text: "",
                saveToUndo: true,
                position: this.getPosition() + 1
                });

            otherNoteObject.gainFocus();
            }

        event.stopPropagation();
        }

    else if (event.type === 'keyup')
        {
                // remove the note
        if ( event.ctrlKey && key === Utilities.EVENT_KEY.del )
            {
                // we'll try to give focus to the next note, or the previous if this is the last note
                // if this is the only note left, focus goes to the dummy note
            otherNoteObject = this.next();

            if (otherNoteObject === null)
                {
                otherNoteObject = this.previous();

                if (otherNoteObject === null)
                    {
                    otherNoteObject = this.parentObject.getDummy();
                    }
                }

            this.parentObject.removeNote( this );
            otherNoteObject.gainFocus();
            }

            // open the NoteWindow
        else if (event.altKey && key === Utilities.EVENT_KEY.w)
            {
            NoteWindow.open( noteObject );
            }
        }
    }
}