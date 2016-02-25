var MAIN_CONTAINER = null;


window.onload = function()
{
Data.load( initApp );
};


function initApp()
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
}
