/*global $*/

/*
 * 
 */

function ColorPicker()
{
    // :: Init of variables required below :: //
    
var colorObject = this;
    

this.red_int = 0;
this.green_int = 0;
this.blue_int = 0;  //HERE do load
this.alpha_int = 1;

    
    // :: The letter indicating the base color :: //
    
var redText = document.createElement( 'div' );

redText.className = "ColorPicker-text";
redText.innerHTML = "R";


var greenText = document.createElement( 'div' );

greenText.className = "ColorPicker-text";
greenText.innerHTML = "G";


var blueText = document.createElement( 'div' );

blueText.className = "ColorPicker-text";
blueText.innerHTML = "B";


var alphaText = document.createElement( 'div' );

alphaText.className = "ColorPicker-text";
alphaText.innerHTML = "A";

    
    // :: The current value of each color :: //
    
var redValue = document.createElement( 'div' );

redValue.className = "ColorPicker-value";
redValue.innerHTML = "0";   //HERE vem do load
    

var greenValue = document.createElement( 'div' );

greenValue.className = "ColorPicker-value";
greenValue.innerHTML = "0";   //HERE vem do load


var blueValue = document.createElement( 'div' );

blueValue.className = "ColorPicker-value";
blueValue.innerHTML = "0";   //HERE vem do load


var alphaValue = document.createElement( 'div' );

alphaValue.className = "ColorPicker-value";
alphaValue.innerHTML = "0";   //HERE vem do load


    // :: The sliders to change the color value :: //
    

var redSlider = document.createElement( 'div' );

redSlider.className = "ColorPicker-slider";

$( redSlider ).slider({
    value : 0,  //HERE do load
    min   : 0,
    max   : 255,
    step  : 1,
    slide : function(event, ui)
        {
        redValue.innerHTML = ui.value;
        
        colorObject.red_int = ui.value;
        
        colorObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });


var greenSlider = document.createElement( 'div' );

greenSlider.className = "ColorPicker-slider";

$( greenSlider ).slider({
    value : 0,  //HERE do load
    min   : 0,
    max   : 255,
    step  : 1,
    slide : function(event, ui)
        {
        greenValue.innerHTML = ui.value;
        
        colorObject.green_int = ui.value;
        
        colorObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });


var blueSlider = document.createElement( 'div' );

blueSlider.className = "ColorPicker-slider";

$( blueSlider ).slider({
    value : 0,  //HERE do load
    min   : 0,
    max   : 255,
    step  : 1,
    slide : function(event, ui)
        {
        blueValue.innerHTML = ui.value;
        
        
        colorObject.blue_int = ui.value;
        
        colorObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });


var alphaSlider = document.createElement( 'div' );

alphaSlider.className = "ColorPicker-slider";

$( alphaSlider ).slider({
    value : 1,  //HERE do load
    min   : 0,
    max   : 1,
    step  : 0.05,
    slide : function(event, ui)
        {
        alphaValue.innerHTML = ui.value;
        
        colorObject.alpha_int = ui.value;
        
        colorObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });
    
    
    // :: containers and stuff :: //
    
var redContainer = document.createElement( 'div' );

redContainer.appendChild( redText );
redContainer.appendChild( redValue );
redContainer.appendChild( redSlider );


var greenContainer = document.createElement( 'div' );

greenContainer.appendChild( greenText );
greenContainer.appendChild( greenValue );
greenContainer.appendChild( greenSlider );


var blueContainer = document.createElement( 'div' );

blueContainer.appendChild( blueText );
blueContainer.appendChild( blueValue );
blueContainer.appendChild( blueSlider );


var alphaContainer = document.createElement( 'div' );

alphaContainer.appendChild( alphaText );
alphaContainer.appendChild( alphaValue );
alphaContainer.appendChild( alphaSlider );


var mainContainer = document.createElement( 'div' );

mainContainer.className = "ColorPicker-container";

this.mainContainer_ui = mainContainer;

mainContainer.appendChild( redContainer );
mainContainer.appendChild( greenContainer );
mainContainer.appendChild( blueContainer );
mainContainer.appendChild( alphaContainer );


colorObject.updateBackground();


return mainContainer;
}





/*
 * 
 */

ColorPicker.prototype.updateBackground = function()
{
var color = 'rgba(' + this.red_int + "," + this.green_int + "," + this.blue_int + "," + this.alpha_int + ')';
    
$( this.mainContainer_ui ).css( 'background-color', color );
};
