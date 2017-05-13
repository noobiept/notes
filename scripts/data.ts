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


let DB: IDBDatabase;


export function load( callback: (notes: NoteData[], options: LoadedOptionsData[]) => void )
    {
    let request = window.indexedDB.open( 'notesDB', 1 );

    request.onupgradeneeded = function( event )
        {
        let db: IDBDatabase = (<IDBOpenDBRequest>event.target).result;
        db.createObjectStore( 'notes', { keyPath: 'position' } );
        db.createObjectStore( 'options', { keyPath: 'name' } );
        };

    request.onsuccess = function( event )
        {
        DB = (<IDBOpenDBRequest>event.target).result;
        let tx = DB.transaction( [ "notes", 'options' ], "readonly" );

        let notesStore = tx.objectStore( "notes" );
        let notes = notesStore.getAll();

        let optionsStore = tx.objectStore( 'options' );
        let options = optionsStore.getAll();

        tx.oncomplete = function()
            {
            callback( notes.result, options.result );
            };
        };
    };


export function newNote( note: Note )
    {
    let tx = DB.transaction( 'notes', 'readwrite' );
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
    let tx = DB.transaction( 'notes', 'readwrite' );

    let store = tx.objectStore( 'notes' );
    let noteRequest = store.get( note.getPosition() );

    noteRequest.onsuccess = function()
        {
        let result = noteRequest.result;

        if ( result )
            {
            result.text = note.getText();
            store.put( result );
            }
        };
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
    let tx = DB.transaction( 'options', 'readwrite' );

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