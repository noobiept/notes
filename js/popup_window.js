/*global $, window, EVENT_KEY, MAIN_CONTAINER*/


'use strict';

/*
 * the popup window constructor
 */

function PopupWindow ()
{
var popupWindowObject = this;


    // :: creating the elements :: //

var windowOverlay = document.createElement('div');
windowOverlay.className = 'windowOverlay';


var windowContainer = document.createElement('div');
windowContainer.className = 'windowContainer';


    // :: Setting up the overlay/container z-index :: //

var numberOfOpenedWindows = PopupWindow.allWindows_class.length;

    //if we have several windows opened, the later windows have to have a bigger z-index, so that they
    //appear over the others
$(windowOverlay).css( 'z-index', PopupWindow.zIndex_class + numberOfOpenedWindows );

    //the +1 is because the container is over the overlay (in front of)
$(windowContainer).css( 'z-index', PopupWindow.zIndex_class + numberOfOpenedWindows + 1 );


    // :: setting up the events :: //
    
windowOverlay.addEventListener('click', function () { popupWindowObject.hide(); }, false);  


    //this is going to be set when we show the window, and cleared when the window is closed
    //we're saving this in the object, so that it can be accessed later in the respective functions
this.shortcut_obj = function (event)
    {
    popupWindowObject.shortcuts(event);
    };


    //appending to body

document.body.appendChild(windowOverlay);
document.body.appendChild(windowContainer);

    //not showing
$(windowContainer).css('display', 'none');
$(windowOverlay).css('display', 'none');


    //save the object in an html element
windowContainer.popupWindowObject = this;



this.windowOverlay_obj = windowOverlay;
this.windowContainer_obj = windowContainer;
this.windowContent_obj = null;

this.elementObject_obj = null;

this.isOpened_obj = false;

this.previousContent_obj = null;

return this;
}



    //has all the PopupWindow objects of opened windows
PopupWindow.allWindows_class = [];


    //initial z-index
PopupWindow.zIndex_class = 100;



/*
 * Tells if there's any popup window
 */

PopupWindow.hasOpenedWindows = function ()
{
if ( PopupWindow.allWindows_class.length === 0 )
    {
    return false;
    }

return true;
};



/*
 * show the popup window
 * 
 * Arguments:
 *      - contentElement : an html element with the content to add to the window
 *      - elementOnFocus : which html element to call .focus() (if any)
 *      - elementObject  : when opening a window related to a entry/list/tab, 
 *                          give the object so that when the window is closed that element gains focus
 *      - onHideFunction : to be called when the window is closed
 */

PopupWindow.prototype.show = function (contentElement, elementOnFocus, elementObject, onHideFunction)
{
    //when opening from the menu, the sub-menu still stays opened //HERE
$('#subMenu ul').css('display', 'none');

this.isOpened_obj = true;

var container = this.getContainer(); 
var overlay = this.getOverlay();


    // set content

this.windowContent_obj = contentElement;

contentElement.classList.add( 'windowContent' );

this.windowContainer_obj.appendChild( contentElement );
    


    //set the overlay to cover the whole page
overlay.style.height = $(document).height() + 'px';



this.centerWindow();



    // :::::::::: set up the events :::::::::: //



window.addEventListener('resize', 
    function (event)
        {
        overlay.style.height = $(document).height() + 'px';
        },
    true);



var popupWin = this;
$(container).resize(function () 
    {
        //re-center the window when the container is resized
    popupWin.centerWindow();
    });




    // :::::::: other :::::::: //

    //no need to add another overlay when there's one there already
//if ( PopupWindow.allWindows_class.length === 0 )
    //{//HERE .. uns erros...
        //show the window and overlay
    $(overlay).show('blind', 100);    
    //}



$(container).css('display', 'block');   //I'm not using something like $(container).show('blind', 100); since it then doesn't position the window correctly 
$(container).css('opacity', 1);



    //see if it was provided an element to set focus
if (typeof elementOnFocus != 'undefined')
    {
        //the setTimeout is because of the .show() above
    setTimeout(function () { elementOnFocus.focus(); }, 120);
    }


    //means its an ElementWindow
    //save the element object - its going to be used later to put that element on focus when the window is closed
if (typeof elementObject != 'undefined')
    {
    this.elementObject_obj = elementObject;
    }



var allWindows = PopupWindow.allWindows_class; 

    //if there another opened tab, deal with the keyboard shortcuts
if (allWindows.length !== 0)
    {
    document.removeEventListener('keyup', allWindows[ allWindows.length - 1 ].shortcut_obj, false);
    }


    //add global keyboard shortcuts (that only work when the window is opened)
document.addEventListener('keyup', this.shortcut_obj, false);



this.onHide_f = onHideFunction;


    //one more opened window
PopupWindow.allWindows_class.push( this );
};




/*
 * hide the popup window
 * 
 * Arguments:
 *      - effectTime (number) : (default: 100ms)
 */

PopupWindow.prototype.hide = function (effectTime)
{
if (this.onHide_f !== null)
    {
    this.onHide_f();
    }
    
    
var popupWindowObject = this;
    
if (typeof effectTime == 'undefined')
    {
    effectTime = 100;   //default value
    }

var windowContainer = this.getContainer();
var overlay = this.getOverlay();


    //remove the onresize event, since it uses polling (not a 'real' event)
$(this.windowContainer_obj).unbind();

this.windowContent_obj = null;




    //if this is the only opened window, then hide the overlay ( //HERE o overlay nao eh global.. eh de cada objecto )
//if ( PopupWindow.allWindows_class.length === 1 )
    //{ //HERE
    $(overlay).hide('blind', effectTime, function() { document.body.removeChild( popupWindowObject.windowOverlay_obj ); } );        
    //}


this.isOpened_obj = false;



    //put the element that this description belongs to on focus
if (this.elementObject_obj !== null)
    {
    this.elementObject_obj.gainFocus();
    
        //clear the variable, so that it doesn't interfer with the next call
    this.elementObject_obj = null;      
    }

    
    //remove from body
document.body.removeChild( this.windowContainer_obj );


var allWindows = PopupWindow.allWindows_class;

    //remove the last element (that corresponds to this PopupWindow)
    //one less opened window
allWindows.pop();


    //if there's still other PopupWindow's there
if (allWindows.length !== 0)
    {
        //we have to add back the shortcut events
    document.addEventListener('keyup', allWindows[ allWindows.length - 1 ].shortcut_obj, false);
    }
    
    //remove from this PopupWindow
document.removeEventListener('keyup', this.shortcut_obj, false);
};





/*
 * tells if the window is opened
 */

PopupWindow.prototype.isOpened = function ()
{
return this.isOpened_obj;
};


/*
 * returns the #windowOverlay element
 */

PopupWindow.prototype.getOverlay = function ()
{
return this.windowOverlay_obj;
};




/*
 * returns the #windowContainer element 
 */

PopupWindow.prototype.getContainer = function ()
{
return this.windowContainer_obj;
};




/*
 * 
 */

PopupWindow.prototype.updateContent = function( elementObject )
{
var windowContent = this.windowContent_obj;

    // remove all the previous content  //HERE preciso disto?.. tou a usar o innerHTML a seguir
while ( windowContent.childNodes.length > 0 )
    {
    windowContent.removeChild( windowContent.lastChild );
    }

windowContent.innerHTML = elementObject.getText();


this.elementObject_obj = elementObject;
};




/*
 * updates the top/left properties so that the window stays centered
 */

PopupWindow.prototype.centerWindow = function ()
{
var container = this.getContainer();


    //get the document measures
var documentWidth = $(document).width();
var documentHeight = $(document).height();

    //and the window we're appending
var windowWidth = $(container).outerWidth();
var windowHeight = $(container).height();



    //we want to have the window on the center of the page, so lets calculate the top and left values
var top = (documentHeight / 2) - (windowHeight / 2);
var left = (documentWidth / 2) - (windowWidth  / 2);


    //position the window at the center of the page
$(container).css('top', top + 'px');
$(container).css('left', left + 'px');

/*
var content = this.windowContent_obj;


if ( $(content).outerHeight() > $(container).outerHeight() )    //HERE the scrollbar breaks the element's position ( for elementWindow )
    {
   
//    console.log('scroll bar..');        
    }*/
};




/*
 * Resizes and reposition the popup windows
 */

PopupWindow.resize = function()
{
var all = PopupWindow.allWindows_class;
    
for (var i = 0 ; i < all.length ; i++)
    {
    all[i].centerWindow();
    }
};



/*
 * popup window 'global' shortcuts
 * 
 *      - esc  : closes the window
 *      - home : move to the note to the left (or if this is the first one, go to the last)
 *      - end  : move to the note to the right (or if this is the last one, go to the first)
 * 
 */

PopupWindow.prototype.shortcuts = function (event)
{
var key = event.which;
var elementObject = this.elementObject_obj;
var otherElement = null;


if (event.type == 'keyup')
    {
        //close the window
    if (key == EVENT_KEY.esc)
        {
        this.hide();
    
        event.stopPropagation();
        } 
    
        // move to the note to the left (or if this is the first one, go to the last)
    else if (key == EVENT_KEY.home)
        {
            // if there's only one, do nothing
        if ( MAIN_CONTAINER.childrenCount() > 1 )
            {
            otherElement = elementObject.previous();
            
                // this is the first one
            if ( otherElement === null )
                {
                otherElement = MAIN_CONTAINER.getLastChild();
                }     
            
            this.updateContent( otherElement );
            //HERE ter k por focus?...
            }
        }
        
        // move to the note to the right (or if this is the last one, go to the first)
    else if (key == EVENT_KEY.end)
        {
            // if there's only one, do nothing
        if ( MAIN_CONTAINER.childrenCount() > 1 )
            {
            otherElement = elementObject.next();
            
                // this is the first one
            if ( otherElement === null )
                {
                otherElement = MAIN_CONTAINER.getFirstChild();
                }     
            
            this.updateContent( otherElement );
            //HERE ter k por focus?...
            } 
        }
    }
};



