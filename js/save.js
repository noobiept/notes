/*jslint white: true, vars: true, browser: true, newcap: true, plusplus: true*/
/*global Storage, localStorage, MAIN_CONTAINER, OPTIONS, NoteWindow*/

'use strict';

/*
 * Converts an object to string, and saves it in storage
 * 
 * usage: 
 *      localStorage.setObject( "...", { ... } );
 */

Storage.prototype.setObject = function( key, value )
{
this.setItem( key, JSON.stringify( value ) );  
};



/*
 * Returns null if it doesn't find, otherwise returns the string correspondent
 */

Storage.prototype.getObject = function( key )
{
var value = this.getItem( key );

return value && JSON.parse( value );  
};




/*
 * Save the data to localStorage or to the server
 * 
 * Arguments :
 * 
 *      logout (bool) : to logout the user aswell (server only)
 */

function Save( logout )
{
    // a NoteWindow may be opened when the program closes, and since we only save the text of a note when that window is closed, we have to save the text of that note now
if ( NoteWindow.isOpened() )
    {
    NoteWindow.saveNote();
    }


    
var notes = [];

var noteObject = MAIN_CONTAINER.getFirstChild();

for ( ; noteObject !== null ; noteObject = noteObject.next() )
    {
    notes.push({
        text  : noteObject.getText(),
        backgroundColorComponents : noteObject.getColorObject().getColor() 
        });
    }


    
    // :: Options :: //

var activeNote = document.activeElement;
    
var activePosition = -1;    // -1 means no focus

    // find if there is a note on focus, to save its position
if (activeNote.classList.contains('noteEntry'))
    {
    noteObject = activeNote.parentNode.noteObject;
    
    activePosition = noteObject.getPosition();
    }




    // update the active note
OPTIONS.activeNotePosition = activePosition;

   
   
if (TYPE == "server")
    {
    /* 
        fields:
            data
            options
            logout
     */
        
    var data = { data: JSON.stringify( notes ), options: JSON.stringify( OPTIONS ) };
    
        
    if (logout === true)
        {
            // doesn't matter the value, just by having the property works
        data.logout = 1;
        }
    
        
    $.ajax({

        type        : 'POST',
        async       : false,
        url         : '/logout_notes',
        //crossDomain : false,
        data        : data,
        contentType : 'text/plain; charset=utf-8',
        complete    : function( jqXHR, textStatus )
            {
            $(location).attr('href', '/');
            }
        });
    }
    
    // save to localStorage
else
    {
    localStorage.setObject( 'notes', notes );
    
    localStorage.setObject( 'options', OPTIONS );        
    }
}







/*
 * For jquery ajax to work (server only)
 */

jQuery(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});
