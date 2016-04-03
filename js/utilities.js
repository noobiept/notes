/*exported utf8_to_b64, b64_to_utf8*/

function utf8_to_b64( str )
{
return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str )
{
return decodeURIComponent(escape(window.atob( str )));
}
