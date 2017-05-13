module Options
{
export interface OptionsData
    {
    noteWidth: number;
    noteHeight: number;
    noteMargin: number;
    activeNotePosition: number;
    generateColorType: BackgroundColorType;
    colorGradientStart: string;
    colorGradientEnd: string;
    fixedColor1: string;
    fixedColor2: string;
    fixedColor3: string;
    spellCheck: boolean;
    [key: string]: any;
    }


    // the options that were loaded in the start, and that we are going to use in this run of the program
var LOADED_OPTIONS: OptionsData = {
    noteWidth  : 250,   // the width/height of each note
    noteHeight : 125,
    noteMargin : 7,
    activeNotePosition : -1,               // which note to get focus on the beginning of the program (-1 means no one)
    generateColorType  : 'color_gradient',   // how to generate the background-color of the notes
    colorGradientStart: '#640000',      // red color -- rgb(100, 0, 0)
    colorGradientEnd: '#ff0000',        // red color -- rgb(255, 0, 0)
    fixedColor1: '#ff0000',
    fixedColor2: '#00ff00',
    fixedColor3: '#0000ff',
    spellCheck : true
    };

    // if the options are changed in the options page, they are only going to used for the next run
    // keep track of that here
var NEXT_OPTIONS: OptionsData;


/**
 * Load the options, from the localStorage or from the server, to be used in the program.
 */
export function load( options: Data.LoadedOptionsData[] )
    {
        // override the default options with the loaded options
    for (var a = 0 ; a < options.length ; a++)
        {
        let option = options[ a ];
        LOADED_OPTIONS[ option.name ] = option.value;
        }

        // the loaded options are the starting point for the next options, it can then be changed through the program
    NEXT_OPTIONS = Object.assign( {}, LOADED_OPTIONS );
    }


/**
 * Get an option value, off the options that were initially loaded.
 */
export function get<K extends keyof OptionsData>( key: K )
    {
    return LOADED_OPTIONS[ key ];
    }


/**
 * Get the next option value (for the options page).
 */
export function getNext<K extends keyof OptionsData>( key: K )
    {
    return NEXT_OPTIONS[ key ];
    }


/**
 * Any new changes, is going to be for the next run of the program.
 */
export function set<K extends keyof OptionsData>( key: K, value: OptionsData[K] )
    {
    NEXT_OPTIONS[ key ] = value;
    Data.setOption( key, value );
    }
}