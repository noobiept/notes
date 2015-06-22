/*
    In the server version, the index.html (in the server templates) has these variables re-defined
 */

var TYPE = 'app';
var BASE_URL = '';
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

