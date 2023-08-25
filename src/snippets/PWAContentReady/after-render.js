PWAContentReady : function(){
    // Run callback function if it exists (e.g. for PWAMP or delaying before AMP processing)
    try {
        if (typeof window.top.wmmoDOMContentLoadedCallback === 'function')
            window.top.wmmoDOMContentLoadedCallback();
    } catch (ex) {
        console.error('Unable to run window.top.wmmoDOMContentLoadedCallback() ', ex);
    }
}