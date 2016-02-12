chrome.app.runtime.onLaunched.addListener( function() {
    chrome.app.window.create( 'index.html', {
        'state': 'maximized'
    }, function( window ) {
        window.onClosed.addListener( function() {
            chrome.storage.local.set( window.contentWindow.Save.getSaveData() );
        });
    });
});
