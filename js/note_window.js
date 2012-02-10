/*global PopupWindow*/



/*
 * Open a popup window for a note
 */

function NoteWindow( noteObject )
{
var container = document.createElement( 'div' );

var text = document.createElement( 'div' );

text.setAttribute( 'contenteditable', 'true' );
text.className = "NoteWindow-text";

text.innerHTML = noteObject.getText();

container.appendChild( text );


NoteWindow.text_ui = text;
NoteWindow.noteObject = noteObject;

var popup = new PopupWindow();

popup.show( container, text, null/*noteObject*/, NoteWindow.onHide  );  //HERE n esta a fazer o focus dps para a Note...
}



NoteWindow.onHide = function()
{
NoteWindow.noteObject.setText( NoteWindow.text_ui.innerHTML );
};



