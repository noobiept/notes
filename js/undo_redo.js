/*global Menu, MAIN_CONTAINER*/

'use strict';

/*
 * Works for:
 * 
 *      - added notes
 *      - removed notes
 *      - dragged notes
 */

var UndoRedo = {
    undo_list : [],
    redo_list : []
};




/*
 * Arguments:
 * 
 *      what     (string) : tells what we're adding 
 *      noteObject (Note) : the object of the note in question
 *      usefulStuff  (??) : depends on 'what' is -- see in the code
 */

UndoRedo.add = function( what, noteObject, usefulStuff )
{
switch( what )
    {
    case 'addedNote':
    
        UndoRedo.saveAddedNote( what, noteObject );
        break;
    
    case 'removedNote':
    
        UndoRedo.saveRemovedNote( what, noteObject );
        break;
    
    case 'draggedNote':
        
        UndoRedo.saveDraggedNote( what, noteObject, usefulStuff );
        break;
    }
};


/*
 * 
 */

UndoRedo.saveAddedNote = function( what, noteObject )
{
UndoRedo.undo_list.push({
    
    what     : what,
    position : noteObject.getPosition(),
    text     : ""
    
    });


    //on a new change, clean the REDO, so that it doesn't create conflicts
UndoRedo.cleanRedo();
};

/*
 * 
 */

UndoRedo.saveRemovedNote = function( what, noteObject )
{
UndoRedo.undo_list.push({
    
    what     : what,
    position : noteObject.getPosition(),
    text     : noteObject.getText()
    
    });


    //on a new change, clean the REDO, so that it doesn't create conflicts
UndoRedo.cleanRedo();
};

/*
 * 
 */

UndoRedo.saveDraggedNote = function( what, noteObject, previousPosition )
{
UndoRedo.undo_list.push({
    
    what             : what,
    position         : noteObject.getPosition(),
    text             : noteObject.getText(),
    previousPosition : previousPosition
    
    });

    //on a new change, clean the REDO, so that it doesn't create conflicts
UndoRedo.cleanRedo();
};


/*
 * When there's a new change in the list, we clean the redo_obj to avoid conflicts with the undo later on
 */

UndoRedo.cleanRedo = function ()
{
if (UndoRedo.redo_list.length !== 0)
    {
    UndoRedo.redo_list = [];
    }
};




/*
 * Say an element was removed. We saved to UndoRedo its text, description and clockAlarm (among other things)
 * 
 * Then we undo it, and change the text, and we redo and undo.
 * 
 * Since the text changes (plus description and clockAlarm changes) aren't being saved to UndoRedo, those changes
 * are lost.
 * 
 * So, before we undo/redo, we need to update the text/description/clockAlarm
 */

UndoRedo.updateNote = function(element, entryObject)
{
    //update the text (since it could have been changed)
element.text = entryObject.getText(); 
};




/*
 * Arguments:
 * 
 *      whichOne (string) : "undo" or "redo"
 */

UndoRedo.stuff = function( whichOne )
{
var element;
    
if (whichOne == 'undo')
    {
    if (UndoRedo.undo_list.length === 0)
        {
        Menu.showMessage('Nothing to restore');
        return;
        }
    
        //get last element
    element = UndoRedo.undo_list.pop();
    
        //send it to the redo array
    UndoRedo.redo_list.push( element );
    }

else        //redo
    {
    if (UndoRedo.redo_list.length === 0)
        {
        Menu.showMessage('Nothing to redo');
        return;
        }
    
        //get last element
    element = UndoRedo.redo_list.pop();
    
        //send it to the UNDO array
    UndoRedo.undo_list.push( element );
    }



var temp;

if (element.what == 'removedNote')
    {
    if (whichOne == 'undo')
        {
        MAIN_CONTAINER.newNote( element.text, false, element.position );
        }
        
        //redo - we remove the previously added entry (by the undo)
    else
        {
        temp = MAIN_CONTAINER.getChild( element.position ); 
        
            //update the data on the element (some stuff could have been changed since it was first saved to UndoRedo)
        UndoRedo.updateNote( element, temp );
        
        
        temp.remove( false );           
        }
    }


else if (element.what == 'addedNote')
    {
    if (whichOne == 'undo') // same as 'removedNote' and 'redo'
        {
        temp = MAIN_CONTAINER.getChild( element.position ); 
        
            //update the data on the element (some stuff could have been changed since it was first saved to UndoRedo)
        UndoRedo.updateNote( element, temp );
   
           
        temp.remove( false );
        }
    
    else    // same as 'removedNote' and 'undo'
        {
        MAIN_CONTAINER.newNote( element.text, false, element.position );
        }       
    }

else if (element.what == 'draggedNote')
   {
   if (whichOne == 'undo')
       {
          //move without saving it again to undo
       MAIN_CONTAINER.getChild( element.position ).moveTo( element.previousPosition, false );
       }
       
   else
       {
          //move without saving it again to undo
       MAIN_CONTAINER.getChild( element.previousPosition ).moveTo( element.position, false );
       }
   }
   

    // what is in the form: likeThis
    // separate the words with a space, and make the first letter lower case  
var what = element.what.replace(/[A-Z]/, function(match) { return " " + match.toLowerCase(); });

Menu.showMessage( whichOne + ": " + what );
};
