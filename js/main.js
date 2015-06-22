/*jslint white: true, vars: true, browser: true, newcap: true*/
/*global MainContainer, window, Save, Load, PopupWindow, NoteWindow, Analytics*/

'use strict';

/*
    In the server version, the index.html (in the server templates) has these variables re-defined
 */

var TYPE = 'app';
var BASE_URL = '';
 
 
var OPTIONS = {
    noteWidth  : 250,   // the width/height of each note
    noteHeight : 125,
    noteMargin : 7,
    activeNotePosition : -1,               // which note to get focus on the beginning of the program (-1 means no one)
    generateColorType  : 'red_gradient',   // how to generate the background-color of the notes
    analyticsTimer     : -1,
    spellCheck : true
    };


var MAIN_CONTAINER = null;



window.onload = function()
{
MAIN_CONTAINER = new MainContainer();
    

Load();


var resize = function() 
    {
    if (PopupWindow.hasOpenedWindows() === true)
        {
        PopupWindow.resizeAll();            
        }    
    };


resize();

    // resize/reposition the popup windows, according to the space available
window.addEventListener( 'resize', resize, true );    

window.addEventListener( 'keyup', globalShortcuts, true );
};




    // 'on before unload' instead of 'on unload' so that in the server version, when refreshing (F5)
    // the logout gets called first, than the load of the new page (otherwise, the new load will have the previous data)
window.onbeforeunload = function()
{
    //save some stuff when the application is closed
Save(); 
}; 



/*
 * Logout the user as well
 */

function Logout()
{
    // remove the function from the event, otherwise its going to be called again (the Save() will redirect to '/')
window.onbeforeunload = null;
    
Save( true );
}

