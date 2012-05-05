
/*
 * function that is called throughout the code (its the interface)
 * calls all other functions, depending on which element to draw
 */

function Draw (className)
{
var element = document.createElement( 'canvas' );
element.className = className;

switch (className)
    {
    case 'delNote':
        
        element.title = 'remove note';
        Draw.removeNote( element );
        
        break;
        
    case 'openWindow':
    
        element.title = 'open window';
        Draw.openWindow( element );
    
        break;
        
    case 'NoteWindow-leftArrow':
    
        element.title = 'Previous Note';
        Draw.arrow( element, 'left' );
        
        break;
        
    case 'NoteWindow-rightArrow':
    
        element.title = 'Next Note';
        Draw.arrow( element, 'right' );
        
        break;
        
    }

return element;
}


/*
 * 
 */

Draw.arrow = function( canvas, orientation )
{
canvas.width  = 60;
canvas.height = 50;

var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

ctx.beginPath();

ctx.lineWidth = 1;
ctx.strokeStyle = 'rgb(255, 255, 255)';

    // 'margin' from the dimensions of the canvas (as in, don't start drawing at (0, 0), but (4, 4) for example)
var margin = 4;

if (orientation == 'left')
    {
    ctx.moveTo( width - margin, margin          );
    ctx.lineTo( margin        , height / 2      );
    ctx.lineTo( width - margin, height - margin );
    }

else
    {
    /*ctx.moveTo( margin        , margin          );
    ctx.lineTo( width - margin, height / 2      );
    ctx.lineTo( margin        , height - margin );*/
    ctx.moveTo( margin, margin );
    ctx.lineTo( margin, height - margin );
    
    ctx.moveTo( 2 * margin, margin );
    ctx.lineTo( 2 * margin, height - margin );
    
    ctx.moveTo( 4 * margin, margin );
    ctx.lineTo( 4 * margin, height - margin );
    ctx.lineTo( width - margin, height / 2 );
    ctx.lineTo( 4 * margin, margin );
    }


ctx.stroke();
};




/*
 * Draws the button in the note that opens the note's window
 */

Draw.openWindow = function( canvas )
{
var width = 15;
var height = 15;
    
canvas.width  = width;
canvas.height = height;

var ctx = canvas.getContext('2d');

ctx.beginPath();

ctx.lineWidth = 2;
ctx.strokeStyle = 'rgb(245, 230, 235)';

var step = 4;

for (var i = 2 ; i < height ; i += step)
    {
    ctx.moveTo( 2, i );
    ctx.lineTo( width - 2, i );
    }

ctx.stroke();
};


/*
 * 
 */

Draw.removeNote = function( canvas )
{
canvas.width  = 15;
canvas.height = 15;

var ctx = canvas.getContext('2d');
  /*  
if (Options.layout == 1)
    {
        //o gradiente radial
    ctx.beginPath();

    var gradient = ctx.createRadialGradient(7.5, 7.5, 1, 7.5, 7.5, 8);
    gradient.addColorStop(0, 'rgba(210, 90, 0, 1)');
    gradient.addColorStop(0.8, 'rgba(210, 90, 0, 0.7)');
    gradient.addColorStop(1, 'rgba(210, 90, 0, 0)');


    ctx.fillStyle = gradient;
    ctx.arc(7.5, 7.5, 7.5, 0, Math.PI *2, true);
    ctx.fill();
    }

else if (Options.layout == 2)
    {
        //envolvente da cruz
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 5;
    ctx.moveTo(2, 2);
    ctx.lineTo(13, 13);
    ctx.moveTo(13, 2);
    ctx.lineTo(2, 13);
    ctx.stroke();
    
        //a cruz
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.moveTo(2, 2);
    ctx.lineTo(13, 13);
    ctx.moveTo(13, 2);
    ctx.lineTo(2, 13);
    ctx.stroke();   
    }

else
    {*/
        //o circulo de baixo
    ctx.beginPath();
    ctx.fillStyle = "rgba(245, 230, 235, 0.3)";
    ctx.arc(7.5, 7.5, 4.5, 0, Math.PI * 2, true);
    ctx.fill();

        //the 'shadow' under the cross
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(245, 230, 235, 0.3)';
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.moveTo(2, 2);
    ctx.lineTo(13, 13);
    ctx.moveTo(13, 2);
    ctx.lineTo(2, 13);
    ctx.stroke();

        //a cruz
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(250, 250, 250)';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.moveTo(2, 2);
    ctx.lineTo(13, 13);
    ctx.moveTo(13, 2);
    ctx.lineTo(2, 13);
    ctx.stroke();
    //}
};



/*
 * 
 */

Draw.changeNoteElementsColor = function( noteObject )
{
var canvas = noteObject.noteContainer_ui.querySelector('.delNote');
    
var ctx = canvas.getContext('2d');


    //o circulo de baixo
ctx.beginPath();
ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
ctx.arc(7.5, 7.5, 4.5, 0, Math.PI * 2, true);
ctx.fill();

    //the 'shadow' under the cross
ctx.beginPath();
ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.moveTo(2, 2);
ctx.lineTo(13, 13);
ctx.moveTo(13, 2);
ctx.lineTo(2, 13);
ctx.stroke();

    //a cruz
ctx.beginPath();
ctx.strokeStyle = 'rgb(0, 0, 0)';
ctx.lineCap = 'round';
ctx.lineWidth = 2;
ctx.moveTo(2, 2);
ctx.lineTo(13, 13);
ctx.moveTo(13, 2);
ctx.lineTo(2, 13);
ctx.stroke();
};



/*
 * 
 */

Draw.changeNoteElementsBack = function( noteObject )
{
var canvas = noteObject.noteContainer_ui.querySelector('.delNote');

Draw.removeNote( canvas );
};


