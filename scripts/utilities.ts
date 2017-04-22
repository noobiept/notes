module Utilities
{
export function utf8_to_b64( str )
    {
    return window.btoa( decodeURI( encodeURIComponent( str ) ) );
    }


export function b64_to_utf8( str )
    {
    return decodeURIComponent( encodeURI( window.atob( str ) ) );
    }


/**
 * Calls the `callback` with a dictionary that has all the requested keys/values from `localStorage`.
 */
export function getData( keys, callback )
    {
    var objects = {};

    for (var a = 0 ; a < keys.length ; a++)
        {
        var key = keys[ a ];
        var value = localStorage.getItem( key );

        objects[ key ] = value && JSON.parse( value );
        }

    callback( objects );
    }


/**
 * Sets the given key/value into `localStorage`. Calls the `callback` when its done.
 * Converts the value to string (with json).
 */
export function setData( items )
    {
    for ( var key in items )
        {
        if ( items.hasOwnProperty( key ) )
            {
            localStorage.setItem( key, JSON.stringify( items[ key ] ) );
            }
        }
    }


/*
 * Keys code for the keyboard events
 */
export var EVENT_KEY = {

    backspace  : 8,
    tab        : 9,
    enter      : 13,
    esc        : 27,
    space      : 32,
    end        : 35,
    home       : 36,
    leftArrow  : 37,
    upArrow    : 38,
    rightArrow : 39,
    downArrow  : 40,
    del        : 46,

    "0" : 48,
    "1" : 49,
    "2" : 50,
    "3" : 51,
    "4" : 52,
    "5" : 53,
    "6" : 54,
    "7" : 55,
    "8" : 56,
    "9" : 57,

    a : 65,
    b : 66,
    c : 67,
    d : 68,
    e : 69,
    f : 70,
    g : 71,
    h : 72,
    i : 73,
    j : 74,
    k : 75,
    l : 76,
    m : 77,
    n : 78,
    o : 79,
    p : 80,
    q : 81,
    r : 82,
    s : 83,
    t : 84,
    u : 85,
    v : 86,
    w : 87,
    x : 88,
    y : 89,
    z : 90,

    f1  : 112,
    f2  : 113,
    f3  : 114,
    f4  : 115,
    f5  : 116,
    f6  : 117,
    f7  : 118,
    f8  : 119,
    f9  : 120,
    f10 : 121,
    f11 : 122,
    f12 : 123

    };
}