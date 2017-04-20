module Menu
{
var MESSAGE_TIMEOUT: number | null = null;
var MESSAGE: HTMLElement;


/*
 * Menu initialization.
 */
export function init()
    {
    var menu = document.querySelector( '#menu' );

        // :: New Note :: //

    var newNote = menu.querySelector( '#newNote' );

    newNote.addEventListener( 'click', function(event)
        {
        var noteObject = MAIN_CONTAINER.newNote();

        noteObject.gainFocus();

        }, false );


    var options = menu.querySelector( '#options' );
    options.addEventListener( 'click', function() { new OptionsPage(); }, false );

    MESSAGE = <HTMLElement> menu.querySelector( '#message' );

    var undo = menu.querySelector( '#undo' );
    undo.addEventListener( 'click', function() { UndoRedo.stuff( 'undo' ); }, false );

    var redo = menu.querySelector( '#redo' );
    redo.addEventListener( 'click', function() { UndoRedo.stuff( 'redo' ); }, false );

    var donate = menu.querySelector( '#donate' );
    donate.addEventListener( 'click', function()
        {
        window.open( 'http://nbpt.eu/donate/', '_blank' );
        }, false );
    }


/**
 * Show a message in the menu.
 */
export function showMessage( content: string )
    {
    MESSAGE.innerHTML = content;

        // show the message
    MESSAGE.style.opacity = '1';

        // if there was a previous message being displayed before, we need to cancel its timeout (otherwise, this message will end sooner)
    if ( MESSAGE_TIMEOUT !== null)
        {
        window.clearTimeout( MESSAGE_TIMEOUT );
        }

        // adds a fade style
    MESSAGE_TIMEOUT = setTimeout(
        function()
            {
            MESSAGE.style.opacity = '0';
            MESSAGE_TIMEOUT = null;
            },
        1000);
    }
}