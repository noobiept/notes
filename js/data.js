var Data;
(function(Data) {

var OPTIONS = {
    activeNotePosition: -1,
    generateColorType: "red_gradient",
    noteHeight: 125,
    noteMargin: 7,
    noteWidth: 250,
    spellCheck: true
};

/**
 * {
 *     text: string;
 *     backgroundColorComponents: {
 *         alpha: number;
 *         blue: number;
 *         green: number;
 *         red: number;
 *         wasSetByUser: boolean;
 *     }
 * }[]
 */
var NOTES = [];
var ACTIVE_POSITION = -1;

    // we can temporarily disable saving to the storage on every change
    // useful when we're making lots of changes in one go
    // will have to save manually at the end (can happen in the undo/redo for example)
    // don't forget to enable again
var SAVE_ENABLED = true;


Data.saveToStorage = function( yesNo )
    {
    SAVE_ENABLED = yesNo;
    };


Data.load = function( callback )
    {
    AppStorage.getData( [ 'notes', 'notes_options', 'notes_activeNotePosition' ], function( data )
        {
        var notes = data[ 'notes' ];
        var options = data[ 'notes_options' ];
        var activePosition = data[ 'notes_activeNotePosition' ];

        if ( options )
            {
            OPTIONS = options;
            }

        if ( notes )
            {
            NOTES = notes;
            }

        if ( activePosition )
            {
            ACTIVE_POSITION = activePosition;
            }

        callback();
        });
    };


Data.saveOptions = function()
    {
    AppStorage.setData({ notes_options: OPTIONS });
    };


Data.saveNotes = function()
    {
    AppStorage.setData({ notes: NOTES });
    };


Data.saveActivePosition = function()
    {
    AppStorage.setData({ notes_activeNotePosition: ACTIVE_POSITION });
    };


Data.getOption = function( key )
    {
    return OPTIONS[ key ];
    };


Data.setOption = function( key, value )
    {
    OPTIONS[ key ] = value;

    if ( SAVE_ENABLED )
        {
        Data.saveOptions();
        }
    };


Data.getNotes = function()
    {
    return NOTES;
    };


Data.getNoteActivePosition = function()
    {
    return ACTIVE_POSITION;
    };


Data.newNote = function( note, position )
    {
    NOTES.splice( position, 0, {
            text  : note.getText(),
            backgroundColorComponents : note.getColorObject().getColor()
        });

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    };


Data.removeNote = function( note )
    {
    NOTES.splice( note.getPosition(), 1 );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    };


Data.changeNoteText = function( note, text )
    {
    NOTES[ note.getPosition() ].text = text;

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    };


Data.changeNoteBackgroundColor = function( note )
    {
    NOTES[ note.getPosition() ].backgroundColorComponents = note.getColorObject().getColor();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    };


Data.changePosition = function( note, previousPosition )
    {
    var data = NOTES.splice( previousPosition, 1 )[ 0 ];
    NOTES.splice( note.getPosition(), 0, data );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


})(Data || (Data = {}));
