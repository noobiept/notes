namespace Data
{
export interface NoteData
    {
    id: number;    // its added automatically by the database
    text: string;
    backgroundColor: ColorArgs
    }

export interface LoadedOptionsData
    {
    name: keyof Options.OptionsData;
    value: any;
    }

export interface NotesInfoData
    {
    key: 'notesArray';
    value: number[];
    }

    // add the missing 'getAll()' method to the store interface
interface IDBObjectStoreExt extends IDBObjectStore
    {
    getAll( query?: string | IDBKeyRange, count?: number ): IDBRequest;
    }


let DB: IDBDatabase;


export function load( callback: (notes: NoteData[], notesPosition: number[], options: LoadedOptionsData[]) => void )
    {
    let request = window.indexedDB.open( 'notesDB', 1 );

    request.onupgradeneeded = function( event )
        {
        let db: IDBDatabase = (<IDBOpenDBRequest>event.target).result;
        db.createObjectStore( 'notes', { keyPath: 'id', autoIncrement: true } );
        db.createObjectStore( 'options', { keyPath: 'name' } );
        let info = db.createObjectStore( 'notesInfo', { keyPath: 'key' } );

            // has the ids of all the notes, sorted by position
        info.put( { key: 'notesPosition', value: [] } );
        };

    request.onsuccess = function( event )
        {
        DB = (<IDBOpenDBRequest>event.target).result;
        let tx = DB.transaction( [ "notes", 'notesInfo', 'options' ], "readonly" );

        let notesStore = <IDBObjectStoreExt> tx.objectStore( "notes" );
        let notes = notesStore.getAll();

        let optionsStore = <IDBObjectStoreExt> tx.objectStore( 'options' );
        let options = optionsStore.getAll();

        let notesInfoStore = tx.objectStore( 'notesInfo' );
        let notesPosition = notesInfoStore.get( 'notesPosition' );

        tx.oncomplete = function()
            {
            callback( notes.result, notesPosition.result.value, options.result );
            };
        };
    };


export function newNote( note: Note )
    {
    let tx = DB.transaction( 'notes', 'readwrite' );
    let notesStore = tx.objectStore( 'notes' );

    let position = note.getPosition();
    let noteData: NoteData = {
            text: note.getText(),
            backgroundColor: note.getColorObject().getColor()
        };

    let putRequest = notesStore.put( noteData );

    tx.oncomplete = function()
        {
        let tx = DB.transaction( 'notesInfo', 'readwrite' );
        let infoStore = tx.objectStore( 'notesInfo' );
        let notesPosition = infoStore.get( 'notesPosition' );
        let id = putRequest.result;

        note.setId( id );

        notesPosition.onsuccess = function()
            {
            let notesInfo: NotesInfoData = notesPosition.result;

            notesInfo.value.splice( position, 0, id );
            infoStore.put( notesInfo );
            }
        };
    };


export async function removeNote( note: Note )
    {
    let id = await note.getId();
    let position = note.getPosition();
    let tx = DB.transaction( [ 'notes', 'notesInfo' ], 'readwrite' );
    let notesStore = tx.objectStore( 'notes' );
    let infoStore = tx.objectStore( 'notesInfo' );
    let notesPosition = infoStore.get( 'notesPosition' );

        // remove the note from the database
    notesStore.delete( id );

        // also need to remove the id from the position array
    notesPosition.onsuccess = function()
        {
        let notesInfo: NotesInfoData = notesPosition.result;

        notesInfo.value.splice( position, 1 );
        infoStore.put( notesInfo );
        }
    }


export async function changeNoteText( note: Note )
    {
    let id = await note.getId();

    let tx = DB.transaction( 'notes', 'readwrite' );
    let store = tx.objectStore( 'notes' );

    let noteRequest = store.get( id );

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


export async function changeNoteBackgroundColor( note: Note )
    {
    let id = await note.getId();
    let tx = DB.transaction( 'notes', 'readwrite' );
    let store = tx.objectStore( 'notes' );
    let request = store.get( id );

    request.onsuccess = function()
        {
        let result: NoteData = request.result;

        if ( result )
            {
            result.backgroundColor = note.getColorObject().getColor();
            store.put( result );
            }
        }
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


/**
 * Get the id of the note that is on the given position.
 */
export async function updateId( note: Note )
    {
    let position = note.getPosition();

    let promise = new Promise<number>( function( resolve, reject )
        {
        let tx = DB.transaction( 'notesInfo', 'readwrite' );
        let store = tx.objectStore( 'notesInfo' );
        let notesPosition = store.get( 'notesPosition' );

        notesPosition.onsuccess = function()
            {
            let notesInfo: NotesInfoData = notesPosition.result;

            let id = notesInfo.value[ position ];
            note.setId( id );
            resolve( id );
            };
        });

    return promise;
    }
}