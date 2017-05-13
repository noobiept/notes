module Data
{
export interface NoteData
    {
    text: string;
    backgroundColor: ColorArgs
    }

export interface LoadedOptionsData
    {
    name: keyof Options.OptionsData;
    value: any;
    }


let DB_REQUEST: IDBOpenDBRequest;


export function load( callback: (notes: NoteData[], options: LoadedOptionsData[]) => void )
    {
    DB_REQUEST = window.indexedDB.open( 'notesDB', 1 );

    DB_REQUEST.onupgradeneeded = function( event )
        {
        let db: IDBDatabase = (<IDBOpenDBRequest>event.target).result;
        let notes = db.createObjectStore( 'notes', { autoIncrement: true } );

        notes.createIndex( 'position', 'position' );
        notes.createIndex( 'text', 'text' );
        notes.createIndex( 'backgroundColor', ['color.red', 'color.green', 'color.blue', 'color.alpha', 'color.wasSetByUser'] );

        db.createObjectStore( 'options', { keyPath: 'name' } );
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

            callback( notes.result, options.result );
            };
        };
    };


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
    /*NOTES.splice( note.getPosition(), 1 );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }*/
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
    /*NOTES[ note.getPosition() ].backgroundColor = note.getColorObject().getColor();

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }*/
    }


export function changeNotePosition( note: Note, previousPosition: number )
    {
    /*var data = NOTES.splice( previousPosition, 1 )[ 0 ];
    NOTES.splice( note.getPosition(), 0, data );

    if ( SAVE_ENABLED )
        {
        Data.saveNotes();
        }*/
    }


/**
 * Adds a new option to the database (overrides the previous value).
 */
export function setOption<K extends keyof Options.OptionsData>( key: K, value: Options.OptionsData[K] )
    {
    let db = DB_REQUEST.result;
    let tx = db.transaction( 'options', 'readwrite' );
    let store = tx.objectStore( 'options' );

    let option = store.get( name );
    option.onsuccess = function()
        {
        let result = option.result;

        if ( !result )
            {
            result = {
                    name: name
                };
            }

        result.value = value;
        store.put( result );
        };
    }
}