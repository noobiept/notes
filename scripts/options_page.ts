module OptionsPage
{
var CONTAINER: HTMLElement;


/*
 * The page where you change the options of the program
 */
export function init()
    {
    CONTAINER = document.getElementById( 'Options' )!;

            // :: Width :: //

    var widthSlider = document.getElementById( 'Options-noteWidthSlider' )!;
    var widthValue = document.getElementById( 'Options-noteWidth' )!;
    var noteWidth = Options.getNext( 'noteWidth' );

    widthValue.innerHTML = noteWidth.toString();

    $( widthSlider ).slider({
        value : noteWidth,
        min   : 150,
        max   : 350,
        step  : 25,
        slide : function(event, ui)
            {
            widthValue.innerHTML = ui.value!.toString();
            Options.set( 'noteWidth', ui.value! );
            }
        });

        // :: Height :: //

    var heightValue = document.getElementById( 'Options-noteHeight' )!;
    var heightSlider = document.getElementById( 'Options-noteHeightSlider' )!;
    var noteHeight = Options.getNext( 'noteHeight' );

    heightValue.innerHTML = noteHeight.toString();

    $( heightSlider ).slider({
        value : noteHeight,
        min   : 100,
        max   : 200,
        step  : 25,
        slide : function(event, ui)
            {
            heightValue.innerHTML = ui.value!.toString();
            Options.set( 'noteHeight', ui.value! );
            }
        });

            // :: Margin :: //

    var marginValue = document.getElementById( 'Options-margin' )!;
    var marginSlider = document.getElementById( 'Options-marginSlider' )!;
    var noteMargin = Options.getNext( 'noteMargin' );

    marginValue.innerHTML = noteMargin.toString();

    $( marginSlider ).slider({
        value : noteMargin,
        min   : 0,
        max   : 20,
        step  : 1,
        slide : function(event, ui)
            {
            marginValue.innerHTML = ui.value!.toString();
            Options.set( 'noteMargin', ui.value! );
            }
        });

        // :: Generate background-color :: //

    var backgroundColor = document.getElementById( 'Options-backgroundColor' )!;
    var backgroundColorValue = document.getElementById( 'Options-backgroundColorValue' )!;

    backgroundColorValue.innerHTML = Options.getNext( 'generateColorType' );

    backgroundColor.onclick = function( event )
        {
        switchBackgroundColor( event, backgroundColorValue );
        };

        // :: SpellCheck :: //

    var spellCheck = document.getElementById( 'Options-spellCheck' )!;
    var spellCheckValue = document.getElementById( 'Options-spellCheckValue' )!;
    var spellCheckOption = Options.getNext( 'spellCheck' );

    spellCheckValue.innerHTML = boolToYesNo( spellCheckOption );

    spellCheck.onclick = function( event )
        {
        switchSpellCheck( event, spellCheckValue );
        };

        // :: Export notes :: //

    var exportNotes = <HTMLAnchorElement> document.getElementById( 'Options-export' )!;

    exportNotes.onclick = function()
        {
        var notesString = JSON.stringify( MAIN_CONTAINER.getTextList(), null, 4 );

        exportNotes.href = "data:text/plain;base64," + Utilities.utf8_to_b64( notesString );
        };
    }


export function open()
    {
    CONTAINER.classList.remove( 'hidden' );

    new PopupWindow({
            content: CONTAINER,
            onHide: function()
                {
                CONTAINER.classList.add( 'hidden' );
                Options.saveOptions();
                }
        });
    }


/*
 * true  --> "Yes"
 * false --> "No"
 */
function boolToYesNo( boolVar: boolean )
    {
    if ( boolVar === true )
        {
        return "Yes";
        }

    return "No";
    }


/*
 * Arguments:
 *
 *      event : the on click event object
 *      spellCheckValue : the html element to update the values (to show the user the new value)
 */
function switchSpellCheck( event: MouseEvent, spellCheckValue: HTMLElement )
    {
        // OPTIONS.spellCheck is a bool variable, so the not operator turns a true to false, or a false to true
    var spellCheck = Options.getNext( 'spellCheck' );
    var next = !spellCheck;

    Options.set( 'spellCheck', next );

        // update the text, with a "Yes" or "No"
    spellCheckValue.innerHTML = boolToYesNo( next );
    }


/*
 * Arguments:
 *
 *      event : the on click event object
 *      backgroundColorValue : the html element to update the values (to show the user the new value)
 */
function switchBackgroundColor( event: MouseEvent, backgroundColorValue: HTMLElement )
    {
    var next = '';

    switch( Options.getNext( 'generateColorType' ) )
        {
        case 'fixed_order':

            next = 'random';
            break;

        case 'random':

            next = 'red_gradient';
            break;

        case 'red_gradient':

            next = 'fixed_order';
            break;
        }

    Options.set( 'generateColorType', next );
    backgroundColorValue.innerHTML = next;
    }
}