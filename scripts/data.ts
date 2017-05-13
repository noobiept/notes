module Data
{
interface NoteData
    {
    text: string;
    backgroundColor: ColorArgs
    }

var NOTES: NoteData[] = [];
var ACTIVE_POSITION = -1;

    // we can temporarily disable saving to the storage on every change
    // useful when we're making lots of changes in one go
    // will have to save manually at the end (can happen in the undo/redo for example)
    // don't forget to enable again
var SAVE_ENABLED = true;
let DB_REQUEST: IDBOpenDBRequest;


export function saveToStorage( yesNo: boolean )
    {
    SAVE_ENABLED = yesNo;
    }


export function load( callback: () => void )
    {
    DB_REQUEST = window.indexedDB.open( 'notesDB', 1 );

    DB_REQUEST.onupgradeneeded = function( event )
        {
        let db: IDBDatabase = (<IDBOpenDBRequest>event.target).result;
        let notes = db.createObjectStore( 'notes', { autoIncrement: true } );

        notes.createIndex( 'position', 'position' );
        notes.createIndex( 'text', 'text' );
        notes.createIndex( 'backgroundColor', ['color.red', 'color.green', 'color.blue', 'color.alpha', 'color.wasSetByUser'] );

        let options = db.createObjectStore( 'options', { autoIncrement: true } );

        options.createIndex( 'noteWidth', 'noteWidth' );
        options.createIndex( 'noteHeight', 'noteHeight' );
        options.createIndex( 'noteMargin', 'noteMargin' );
        options.createIndex( 'activeNotePosition', 'activeNotePosition' );
        options.createIndex( 'generateColorType', 'generateColorType' );
        options.createIndex( 'colorGradientStart', 'colorGradientStart' );
        options.createIndex( 'colorGradientEnd', 'colorGradientEnd' );
        options.createIndex( 'fixedColor1', 'fixedColor1' );
        options.createIndex( 'fixedColor2', 'fixedColor2' );
        options.createIndex( 'fixedColor3', 'fixedColor3' );
        options.createIndex( 'spellCheck', 'spellCheck' );
        };

    DB_REQUEST.onsuccess = function( event )
        {
        let db: IDBDatabase = (<IDBOpenDBRequest>event.target).result;
        let tx = db.transaction( [ "notes", 'options' ], "readonly" );
        let notesStore = tx.objectStore( "notes" );

            // sorts automatically by position
        let notesIndex = notesStore.index( 'position' );
        let notes = notesIndex.getAll();

        let optionsStore = tx.objectStore( 'options' );
        let options = optionsStore.getAll();

        tx.oncomplete = function()
            {
            console.log( notes.result );
            console.log( options.result );

            Options.load( options.result );
            NOTES = notes.result;

            callback();
            };
        };
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
    let db = DB_REQUEST.result;
    let tx = db.transaction( 'notes', 'readwrite' );
    let store = tx.objectStore( 'notes' );

    store.put({
            position: note.getPosition(),
            text: note.getText(),
            backgroundColor: note.getColorObject().getColor()
        });
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
    /*NOTES[ note.getPosition() ].text = note.getText();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }*/
    }


export function changeNoteBackgroundColor( note: Note )
    {
    NOTES[ note.getPosition() ].backgroundColor = note.getColorObject().getColor();

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