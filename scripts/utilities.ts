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
}