module Data
{
interface NoteData
    {
    text: string;
    backgroundColorComponents: ColorComponents
    }

var NOTES: NoteData[] = [];
var ACTIVE_POSITION = -1;

    // we can temporarily disable saving to the storage on every change
    // useful when we're making lots of changes in one go
    // will have to save manually at the end (can happen in the undo/redo for example)
    // don't forget to enable again
var SAVE_ENABLED = true;


export function saveToStorage( yesNo: boolean )
    {
    SAVE_ENABLED = yesNo;
    }


export function load( callback: () => void )
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


export function setActiveNotePosition( position: number )
    {
    ACTIVE_POSITION = position;

    Data.saveActivePosition();
    }


export function newNote( note: Note )
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


export function removeNote( note: Note )
    {
    NOTES.splice( note.getPosition(), 1 );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


export function changeNoteText( note: Note )
    {
    NOTES[ note.getPosition() ].text = note.getText();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


export function changeNoteBackgroundColor( note: Note )
    {
    NOTES[ note.getPosition() ].backgroundColorComponents = note.getColorObject().getColor();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }


export function changeNotePosition( note: Note, previousPosition: number )
    {
    var data = NOTES.splice( previousPosition, 1 )[ 0 ];
    NOTES.splice( note.getPosition(), 0, data );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }
    }
}