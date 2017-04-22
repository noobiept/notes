module NoteWindow
{
var NOTE: Note;
var TEXT: HTMLElement;
var CONTAINER: HTMLElement;
var LEFT_ARROW: HTMLElement;
var RIGHT_ARROW: HTMLElement;
var POPUP_WINDOW: PopupWindow;


/*
 * Open a popup window for a note
 */
export function open( noteObject )
    {
        // :: Menu :: //

    var delNote = Draw.create( 'delNote' );

    delNote.addEventListener( 'click', removeNote, false );

    var options = document.createElement( 'div' );

    options.className = "NoteWindow-options";
    options.innerHTML = "Options";

    var menu = document.createElement( 'div' );

    menu.className = "NoteWindow-menu";

    menu.appendChild( options );
    menu.appendChild( delNote );

    $( options ).bind( 'click', function()
        {
            // open with the noteObject of the currently displayed note (it can change with the left/right arrows)
            // don't bind to the initial note
        openOptions( NOTE );
        });

        // :: Text :: //

    var text = document.createElement( 'div' );

    text.setAttribute( 'contenteditable', 'true' );
    text.className = "NoteWindow-text";
    text.innerHTML = noteObject.getText();
    text.addEventListener( 'input', function()
        {
        var noteText = this.innerHTML;
        NOTE.setText( noteText );
        Data.changeNoteText( NOTE );
        });

    if (Options.get( 'spellCheck' ) === false)
        {
        text.setAttribute('spellcheck', 'false');
        }

    else
        {
        text.setAttribute('spellcheck', 'true');
        }

        // :: Left arrow -- change to the note to the left :: //

    var left = Draw.create( 'NoteWindow-leftArrow' );

    //var width = $(window).width();
    var height = $(window).height();

    var halfHeight = height / 2;


    $( left ).css( 'left', '100px' );  //HERE  -- por a ficar a uma certa distancia sempre da NoteWindow
    $( left ).css( 'top', halfHeight + 'px' );


    left.addEventListener( 'click', function() { goLeftNote(); }, false );


        // :: Right arrow -- change to the note to the right :: //

    var right = Draw.create( 'NoteWindow-rightArrow' );


    $( right ).css( 'right', '100px' );//HERE
    $( right ).css( 'top', halfHeight + 'px' );


    right.addEventListener( 'click', function() { goRightNote(); }, false );

        // :: Container :: //

    var container = document.createElement( 'div' );

    container.className = "NoteWindow";
    container.style.backgroundColor = noteObject.getColorObject().getCssRepresentation();

    container.appendChild( menu );
    container.appendChild( text );

    document.body.appendChild( left );
    document.body.appendChild( right );

        // :: Other :: //

    TEXT = text;
    CONTAINER = container;
    NOTE = noteObject;

    LEFT_ARROW = left;
    RIGHT_ARROW = right;

    POPUP_WINDOW = new PopupWindow( container, onStart, onHide, shortcuts, resize );
    }


/*
 * To be executed when the window is created
 *
 * Set focus on the title entry
 */
function onStart()
    {
    TEXT.focus();
    }


/*
 * To be executed when the window is closed
 *
 * Save the title/text, and set focus to the note
 */
function onHide()
    {
    NOTE.gainFocus();

        // remove the left/right arrow
    document.body.removeChild( LEFT_ARROW );
    document.body.removeChild( RIGHT_ARROW );
    }


/*
 * Change the note that is on the NoteWindow (the title/text)
 */
function updateContent( noteObject )
    {
    TEXT.innerHTML = noteObject.getText();

    POPUP_WINDOW.resize();
    CONTAINER.style.backgroundColor = noteObject.getColorObject().getCssRepresentation();
    NOTE = noteObject;

    TEXT.focus();
    }


/*
 * Update the content of the NoteWindow with the note to the left
 *
 *      if there's only one, does nothing
 *      if first note, it goes to the last one
 */
function goLeftNote()
    {
        // if there's only one, do nothing
    if ( MAIN_CONTAINER.childrenCount() > 1 )
        {
        var otherElement = NOTE.previous();

            // this is the first one
        if ( otherElement === null )
            {
            otherElement = MAIN_CONTAINER.getLastChild();
            }

        updateContent( otherElement );
        }
    }


/*
 * Update the content of the NoteWindow with the note to the right
 *
 *      if there's only one, do nothing
 *      if its the last note, go to the first
 */
function goRightNote()
    {
        // if there's only one, do nothing
    if ( MAIN_CONTAINER.childrenCount() > 1 )
        {
        var otherElement = NOTE.next();

            // this is the first one
        if ( otherElement === null )
            {
            otherElement = MAIN_CONTAINER.getFirstChild();
            }

        updateContent( otherElement );
        }
    }


/*
 * re-calculate the position of the left/right arrows
 */
function resize()
    {
    var height = $( window ).height();
    var halfHeight = height / 2;
    var heightPx = halfHeight + 'px';

    $( LEFT_ARROW ).css('top', heightPx);
    $( RIGHT_ARROW ).css('top', heightPx);
    }


/*
 * Removes the note, and updates the window with the next/previous note (or just closes the window, if this is the last one)
 */
function removeNote()
    {
        // the one that will get the focus
    var otherNoteObject;

        // get the next note
    otherNoteObject = NOTE.next();

        // or maybe the previous
    if (otherNoteObject === null)
        {
        otherNoteObject = NOTE.previous();
        }

        // there's nothing left, hide the window
    if (otherNoteObject === null)
        {
        POPUP_WINDOW.hide();
        }

        // update the content with other note
    else
        {
        updateContent( otherNoteObject );
        }

    NOTE.remove();
    }


/*
 * The options of the individual note (to change the background color)
 */
function openOptions( noteObject )
    {
    var colorObject = noteObject.getColorObject();

    var backgroundColorText = document.createElement( 'div' );
    backgroundColorText.innerHTML = "Background color:";

    var generatedType = document.createElement( 'div' );
    generatedType.className = "NoteWindow-generated";
    generatedType.innerHTML = "is generated";

    var fixedType = document.createElement( 'div' );
    fixedType.className = "NoteWindow-fixed";
    fixedType.innerHTML = "is fixed";

    if (colorObject.wasSetByUser() === true)
        {
        fixedType.classList.add( "NoteWindow-selected" );
        }

    else
        {
        generatedType.classList.add( "NoteWindow-selected" );
        }

    var selectTypeContainer = document.createElement( 'div' );

    selectTypeContainer.className = "NoteWindow-selectBackgroundTypeContainer";
    selectTypeContainer.appendChild( backgroundColorText );
    selectTypeContainer.appendChild( generatedType );
    selectTypeContainer.appendChild( fixedType );

        // :: Events :: //

        // color stops being fixed, and can have a different color next time the program runs (can be generated)
    $( generatedType ).bind( 'click', function()
        {
        generatedType.classList.add( "NoteWindow-selected" );
        fixedType.classList.remove( "NoteWindow-selected" );

        colorObject.canBeGenerated( true );
        });

        // the current color becomes fixed
    $( fixedType ).bind( 'click', function()
        {
        fixedType.classList.add( "NoteWindow-selected" );
        generatedType.classList.remove( "NoteWindow-selected" );

        colorObject.canBeGenerated( false );
        });

        // :: Other :: //

    var optionsContainer = document.createElement( 'div' );

    var onColorChange = function()
        {
        generatedType.classList.remove( "NoteWindow-selected" );
        fixedType.classList.add( "NoteWindow-selected" );
        };

    var colorPicker = getColorPicker( colorObject, optionsContainer, onColorChange );

    optionsContainer.appendChild( selectTypeContainer );
    optionsContainer.appendChild( colorPicker );

    var colorPickerOnHide = function() {

        CONTAINER.style.backgroundColor = colorObject.getCssRepresentation();

        noteObject.updateBackgroundColor();
        Data.changeNoteBackgroundColor( noteObject );
        };

    new PopupWindow( optionsContainer, null, colorPickerOnHide );
    }


/*
 * - ctrl + left arrow  : move to the note to the left (or if this is the first one, go to the last)
 * - ctrl + right arrow : move to the note to the right (or if this is the last one, go to the first)
 */
function shortcuts( event )
    {
    var key = event.which;

    if (event.type === 'keyup')
        {
            // move to the note to the left (or if this is the first one, go to the last)
        if (event.ctrlKey && key === EVENT_KEY.leftArrow)
            {
            goLeftNote();
            }

            // move to the note to the right (or if this is the last one, go to the first)
        else if (event.ctrlKey && key === EVENT_KEY.rightArrow)
            {
            goRightNote();
            }
        }
    }
}