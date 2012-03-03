/*global PopupWindow*/



/*
 * Open a popup window for a note
 */

function NoteWindow( noteObject )
{
    // :: Title :: //
    
var title = document.createElement( 'div' );

title.setAttribute( 'contenteditable', 'true' );
title.className = "NoteWindow-title";

title.innerHTML = noteObject.getTitle();


    // :: Text :: //

var text = document.createElement( 'div' );

text.setAttribute( 'contenteditable', 'true' );
text.className = "NoteWindow-text";
text.innerHTML = noteObject.getText();


    // :: Container :: //

var container = document.createElement( 'div' );

container.appendChild( title );
container.appendChild( text );


    // :: Other :: //

NoteWindow.title_ui = title;
NoteWindow.text_ui = text;
NoteWindow.noteObject = noteObject;


var popup = new PopupWindow();

popup.show( container, text, noteObject, NoteWindow.onHide  );  //HERE n esta a fazer o focus dps para a Note...
}



NoteWindow.onHide = function()
{
var noteObject = NoteWindow.noteObject;

noteObject.setTitle( NoteWindow.title_ui.innerHTML );
noteObject.setText( NoteWindow.text_ui.innerHTML );
};



