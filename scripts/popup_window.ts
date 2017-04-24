interface PopupWindowArgs
    {
    content: HTMLElement;   // an html element with the content to add to the window
    onStart?: () => void;   // to be called when the window is created
    onHide?: () => void;    // to be called when the window is closed
    onKeyUp?: (event: KeyboardEvent) => void;   // to be called when keys are pressed
    onResize?: () => void;  // to be called when the PopupWindow's resize is called
    }


class PopupWindow
{
    //has all the PopupWindow objects of opened windows
static allWindows_class: PopupWindow[] = [];

    //initial z-index
static zIndex_class = 100;

shortcut_obj: (event: KeyboardEvent) => void;
onHide_f: (() => void) | undefined;
onResize_f: (() => void) | undefined;
windowOverlay_obj: HTMLElement;
windowContainer_obj: HTMLElement;
isOpened_obj: boolean;


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

        if (typeof args.onKeyUp !== 'undefined')
            {
            args.onKeyUp( event );
            }
        };

        //appending to body
    document.body.appendChild(windowOverlay);
    document.body.appendChild(windowContainer);

        //not showing
    $(windowContainer).css('display', 'none');
    $(windowOverlay).css('display', 'none');

    this.onHide_f = args.onHide;
    this.onResize_f = args.onResize;

    this.windowOverlay_obj = windowOverlay;
    this.windowContainer_obj = windowContainer;

    this.isOpened_obj = false;

    this.show( args.content, args.onStart );

    return this;
    }


/*
 * Tells if there's any popup window
 */
static hasOpenedWindows()
    {
    if ( PopupWindow.allWindows_class.length === 0 )
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
        //when opening from the menu, the sub-menu still stays opened //HERE
    //$('#subMenu ul').css('display', 'none');  // nao ah submenus por enquanto

    this.isOpened_obj = true;

    var container = this.getContainer();
    var overlay = this.getOverlay();

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
        $(overlay).show('fade', 100);
        //}

    $(container).css('display', 'block');   //I'm not using something like $(container).show('blind', 100); since it then doesn't position the window correctly
    $(container).css('opacity', 1);

        //see if it was provided an element to set focus
    if (typeof onStartFunction !== 'undefined' && onStartFunction !== null)
        {
            //the setTimeout is because of the .show() above
        setTimeout(function () { onStartFunction(); }, 120);
        }

    var allWindows = PopupWindow.allWindows_class;

        //if there another opened tab, deal with the keyboard shortcuts
    if (allWindows.length !== 0)
        {
        document.removeEventListener('keyup', allWindows[ allWindows.length - 1 ].shortcut_obj, false);
        }

        //add global keyboard shortcuts (that only work when the window is opened)
    document.addEventListener('keyup', this.shortcut_obj, false);

        //one more opened window
    PopupWindow.allWindows_class.push( this );
    }


/*
 * hide the popup window
 *
 * Arguments:
 *      - effectTime: (default: 100ms)
 */
hide( effectTime?: number )
    {
    if (typeof this.onHide_f !== 'undefined' && this.onHide_f !== null)
        {
        this.onHide_f();
        }

    var popupWindowObject = this;

    if (typeof effectTime === 'undefined')
        {
        effectTime = 100;   //default value
        }

    var windowContainer = this.getContainer();
    var overlay = this.getOverlay();

        //remove the onresize event, since it uses polling (not a 'real' event)
    $( windowContainer ).unbind();

        //if this is the only opened window, then hide the overlay ( //HERE o overlay nao eh global.. eh de cada objecto )
    //if ( PopupWindow.allWindows_class.length === 1 )
        //{ //HERE
        $(overlay).hide('fade', effectTime.toString(), function() { document.body.removeChild( popupWindowObject.windowOverlay_obj ); } );
        //}

    this.isOpened_obj = false;

        //remove from body
    document.body.removeChild( windowContainer );

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
    }


/*
 * tells if the window is opened
 */
isOpened()
    {
    return this.isOpened_obj;
    }


/*
 * returns the #windowOverlay element
 */
getOverlay()
    {
    return this.windowOverlay_obj;
    }


/*
 * returns the #windowContainer element
 */
getContainer()
    {
    return this.windowContainer_obj;
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
 * Resizes a popup window
 */
resize()
    {
    this.centerWindow();

        // call the resize function of possible 'derived' classes
    if ( this.onResize_f )
        {
        this.onResize_f();
        }
    }


/*
 * Resizes and reposition the popup windows (all of them)
 */
static resizeAll()
    {
    var all = PopupWindow.allWindows_class;

    var i;

    for (i = 0 ; i < all.length ; i++)
        {
        all[i].resize();
        }
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