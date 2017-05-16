module Data
{
export interface NoteData
    {
    position: number;
    text: string;
    backgroundColor: ColorArgs
    }

export interface LoadedOptionsData
    {
    name: keyof Options.OptionsData;
    value: any;
    }

    // add the missing 'getAll()' method to the store interface
interface IDBObjectStoreExt extends IDBObjectStore
    {
    getAll( query?: string | IDBKeyRange, count?: number ): IDBRequest;
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

        let notesStore = <IDBObjectStoreExt> tx.objectStore( "notes" );
        let notes = notesStore.getAll();

        let optionsStore = <IDBObjectStoreExt> tx.objectStore( 'options' );
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
    let noteData: NoteData = {
            position: note.getPosition(),
            text: note.getText(),
            backgroundColor: note.getColorObject().getColor()
        };

    store.put( noteData );
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
        let result: NoteData = noteRequest.result;

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


/**
 * Update the notes position in order, from the start position.
 * The notes array position doesn't match the value given by 'getPosition()'.
 * This is due to a note changing position (from a drag operation).
 */
export function updateNotesPosition( notes: Note[], startPosition: number )
    {
    let tx = DB.transaction( 'notes', 'readwrite' );
    let store = tx.objectStore( 'notes' );

    for (var a = startPosition ; a < notes.length ; a++)
        {
        let note = notes[ a ];
        let previousPosition = note.getPosition();
        let request = store.get( previousPosition );
        let nextPosition = a;

            // update the note object
        note.setPosition( nextPosition );

            // update the database position as well
        request.onsuccess = function()
            {
            let result: NoteData = request.result;

            if ( result )
                {
                result.position = nextPosition;
                store.put( result );
                }
            }
        }
    }


/**
 * Adds a new option to the database (overrides the previous value).
 */
export function setOption<K extends keyof Options.OptionsData>( name: K, value: Options.OptionsData[K] )
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