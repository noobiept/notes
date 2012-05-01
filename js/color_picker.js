/*global $*/


/*
 * Arguments:
 * 

 * 
 * 
 */

function ColorPicker( colorObject )
{
    // :: Init of variables required below :: //

var color = colorObject.getColor();

var red = color.red;
var green = color.green;
var blue = color.blue;
var alpha = ColorPicker.alpha;

var colorPickerObject = this;
    

this.color_obj = colorObject;

    
    // :: The letter indicating the base color :: //
    
var redText = document.createElement( 'div' );

redText.className = "ColorPicker-text";
redText.innerHTML = "Red";


var greenText = document.createElement( 'div' );

greenText.className = "ColorPicker-text";
greenText.innerHTML = "Green";


var blueText = document.createElement( 'div' );

blueText.className = "ColorPicker-text";
blueText.innerHTML = "Blue";


var alphaText = document.createElement( 'div' );

alphaText.className = "ColorPicker-text";
alphaText.innerHTML = "Alpha";

    
    // :: The current value of each color :: //
    
var redValue = document.createElement( 'div' );

redValue.className = "ColorPicker-value";
redValue.innerHTML = red;
    

var greenValue = document.createElement( 'div' );

greenValue.className = "ColorPicker-value";
greenValue.innerHTML = green;


var blueValue = document.createElement( 'div' );

blueValue.className = "ColorPicker-value";
blueValue.innerHTML = blue;


var alphaValue = document.createElement( 'div' );

alphaValue.className = "ColorPicker-value";
alphaValue.innerHTML = alpha;


    // :: A container for the text/value so that they appear next to each other :: //
    
var redTextValueContainer = document.createElement( 'div' );

redTextValueContainer.className = "ColorPicker-textValueContainer";
redTextValueContainer.appendChild( redText );
redTextValueContainer.appendChild( redValue );

var greenTextValueContainer = document.createElement( 'div' );

greenTextValueContainer.className = "ColorPicker-textValueContainer";
greenTextValueContainer.appendChild( greenText );
greenTextValueContainer.appendChild( greenValue );

var blueTextValueContainer = document.createElement( 'div' );

blueTextValueContainer.className = "ColorPicker-textValueContainer";
blueTextValueContainer.appendChild( blueText );
blueTextValueContainer.appendChild( blueValue );

var alphaTextValueContainer = document.createElement( 'div' );

alphaTextValueContainer.className = "ColorPicker-textValueContainer";
alphaTextValueContainer.appendChild( alphaText );
alphaTextValueContainer.appendChild( alphaValue );

    // :: The sliders to change the color value :: //
    

var redSlider = document.createElement( 'div' );

redSlider.className = "ColorPicker-slider";

$( redSlider ).slider({
    value : red,
    min   : 0,
    max   : 255,
    step  : 1,
    slide : function(event, ui)
        {
        redValue.innerHTML = ui.value;
        
        colorObject.setRed( ui.value );
        
        colorPickerObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });


var greenSlider = document.createElement( 'div' );

greenSlider.className = "ColorPicker-slider";

$( greenSlider ).slider({
    value : green,
    min   : 0,
    max   : 255,
    step  : 1,
    slide : function(event, ui)
        {
        greenValue.innerHTML = ui.value;
        
        colorObject.setGreen( ui.value );
        
        colorPickerObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });


var blueSlider = document.createElement( 'div' );

blueSlider.className = "ColorPicker-slider";

$( blueSlider ).slider({
    value : blue,
    min   : 0,
    max   : 255,
    step  : 1,
    slide : function(event, ui)
        {
        blueValue.innerHTML = ui.value;
        
        
        colorObject.setBlue( ui.value );
        
        colorPickerObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });


var alphaSlider = document.createElement( 'div' );

alphaSlider.className = "ColorPicker-slider";

$( alphaSlider ).slider({
    value : alpha,
    min   : 0,
    max   : 1,
    step  : 0.05,
    slide : function(event, ui)
        {
        alphaValue.innerHTML = ui.value;
        
        colorObject.setAlpha( ui.value );
        
        colorPickerObject.updateBackground();
        //OPTIONS.noteWidth = ui.value;   //HERE
        }
    });
    
    
    // :: containers and stuff :: //
    
var redContainer = document.createElement( 'div' );

redContainer.className = "ColorPicker-colorContainer";
redContainer.appendChild( redTextValueContainer );
redContainer.appendChild( redSlider );


var greenContainer = document.createElement( 'div' );

greenContainer.className = "ColorPicker-colorContainer";
greenContainer.appendChild( greenTextValueContainer );
greenContainer.appendChild( greenSlider );


var blueContainer = document.createElement( 'div' );

blueContainer.className = "ColorPicker-colorContainer";
blueContainer.appendChild( blueTextValueContainer );
blueContainer.appendChild( blueSlider );


var alphaContainer = document.createElement( 'div' );

alphaContainer.className = "ColorPicker-colorContainer";
alphaContainer.appendChild( alphaTextValueContainer );
alphaContainer.appendChild( alphaSlider );


var mainContainer = document.createElement( 'div' );

mainContainer.className = "ColorPicker-container";

this.mainContainer_ui = mainContainer;

mainContainer.appendChild( redContainer );
mainContainer.appendChild( greenContainer );
mainContainer.appendChild( blueContainer );
mainContainer.appendChild( alphaContainer );


colorPickerObject.updateBackground();


return mainContainer;
}





/*
 * 
 */

ColorPicker.prototype.updateBackground = function()
{
$( this.mainContainer_ui ).css( 'background-color', this.color_obj.getCssRepresentation() );
};



