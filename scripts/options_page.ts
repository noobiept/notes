module OptionsPage
{
var CONTAINER: HTMLElement;
var BACKGROUND_COLOR_VALUE: HTMLElement;
var FIXED_COLOR1: HTMLElement;
var FIXED_COLOR2: HTMLElement;
var FIXED_COLOR3: HTMLElement;
var COLOR_GRADIENT: HTMLElement;


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
    BACKGROUND_COLOR_VALUE = document.getElementById( 'Options-backgroundColorValue' )!;
    FIXED_COLOR1 = document.getElementById( 'Options-fixedColor1' )!;
    FIXED_COLOR2 = document.getElementById( 'Options-fixedColor2' )!;
    FIXED_COLOR3 = document.getElementById( 'Options-fixedColor3' )!;
    COLOR_GRADIENT = document.getElementById( 'Options-colorGradient' )!;

    backgroundColor.onclick = function()
        {
        switchBackgroundColor();
        };
    switchBackgroundColor( Options.getNext( 'generateColorType' ) );

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
 * Update the background color elements with the specified type, or change to the next type.
 */
function switchBackgroundColor( type?: BackgroundColorType )
    {
        // switch to the next type
    if ( typeof type === 'undefined' )
        {
        switch( Options.getNext( 'generateColorType' ) )
            {
            case 'fixed_order':

                type = 'random';
                break;

            case 'random':

                type = 'red_gradient';
                break;

            case 'red_gradient':

                type = 'fixed_order';
                break;

            default:
                throw Error( "Invalid background color type" );
            }

        Options.set( 'generateColorType', type );
        }


    switch( type )
        {
        case 'red_gradient':
            COLOR_GRADIENT.classList.remove( 'hidden' );
            FIXED_COLOR1.classList.add( 'hidden' );
            FIXED_COLOR2.classList.add( 'hidden' );
            FIXED_COLOR3.classList.add( 'hidden' );
            break;

        case 'fixed_order':
            COLOR_GRADIENT.classList.add( 'hidden' );
            FIXED_COLOR1.classList.remove( 'hidden' );
            FIXED_COLOR2.classList.remove( 'hidden' );
            FIXED_COLOR3.classList.remove( 'hidden' );
            break;

        case 'random':
            COLOR_GRADIENT.classList.add( 'hidden' );
            FIXED_COLOR1.classList.add( 'hidden' );
            FIXED_COLOR2.classList.add( 'hidden' );
            FIXED_COLOR3.classList.add( 'hidden' );
            break;
        }

    BACKGROUND_COLOR_VALUE.innerHTML = type;
    }
}