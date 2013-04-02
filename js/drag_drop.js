/*jslint white: true, vars: true, browser: true*/
/*global $*/

'use strict';

/*
 * Notes
 * 
 *      can be sorted
 * 
 *
 * 
 * Arguments:
 * 
 *      element       : the html element that can be dragged (an entry, list or tab)
 *      dragElement   : the html element that is used to start the drag of the actual element
 *      elementObject : the object that represents the element
 * 
 */

function DragDrop (element, dragElement, elementObject)
{
var dragObject = this;

element.addEventListener( 'dragstart', function(event) { dragObject.onDragStart(event); }, false );
element.addEventListener( 'drop'     , function(event) { dragObject.onDrop(event);      }, false );
element.addEventListener( 'dragover' , function(event) { dragObject.onDragOver(event);  }, false );
element.addEventListener( 'dragleave', function(event) { dragObject.onDragLeave(event); }, false );


    //the drag handler
$( dragElement ).attr( 'draggable', 'true' );
//element.setAttribute( 'draggable', 'true' );


this.dragElement_ui = dragElement;

this.element_ui = element;
this.elementObject_obj = elementObject;
}


    //has the object of the element that is being dragged
DragDrop.dragElement_class = null;






/*
 * Checks if its a valid drop place, for the element you're dragging
 */

DragDrop.prototype.isValidDrop = function ()
{
    //the element of where we drop the drag one
var elementObject = this.elementObject_obj;

    //what we're dragging
var dragObject = DragDrop.dragElement_class;
    
    //see if we're not dropping on the same place
if ( dragObject !== elementObject )
    {
    return true;
    }

return false;
};



/*
 * when the drag of an element starts
 */

DragDrop.prototype.onDragStart = function (event)
{
event.dataTransfer.setData("text/plain", "");   //HERE to work on firefox too

event.dataTransfer.effectAllowed = 'move';
    
    //so that the image that is shown during the drag, is of the element, and not the drag handle
event.dataTransfer.setDragImage(this.element_ui, 0, 0);

    //the element that is been dragged
DragDrop.dragElement_class = this.elementObject_obj;


event.stopPropagation();
};



/*
 * when an element is dropped over a valid place, we have to switch the positions between the element that is was
 *      been dragged, and the element where the drop occurred
 */

DragDrop.prototype.onDrop = function(event)
{

    //remove the css effect for valid drop places  
this.element_ui.classList.remove( 'validDrop' );            


    //the element of where we drop the drag one
var elementObject = this.elementObject_obj;

    //what we're dragging
var dragObject = DragDrop.dragElement_class;

    //see if we're not dropping on the same place
if ( dragObject !== elementObject )
    {
    dragObject.moveTo( elementObject.getPosition() );
    }

DragDrop.dragElement_class = null;


event.stopPropagation();

return false;
};



/*
 * Allows or not the drop to occur
 */

DragDrop.prototype.onDragOver = function(event)
{
    //if this is a valid drop, let it be possible to occur
if ( this.isValidDrop() === true )
    {
        //add the css effect for valid drop places (this is also added in the onDragEnter, but having it here helps)  
    this.element_ui.classList.add( 'validDrop' );            

    
        //to allow the drop to occur
    event.preventDefault();
    
        //cancel as-well when its a valid drop
    event.stopPropagation();
    
    return false;
    }



event.stopPropagation();
};





/*
 * Remove the effect of a valid drop place
 */

DragDrop.prototype.onDragLeave = function(event)
{
if ( this.isValidDrop() === true )
    {
        //remove the css effect for valid drop places  
    this.element_ui.classList.remove( 'validDrop' );            
    }


event.stopPropagation();
};
