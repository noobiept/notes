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


    $( slider ).slider({
        value : 100,
        min   : 50,
        max   : 300,
        step  : 50,
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
