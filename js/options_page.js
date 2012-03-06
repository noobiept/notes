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

    var showValue = container.querySelector( '#Options-noteWidth' );
    
    showValue.innerHTML = OPTIONS.noteWidth;

    $( slider ).slider({
        value : OPTIONS.noteWidth,
        min   : 50,
        max   : 300,
        step  : 25,
        slide : function(event, ui)
            {
            showValue.innerHTML = ui.value;
            OPTIONS.noteWidth = ui.value;
            }
        });
    
    
    var heightValue  = container.querySelector( '#Options-noteHeight' );
    //var heightSlider = container.querySelector( 'Options-noteHeightSlider' );     //HERE
    var heightSlider = document.createElement( 'div' );
    
    heightValue.innerHTML = OPTIONS.noteHeight;
    
    $( heightSlider ).slider({
        value : OPTIONS.noteHeight,
        min   : 50,
        max   : 200,
        step  : 25,
        slide : function(event, ui)
            {
            heightValue.innerHTML = ui.value;
            OPTIONS.noteHeight = ui.value;
            }
        });
    
    
    container.appendChild( slider );    //HERE
    container.appendChild( heightSlider );
    
    new PopupWindow( container );    
    });
}
