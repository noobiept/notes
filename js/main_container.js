/*global Note, DummyNote*/

'use strict';

/*
 * container of all the notes (there can be only one)
 * 
 */


function MainContainer()
{
this.htmlElement_obj = document.querySelector( '#mainContainer' );
    
this.childrenObjects_array = [];

this.dummyNote_obj = null;

return this;
}




/*
 * Add a note
 */

MainContainer.prototype.add = function( title, text, position )
{
var noteObject = new Note( this, title, text, position );

var notePosition = noteObject.getPosition();
    
var container = this.htmlElement_obj;

    // add to the html container element
container.insertBefore( noteObject.getHtmlElement(), container.childNodes[ notePosition ] );

    //add to the array
this.childrenObjects_array.splice( notePosition, 0, noteObject );

return noteObject;
};







/*
 * 
 */

MainContainer.prototype.addDummyNote = function()
{
this.dummyNote_obj = new DummyNote();

this.htmlElement_obj.appendChild( this.dummyNote_obj.getHtmlElement() );
};



/*
 * 
 */

MainContainer.prototype.getDummy = function()
{
return this.dummyNote_obj;
};



/*
 * 
 */

MainContainer.prototype.getHtmlElement = function()
{
return this.htmlElement_obj;
};




/*
 * returns the first child element object (null if it doesn't exist)
 */

MainContainer.prototype.getFirstChild = function()
{
if (this.childrenObjects_array.length !== 0)
    {
    return this.childrenObjects_array[0];
    }

return null;
};



/*
 * returns the last child object (null if it doesn't exist)
 */

MainContainer.prototype.getLastChild = function()
{
var children = this.childrenObjects_array;
    
if (children.length !== 0)
    {
    return children[ children.length - 1 ];
    }

return null;
};





/*
 * get a specific child object (null if not found)
 * 
 * Arguments:
 *      - position (number)
 */

MainContainer.prototype.getChild = function( position )
{
    //see if it exists
if ( position >= this.childrenCount() || position < 0)
    {
    return null;
    }

return this.childrenObjects_array[ position ];
};


/*
 * returns the number of children elements (do note, that it may not make sense (for example for an entry.. it doesn't have children))
 */

MainContainer.prototype.childrenCount = function()
{
return this.childrenObjects_array.length;  
};



/*
 * 
 */

MainContainer.prototype.updateOrder = function( lessPosition )
{
if (typeof lessPosition == 'undefined')
    {
    lessPosition = 0;
    }
    
var notes = this.getHtmlElement().childNodes;

for (var i = lessPosition ; i < notes.length ; i++)
    {
        //apply only to lists
    if ( notes[i].classList.contains( 'dummyNote' ) === false )
        {
        notes[i].noteObject.position_int = i;   
        }
    }

    //sort array
this.childrenObjects_array.sort(
    function(a, b) 
        {
        return a.position_int - b.position_int; 
        } 
    );
};


