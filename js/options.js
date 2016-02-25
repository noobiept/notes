var Options;
(function(Options) {

    // the options that were loaded in the start, and that we are going to use in this run of the program
var LOADED_OPTIONS = {
    noteWidth  : 250,   // the width/height of each note
    noteHeight : 125,
    noteMargin : 7,
    activeNotePosition : -1,               // which note to get focus on the beginning of the program (-1 means no one)
    generateColorType  : 'red_gradient',   // how to generate the background-color of the notes
    spellCheck : true
    };

    // if the options are changed in the options page, they are only going to used for the next run
    // keep track of that here
var NEXT_OPTIONS = {};


/**
 * Load the options, from the localStorage or from the server, to be used in the program.
 */
Options.load = function( options )
{
if ( options )
    {
        // I have to change each option, and not do something like OPTIONS = options, because otherwise when adding new
        // options (to the OPTIONS object), it won't matter, since it will be overwritten with the old options
        // by changing each one, if I add later another option, it will keep its default value
    if ( isNaN( options.noteWidth ) === false )
        {
        LOADED_OPTIONS.noteWidth = options.noteWidth;
        }

    if ( isNaN( options.noteHeight ) === false )
        {
        LOADED_OPTIONS.noteHeight = options.noteHeight;
        }

    if ( isNaN( options.noteMargin ) === false )
        {
        LOADED_OPTIONS.noteMargin = options.noteMargin;
        }

    if ( isNaN( options.activeNotePosition ) === false )
        {
        LOADED_OPTIONS.activeNotePosition = options.activeNotePosition;
        }

    if (typeof options.generateColorType !== 'undefined' && options.generateColorType !== null)
        {
        LOADED_OPTIONS.generateColorType  = options.generateColorType;
        }

    if ( isNaN( options.spellCheck ) === false )
        {
        LOADED_OPTIONS.spellCheck = options.spellCheck;
        }
    }

    // the loaded options are the starting point for the next options, it can then be changed through the program
NEXT_OPTIONS = $.extend( true, {}, LOADED_OPTIONS );
};


/**
 * Get a string of the options, to be saved to the localStorage/server.
 */
Options.getNextOptions = function()
{
return NEXT_OPTIONS;
};


/**
 * Get an option value, off the options that were initially loaded.
 */
Options.get = function( key )
{
return LOADED_OPTIONS[ key ];
};


/**
 * Get the next option value (for the options page).
 */
Options.getNext = function( key )
{
return NEXT_OPTIONS[ key ];
};


/**
 * Any new changes, is going to be for the next run of the program.
 */
Options.set = function( key, value )
{
NEXT_OPTIONS[ key ] = value;
};


Options.saveOptions = function()
{
AppStorage.setData({ notes_options: Options.getNextOptions() });
};


})(Options || (Options = {}));
