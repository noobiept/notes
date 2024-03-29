interface PopupWindowArgs
    {
    content: HTMLElement;   // an html element with the content to add to the window
    onStart?: () => void;   // to be called when the window is created
    onHide?: () => void;    // to be called when the window is closed
    onKeyUp?: (event: KeyboardEvent) => void;   // to be called when keys are pressed
    }


class PopupWindow
{
    //has all the PopupWindow objects of opened windows
static allWindows: PopupWindow[] = [];

static overlayEffectDuration = 50;  // duration of the show/hide overlay effect

private shortcut: (event: KeyboardEvent) => void;
private onHide: (() => void) | undefined;
private windowOverlay: HTMLElement;
private windowContainer: HTMLElement;
private opened: boolean;


constructor( args: PopupWindowArgs )
    {
    var popupWindowObject = this;

        // remove the focus from an element that could be on focus (otherwise, you could edit it)
        // happens when you use a keyboard shortcut to open a window, or when some window is opened automatically
    if (document.activeElement)
        {
            //this will probably be always called, since there's always an element on focus, even if it is just the <body>
        (<HTMLElement>document.activeElement).blur();
        }

        // :: creating the elements :: //

    var windowOverlay = document.createElement('div');
    windowOverlay.className = 'windowOverlay';

    var windowContainer = document.createElement('div');
    windowContainer.className = 'windowContainer';

        // :: setting up the events :: //

    windowOverlay.addEventListener('click', function () { popupWindowObject.hide(); }, false);

        //this is going to be set when we show the window, and cleared when the window is closed
        //we're saving this in the object, so that it can be accessed later in the respective functions
    this.shortcut = function (event)
        {
        popupWindowObject.shortcuts(event);

        if (typeof args.onKeyUp !== 'undefined')
            {
            args.onKeyUp( event );
            }
        };

        //appending to body
    document.body.appendChild(windowOverlay);
    document.body.appendChild(windowContainer);

    this.onHide = args.onHide;
    this.windowOverlay = windowOverlay;
    this.windowContainer = windowContainer;
    this.opened = false;

    this.show( args.content, args.onStart );
    }


/*
 * Tells if there's any popup window
 */
static hasOpenedWindows()
    {
    if ( PopupWindow.allWindows.length === 0 )
        {
        return false;
        }

    return true;
    }


/*
 * show the popup window
 *
 * Arguments:
 *      - contentElement    : an html element with the content to add to the window
 *      - onStartFunction   : to be called when the window is created
 */
show( contentElement: HTMLElement, onStartFunction?: () => void )
    {
    this.opened = true;

    contentElement.classList.add( 'windowContent' );

    this.windowContainer.appendChild( contentElement );

        //set the overlay to cover the whole page
    var overlay = this.getOverlay();

        // :::::::: other :::::::: //

    $( overlay ).show( 'fade', null, PopupWindow.overlayEffectDuration );

        //see if it was provided an element to set focus
    if (typeof onStartFunction !== 'undefined' && onStartFunction !== null)
        {
            //the setTimeout is because of the .show() above
        setTimeout(function () { onStartFunction(); }, 120);
        }

    var allWindows = PopupWindow.allWindows;

        //if there another opened tab, deal with the keyboard shortcuts
    if (allWindows.length !== 0)
        {
        document.removeEventListener('keyup', allWindows[ allWindows.length - 1 ].shortcut, false);
        }

        //add global keyboard shortcuts (that only work when the window is opened)
    document.addEventListener('keyup', this.shortcut, false);

        //one more opened window
    PopupWindow.allWindows.push( this );
    }


/*
 * hide the popup window
 */
hide()
    {
        // already was hidden
    if ( !this.opened )
        {
        return;
        }

    if (typeof this.onHide !== 'undefined' && this.onHide !== null)
        {
        this.onHide();
        }

    var popupWindowObject = this;
    var windowContainer = this.getContainer();
    var overlay = this.getOverlay();

    $( overlay ).hide( 'fade', null, PopupWindow.overlayEffectDuration, function() { document.body.removeChild( popupWindowObject.windowOverlay ); } );

    this.opened = false;

        //remove from body
    document.body.removeChild( windowContainer );

    var allWindows = PopupWindow.allWindows;

        //remove the last element (that corresponds to this PopupWindow)
        //one less opened window
    allWindows.pop();

        //if there's still other PopupWindow's there
    if (allWindows.length !== 0)
        {
            //we have to add back the shortcut events
        document.addEventListener('keyup', allWindows[ allWindows.length - 1 ].shortcut, false);
        }

        //remove from this PopupWindow
    document.removeEventListener('keyup', this.shortcut, false);
    }


/*
 * tells if the window is opened
 */
isOpened()
    {
    return this.opened;
    }


/*
 * returns the #windowOverlay element
 */
getOverlay()
    {
    return this.windowOverlay;
    }


/*
 * returns the #windowContainer element
 */
getContainer()
    {
    return this.windowContainer;
    }


/*
 * updates the top/left properties so that the window stays centered
 */
centerWindow()
    {
    var container = this.getContainer();

        //get the document measures
    var documentWidth = $(window).width();
    var documentHeight = $(window).height();

        //and the window we're appending
    var windowWidth = $(container).outerWidth();
    var windowHeight = $(container).height();

        //we want to have the window on the center of the page, so lets calculate the top and left values
    var top = (documentHeight / 2) - (windowHeight / 2);
    var left = (documentWidth / 2) - (windowWidth  / 2);

        //position the window at the center of the page
    $(container).css('top', top + 'px');
    $(container).css('left', left + 'px');
    }


/*
 * popup window 'global' shortcuts
 *
 *      - esc  : closes the window
 */
shortcuts( event: KeyboardEvent )
    {
    var key = event.which;

    if (event.type === 'keyup')
        {
            //close the window
        if (key === Utilities.EVENT_KEY.esc)
            {
            this.hide();

            event.stopPropagation();
            }
        }
    }
}