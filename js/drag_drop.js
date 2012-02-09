/*global */

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
 *      dragElement   : the html element that is used to start the drag of the actual element (.dragEntry, .dragList or .dragTab)
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
//$( dragElement ).attr( 'draggable', 'true' );
element.setAttribute( 'draggable', 'true' );


this.dragElement_ui = dragElement;

this.element_ui = element;
this.elementObject_obj = elementObject;
}


    //has the object of the element that is been dragged
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
if ( (dragObject != elementObject) )
    {
    return true;
   /*     //and if we're dealing with the same kind of elements
    if ( dragObject.objectType() == elementObject.objectType() )
        {
        return true;
        }

        //there could also be a case where the objects are different
    else
        {
            //when dragging a list to another tab
        if ( dragObject instanceof List )
            {
            if ( elementObject instanceof Tab )
                {
                   //see if its not the current tab
                if ( dragObject.parentObject != elementObject )
                    {
                    return true;
                    } 
                }
            
                //when passing through the entries with a list, lets accept that too (drag of a list... passing through the entries)
                //so elementObject -> entryObject | dragObject -> listObject
            else if ( elementObject instanceof Entry )
                {
                    //see if its not the same list
                if (elementObject.parentObject != dragObject)
                    {
                    return true;                        
                    }
                }
            }
        
            //when dragging an entry over a list (adds at the end of the list)
            //it can be the same list
        else if ( dragObject instanceof Entry && elementObject instanceof List )
            {
            return true;
            }
        }*/
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
if ( (dragObject != elementObject) )
    {
    dragObject.moveTo( elementObject.getPosition() );
        /*
        //and if we're dealing with the same kind of elements       //HERE repetido no isValidDrop() .. juntar isto?..
    if ( dragObject.objectType() == elementObject.objectType() )
        {
            //the entry's .moveTo() requires more arguments
        if ( dragObject instanceof Entry )
            {
                //move to the position of the drop element (basically, switch the drop object with the drag object)
                //elementObject here, is an Entry
            dragObject.moveTo( elementObject.getPosition(), elementObject.parentObject.getPosition() );
            }
        
        else
            {
            dragObject.moveTo( elementObject.getPosition() );    
            } 
        }

        //there could also be a case where the objects are different
    else
        {
            //when dragging a list to another tab
        if ( dragObject instanceof List && elementObject instanceof Tab )
            {
                    //see if its not the same tab   //HERE estas verificações todas.. nao estao a ser feitas ja no isValidDrop durante o onDragOver? n preciso disto 
            if ( dragObject.parentObject !== elementObject )
                {
                    //then we move it to the last position (its what -1 is signaling)
                dragObject.moveTo( -1, elementObject );
                }
            }
        
            //when dragging an entry over a list (adds at the end of the list) - it can be the same list
        else if ( dragObject instanceof Entry && elementObject instanceof List )
            {
            dragObject.moveTo( -1, elementObject.getPosition() );
            }
            
            //when passing through the entries with a list (drag of a list... passing through the entries)
        else if ( dragObject instanceof List && elementObject instanceof Entry )
            {
            var listObject = elementObject.parentObject;
            
                //see if its not the same list
            if (listObject != dragObject)
                {
                dragObject.moveTo( listObject.getPosition() );                          
                }
            }
        }*/
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
