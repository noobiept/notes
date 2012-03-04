/*global $, PopupWindow, OPTIONS*/


/*
 * 
 */

function OptionsPage()
{
var container = document.createElement( 'div' );

$( container ).load( '../options.html',
    function()
    {
    //var slider = container.querySelector( 'Options-noteSlider' );
    var slider = document.createElement( 'div' );   //HERE n funciona com o k esta na options.html

    var showValue = container.querySelector( '#Options-noteDimension' );
    
    showValue.innerHTML = OPTIONS.noteDimension;

    $( slider ).slider({
        value : OPTIONS.noteDimension,
        min   : 50,
        max   : 200,
        step  : 25,
        slide : function(event, ui)
            {
            showValue.innerHTML = ui.value;
            OPTIONS.noteDimension = ui.value;
            }
        });
    
    container.appendChild( slider );    //HERE
    
    new PopupWindow( container );    
    });
}
