function Load()
{
Menu();

Load.data();
Options.load( Load.options_json );
Load.notes();

MAIN_CONTAINER.addDummyNote();
}


// will have the stuff loaded (as an object, parsed from json)
Load.stuff_json = null;
Load.options_json = null;


/*
    Loads the data from the server or localStorage, and turns it from json text into the object, for later to be used to create the elements etc
 */

Load.data = function()
{
if ( TYPE === 'server' )
    {
    $.ajax({

        type: 'POST',
        async: false, //HERE ter algo a dizer k esta a fazer o load
        url: '/notes/get_data/',

        success: function(jqXHR, textStatus)
            {
            var stuff = jqXHR;

            Load.stuff_json = JSON.parse( stuff.data );
            Load.options_json = JSON.parse( stuff.options );
            },

        error: function(jqXHR, textStatus, errorThrown)
            {
                //HERE ter uma mensagem
            console.log(jqXHR, textStatus, errorThrown);
            }

        });
    }

    // localStorage
else
    {
    var stuff = localStorage.getObject( 'notes' );
    var options = localStorage.getObject( 'options' );

    Load.stuff_json = stuff;
    Load.options_json = options;
    }
};



/*
 * load the notes
 */

Load.notes = function()
{   
var notes = Load.stuff_json;
    
    // first time the program runs
if (notes === null || notes === '')
    {
    return;
    }


var i = 0;

for (i = 0 ; i < notes.length ; i++)
    {
    MAIN_CONTAINER.newNote( notes[ i ].text, notes[ i ].backgroundColorComponents, false );
    }



    // set focus on the element that was active last time
var activeNotPosition = Options.get( 'activeNotePosition' );

if (activeNotPosition >= 0)
    {
    var noteObject = MAIN_CONTAINER.getChild( activeNotPosition );
    
    if (noteObject !== null)
        {
        noteObject.gainFocus();
        }
    }
};

