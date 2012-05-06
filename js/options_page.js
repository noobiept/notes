/*jslint white: true, vars: true, browser: true, newcap: true, plusplus: true*/
/*global $, PopupWindow, OPTIONS*/


'use strict';

/*
 * 
 */

function OptionsPage()
{
var container = document.createElement( 'div' );

$( container ).load( '../options.html',
    function()
    {
        // :: Width :: //
        
    //var slider = container.querySelector( 'Options-noteSlider' );
    var widthSlider = document.createElement( 'div' );   //HERE n funciona com o k esta na options.html

    var widthValue = container.querySelector( '#Options-noteWidth' );
    
    widthValue.innerHTML = OPTIONS.noteWidth;

    $( widthSlider ).slider({
        value : OPTIONS.noteWidth,
        min   : 50,
        max   : 350,
        step  : 25,
        slide : function(event, ui)
            {
            widthValue.innerHTML = ui.value;
            OPTIONS.noteWidth = ui.value;
            }
        });
    
    
        // :: Height :: //
    
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
    
            // :: Margin :: //
    
    var marginValue = container.querySelector( '#Options-margin' );
    
    var marginSlider = document.createElement( 'div' );
    
    marginValue.innerHTML = OPTIONS.noteMargin;
    
    $( marginSlider ).slider({
        value : OPTIONS.noteMargin,
        min   : 0,
        max   : 20,
        step  : 1,
        slide : function(event, ui)
            {
            marginValue.innerHTML = ui.value;
            OPTIONS.noteMargin = ui.value;
            }
        });
    
    

    widthValue.parentNode.parentNode.appendChild( widthSlider );
    heightValue.parentNode.parentNode.appendChild( heightSlider );
    marginValue.parentNode.parentNode.appendChild( marginSlider );    
    
    //$( widthSlider  ).insertAfter( widthValue );  //HERE se desse para usar o k ja esta nas opções...
    //$( heightSlider ).insertAfter( heightValue );
    //$( marginSlider ).insertAfter( marginValue );
    
    
        // :: Generate background-color :: //
        
    var backgroundColor = container.querySelector( '#Options-backgroundColor' );
    var backgroundColorValue = container.querySelector( '#Options-backgroundColorValue' );
    
    backgroundColorValue.innerHTML = OPTIONS.generateBackgroundColor;
    
    backgroundColor.addEventListener( 'click', function() { OptionsPage.switchBackgroundColor( backgroundColorValue ); }, false );
    
    
 
    
    
    new PopupWindow( container );    
    });
}



/*
 * 
 */

OptionsPage.switchBackgroundColor = function( backgroundColorValue )
{  
switch( OPTIONS.generateBackgroundColor )
    {
    case 'fixed_order':

        OPTIONS.generateBackgroundColor = 'random';
        backgroundColorValue.innerHTML = 'random';
        break;
    
    case 'random':

        OPTIONS.generateBackgroundColor = 'red_gradient';
        backgroundColorValue.innerHTML = 'red_gradient';
        break;
    
    case 'red_gradient':        

        OPTIONS.generateBackgroundColor = 'fixed_order';
        backgroundColorValue.innerHTML = 'fixed_order';
        break;

    }
};
