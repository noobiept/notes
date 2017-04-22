module OptionsPage
{
/*
 * The page where you change the options of the program
 */
export function create()
    {
    var container = document.createElement( 'div' );

    $( container ).load( 'options.html',
        function()
        {
        new PopupWindow( container, null, function()
            {
            Options.saveOptions();
            });

            // :: Width :: //

        //var slider = container.querySelector( 'Options-noteSlider' );
        var widthSlider = document.createElement( 'div' );   //HERE n funciona com o k esta na options.html

        var widthValue = container.querySelector( '#Options-noteWidth' );
        var noteWidth = Options.getNext( 'noteWidth' );

        widthValue.innerHTML = noteWidth;

        $( widthSlider ).slider({
            value : noteWidth,
            min   : 150,
            max   : 350,
            step  : 25,
            slide : function(event, ui)
                {
                widthValue.innerHTML = ui.value.toString();
                Options.set( 'noteWidth', ui.value );
                }
            });

            // :: Height :: //

        var heightValue  = container.querySelector( '#Options-noteHeight' );
        //var heightSlider = container.querySelector( 'Options-noteHeightSlider' );     //HERE
        var heightSlider = document.createElement( 'div' );
        var noteHeight = Options.getNext( 'noteHeight' );

        heightValue.innerHTML = noteHeight;

        $( heightSlider ).slider({
            value : noteHeight,
            min   : 100,
            max   : 200,
            step  : 25,
            slide : function(event, ui)
                {
                heightValue.innerHTML = ui.value.toString();
                Options.set( 'noteHeight', ui.value );
                }
            });

                // :: Margin :: //

        var marginValue = container.querySelector( '#Options-margin' );
        var marginSlider = document.createElement( 'div' );
        var noteMargin = Options.getNext( 'noteMargin' );

        marginValue.innerHTML = noteMargin;

        $( marginSlider ).slider({
            value : noteMargin,
            min   : 0,
            max   : 20,
            step  : 1,
            slide : function(event, ui)
                {
                marginValue.innerHTML = ui.value.toString();
                Options.set( 'noteMargin', ui.value );
                }
            });

        widthValue.parentNode.parentNode.appendChild( widthSlider );
        heightValue.parentNode.parentNode.appendChild( heightSlider );
        marginValue.parentNode.parentNode.appendChild( marginSlider );

        //$( widthSlider  ).insertAfter( widthValue );  //HERE se desse para usar o k ja esta nas opções...
        //$( heightSlider ).insertAfter( heightValue );
        //$( marginSlider ).insertAfter( marginValue );

            // :: Generate background-color :: //

        var backgroundColor = container.querySelector( '#Options-backgroundColor' );
        var backgroundColorValue = container.querySelector( '#Options-backgroundColorValue' );

        backgroundColorValue.innerHTML = Options.getNext( 'generateColorType' );

        $( backgroundColor ).bind('click', function(event) { OptionsPage.switchBackgroundColor( event, backgroundColorValue ); });

            // :: SpellCheck :: //

        var spellCheck = container.querySelector( '#Options-spellCheck' );
        var spellCheckValue = container.querySelector( '#Options-spellCheckValue' );
        var spellCheckOption = Options.getNext( 'spellCheck' );

        spellCheckValue.innerHTML = OptionsPage.boolToYesNo( spellCheckOption );

        $( spellCheck ).bind('click', function(event) { OptionsPage.switchSpellCheck( event, spellCheckValue ); });

            // :: Export notes :: //

        var exportNotes = <HTMLAnchorElement> container.querySelector( '#Options-export' );

        exportNotes.onclick = function()
            {
            var notesString = JSON.stringify( MAIN_CONTAINER.getTextList(), null, 4 );

            exportNotes.href = "data:text/plain;base64," + Utilities.utf8_to_b64( notesString );
            };
        });
    }


/*
 * true  --> "Yes"
 * false --> "No"
 */
export function boolToYesNo( boolVar )
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
export function switchSpellCheck( event, spellCheckValue )
    {
    if (event.type === 'click')
        {
            // OPTIONS.spellCheck is a bool variable, so the not operator turns a true to false, or a false to true
        var spellCheck = Options.getNext( 'spellCheck' );
        var next = !spellCheck;

        Options.set( 'spellCheck', next );

            // update the text, with a "Yes" or "No"
        spellCheckValue.innerHTML = OptionsPage.boolToYesNo( next );
        }
    }


/*
 * Arguments:
 *
 *      event : the on click event object
 *      backgroundColorValue : the html element to update the values (to show the user the new value)
 */
export function switchBackgroundColor( event, backgroundColorValue )
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