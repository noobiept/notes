var MAIN_CONTAINER = null;


window.onload = function()
{
AppStorage.getData( [ 'notes', 'options' ], initApp );
};


function initApp( data )
{
MAIN_CONTAINER = new MainContainer();

Load( data );


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
}


    // 'on before unload' instead of 'on unload' so that in the server version, when refreshing (F5)
    // the logout gets called first, than the load of the new page (otherwise, the new load will have the previous data)
    // in a chrome application, this event isn't available, so its saved instead on the 'background.js'
if ( !(window.chrome && window.chrome.storage) )
    {
    window.onbeforeunload = function()
        {
            //save some stuff when the application is closed
        Save();
        };
    }

