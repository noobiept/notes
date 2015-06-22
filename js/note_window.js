/*
 * Open a popup window for a note
 */

function NoteWindow( noteObject )
{
    // :: Menu :: //
    
var removeNote = Draw( 'delNote' );

removeNote.addEventListener( 'click', NoteWindow.removeNote, false );


var options = document.createElement( 'div' );

options.className = "NoteWindow-options";
options.innerHTML = "Options"; 


var menu = document.createElement( 'div' );

menu.className = "NoteWindow-menu";

menu.appendChild( options );
menu.appendChild( removeNote );


$( options ).bind( 'click', function() 
    {
        // open with the noteObject of the currently displayed note (it can change with the left/right arrows)
        // don't bind to the initial note
    NoteWindow.openOptions( NoteWindow.noteObject_obj );  
    });



    // :: Text :: //

var text = document.createElement( 'div' );

text.setAttribute( 'contenteditable', 'true' );
text.className = "NoteWindow-text";
text.innerHTML = noteObject.getText();



if (Options.get( 'spellCheck' ) === false)
    {
    text.setAttribute('spellcheck', 'false');
    }

else
    {
    text.setAttribute('spellcheck', 'true');
    }


    // :: Left arrow -- change to the note to the left :: //

var left = Draw( 'NoteWindow-leftArrow' );

//var width = $(window).width();
var height = $(window).height();

var halfHeight = height / 2;


$( left ).css( 'left', '100px' );  //HERE  -- por a ficar a uma certa distancia sempre da NoteWindow
$( left ).css( 'top', halfHeight + 'px' );


left.addEventListener( 'click', function() { NoteWindow.goLeftNote(); }, false );


    // :: Right arrow -- change to the note to the right :: //

var right = Draw( 'NoteWindow-rightArrow' );


$( right ).css( 'right', '100px' );//HERE
$( right ).css( 'top', halfHeight + 'px' );


right.addEventListener( 'click', function() { NoteWindow.goRightNote(); }, false );

    // :: Container :: //

var container = document.createElement( 'div' );

container.className = "NoteWindow";
container.style.backgroundColor = noteObject.getColorObject().getCssRepresentation();

container.appendChild( menu );
container.appendChild( text );

document.body.appendChild( left );
document.body.appendChild( right );



    // :: Other :: //

NoteWindow.text_ui = text;
NoteWindow.container_ui = container;
NoteWindow.noteObject_obj = noteObject;

NoteWindow.leftArrow_ui = left;
NoteWindow.rightArrow_ui = right;


NoteWindow.isOpened_bool = false;


NoteWindow.popupWindow_ui = new PopupWindow( container, NoteWindow.onStart, NoteWindow.onHide, NoteWindow.shortcuts, NoteWindow.resize );
}



/*
 * To be executed when the window is created
 * 
 * Set focus on the title entry
 */

NoteWindow.onStart = function()
{
NoteWindow.text_ui.focus();

NoteWindow.isOpened_bool = true;
};



/*
 * To be executed when the window is closed
 * 
 * Save the title/text, and set focus to the note
 */

NoteWindow.onHide = function()
{
var noteObject = NoteWindow.noteObject_obj;


NoteWindow.saveNote();

noteObject.gainFocus();


    // remove the left/right arrow
    
document.body.removeChild( NoteWindow.leftArrow_ui );
document.body.removeChild( NoteWindow.rightArrow_ui );

NoteWindow.isOpened_bool = false;
};




/*
 * saves the text in the NoteWindow back to the noteObject
 */

NoteWindow.saveNote = function()
{
var noteObject = NoteWindow.noteObject_obj;
    
noteObject.setText( NoteWindow.text_ui.innerHTML );    
};



/*
 * Change the note that is on the NoteWindow (the title/text)
 */

NoteWindow.updateContent = function( noteObject )
{
NoteWindow.text_ui.innerHTML = noteObject.getText();

NoteWindow.popupWindow_ui.resize();


NoteWindow.container_ui.style.backgroundColor = noteObject.getColorObject().getCssRepresentation();

NoteWindow.noteObject_obj = noteObject;



NoteWindow.text_ui.focus();
};



/*
 * Update the content of the NoteWindow with the note to the left 
 * 
 *      if there's only one, does nothing
 *      if first note, it goes to the last one
 * 
 */

NoteWindow.goLeftNote = function()
{
var noteObject = NoteWindow.noteObject_obj;
    
    // if there's only one, do nothing
if ( MAIN_CONTAINER.childrenCount() > 1 )
    {
    var otherElement = noteObject.previous();
            
        // this is the first one
    if ( otherElement === null )
        {
        otherElement = MAIN_CONTAINER.getLastChild();
        }     
            
    
        // the content of the note might have be changed (its only saved onHide())
    NoteWindow.saveNote();
            
    NoteWindow.updateContent( otherElement );
    }
};


/*
 * Update the content of the NoteWindow with the note to the right
 * 
 *      if there's only one, do nothing
 *      if its the last note, go to the first
 */

NoteWindow.goRightNote = function()
{
var noteObject = NoteWindow.noteObject_obj;
    
     // if there's only one, do nothing
if ( MAIN_CONTAINER.childrenCount() > 1 )
    {
    var otherElement = noteObject.next();
    
        // this is the first one
    if ( otherElement === null )
        {
        otherElement = MAIN_CONTAINER.getFirstChild();
        }     
    
        // the content of the note might have be changed (its only saved onHide())
    NoteWindow.saveNote();
    
    NoteWindow.updateContent( otherElement );
    } 
};



/*
 * re-calculate the position of the left/right arrows
 */

NoteWindow.resize = function()
{
var height = $( window ).height();

var halfHeight = height / 2;

var left = NoteWindow.leftArrow_ui;
var right = NoteWindow.rightArrow_ui;

var heightPx = halfHeight + 'px';

$( left ).css('top', heightPx);
$( right ).css('top', heightPx);
};



/*
 * Removes the note, and updates the window with the next/previous note (or just closes the window, if this is the last one)
 */

NoteWindow.removeNote = function()
{
var noteObject = NoteWindow.noteObject_obj;

    // the one that will get the focus
var otherNoteObject;

    // get the next note
otherNoteObject = noteObject.next();

    // or maybe the previous
if (otherNoteObject === null)
    {
    otherNoteObject = noteObject.previous();
    }

    // there's nothing left, hide the window
if (otherNoteObject === null)
    {
    var popupWindow = NoteWindow.popupWindow_ui;
        
    popupWindow.hide();
    }

    // update the content with other note
else
    {
    NoteWindow.updateContent( otherNoteObject );
    }

noteObject.remove();
};




/*
 * The options of the individual note (to change the background color)
 */

NoteWindow.openOptions = function( noteObject )
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

var colorPicker = new ColorPicker( colorObject, optionsContainer, onColorChange );


optionsContainer.appendChild( selectTypeContainer );
optionsContainer.appendChild( colorPicker ); 


var colorPickerOnHide = function() {
    
    NoteWindow.container_ui.style.backgroundColor = colorObject.getCssRepresentation();
    
    noteObject.updateBackgroundColor();
    };
    
new PopupWindow( optionsContainer, null, colorPickerOnHide );
};




/*
 * - ctrl + left arrow  : move to the note to the left (or if this is the first one, go to the last)
 * - ctrl + right arrow : move to the note to the right (or if this is the last one, go to the first)
 */

NoteWindow.shortcuts = function( event )
{
var key = event.which;

if (event.type === 'keyup')
    {
        // move to the note to the left (or if this is the first one, go to the last)
    if (event.ctrlKey && key === EVENT_KEY.leftArrow)
        {
        NoteWindow.goLeftNote();
        }
        
        // move to the note to the right (or if this is the last one, go to the first)
    else if (event.ctrlKey && key === EVENT_KEY.rightArrow)
        {
        NoteWindow.goRightNote();
        }
    }
};



/*
 * Tells if the NoteWindow is currently opened
 */

NoteWindow.isOpened = function()
{
return NoteWindow.isOpened_bool;
};
