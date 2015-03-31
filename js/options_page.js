/*jslint white: true, vars: true, browser: true, newcap: true, plusplus: true*/
/*global $, PopupWindow, OPTIONS, TYPE, BASE_URL*/


'use strict';

/*
 * The page where you change the options of the program
 */

function OptionsPage()
{
var container = document.createElement( 'div' );

var url = BASE_URL + 'options.html';


$( container ).load( url,
    function()
    {
    new PopupWindow( container );


        // :: Width :: //
        
    //var slider = container.querySelector( 'Options-noteSlider' );
    var widthSlider = document.createElement( 'div' );   //HERE n funciona com o k esta na options.html


    var widthValue = container.querySelector( '#Options-noteWidth' );
    
    widthValue.innerHTML = OPTIONS.noteWidth;

    $( widthSlider ).slider({
        value : OPTIONS.noteWidth,
        min   : 150,
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
        min   : 100,
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
    
    backgroundColorValue.innerHTML = OPTIONS.generateColorType;
    
    $( backgroundColor ).bind('click', function(event) { OptionsPage.switchBackgroundColor( event, backgroundColorValue ); });
    
    
        // :: SpellCheck :: //
        
    var spellCheck = container.querySelector( '#Options-spellCheck' );
    var spellCheckValue = container.querySelector( '#Options-spellCheckValue' );
    
    spellCheckValue.innerHTML = OptionsPage.boolToYesNo( OPTIONS.spellCheck );
    
 
    $( spellCheck ).bind('click', function(event) { OptionsPage.switchSpellCheck( event, spellCheckValue ); });
    

        // :: Export notes :: //

    var exportNotes = container.querySelector( '#Options-export' );

    exportNotes.onclick = function()
        {
        var notes = Save.notesToJson();

        var notesString = JSON.stringify( notes, null, 4 );

        exportNotes.href = "data:text/plain;base64," + utf8_to_b64( notesString );
        };
    });
}



/*
 * true  --> "Yes"
 * false --> "No"
 */

OptionsPage.boolToYesNo = function( boolVar )
{
if ( boolVar === true )
    {
    return "Yes";
    }

return "No";
};



/*
 * Arguments:
 * 
 *      event : the on click event object
 *      spellCheckValue : the html element to update the values (to show the user the new value)
 */

OptionsPage.switchSpellCheck = function( event, spellCheckValue )
{
if (event.type === 'click')
    {
        // OPTIONS.spellCheck is a bool variable, so the not operator turns a true to false, or a false to true
    OPTIONS.spellCheck = !OPTIONS.spellCheck;
    
        // update the text, with a "Yes" or "No"
    spellCheckValue.innerHTML = OptionsPage.boolToYesNo( OPTIONS.spellCheck );
    }
};



/*
 * Arguments:
 * 
 *      event : the on click event object
 *      backgroundColorValue : the html element to update the values (to show the user the new value)
 */

OptionsPage.switchBackgroundColor = function( event, backgroundColorValue )
{  
switch( OPTIONS.generateColorType )
    {
    case 'fixed_order':

        OPTIONS.generateColorType = 'random';
        backgroundColorValue.innerHTML = 'random';
        break;
    
    case 'random':

        OPTIONS.generateColorType = 'red_gradient';
        backgroundColorValue.innerHTML = 'red_gradient';
        break;
    
    case 'red_gradient':        

        OPTIONS.generateColorType = 'fixed_order';
        backgroundColorValue.innerHTML = 'fixed_order';
        break;

    }
};
