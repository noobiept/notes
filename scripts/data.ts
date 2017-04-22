module Data
{
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


export function saveToStorage( yesNo )
    {
    SAVE_ENABLED = yesNo;
    }


export function load( callback )
    {
    Utilities.getData( [ 'notes', 'notes_options', 'notes_activeNotePosition' ], function( data )
        {
        var notes = data[ 'notes' ];
        var options = data[ 'notes_options' ];
        var activePosition = data[ 'notes_activeNotePosition' ];

        Options.load( options );

        if ( notes )
            {
            NOTES = notes;
            }

        if ( isNaN( activePosition ) === false )
            {
            ACTIVE_POSITION = activePosition;
            }

        callback();
        });
    };


export function saveNotes()
    {
    Utilities.setData({ notes: NOTES });
    }


export function saveActivePosition()
    {
    Utilities.setData({ notes_activeNotePosition: ACTIVE_POSITION });
    }


export function getNotes()
    {
    return NOTES;
    }


export function getNoteActivePosition()
    {
    return ACTIVE_POSITION;
    }


export function setActiveNotePosition( position )
    {
    ACTIVE_POSITION = position;

    Data.saveActivePosition();
    }


export function newNote( note )
    {
    NOTES.splice( note.getPosition(), 0, {
            text  : note.getText(),
            backgroundColorComponents : note.getColorObject().getColor()
        });

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    };


export function removeNote( note )
    {
    NOTES.splice( note.getPosition(), 1 );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


export function changeNoteText( note )
    {
    NOTES[ note.getPosition() ].text = note.getText();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


export function changeNoteBackgroundColor( note )
    {
    NOTES[ note.getPosition() ].backgroundColorComponents = note.getColorObject().getColor();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


export function changeNotePosition( note, previousPosition )
    {
    var data = NOTES.splice( previousPosition, 1 )[ 0 ];
    NOTES.splice( note.getPosition(), 0, data );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }
}