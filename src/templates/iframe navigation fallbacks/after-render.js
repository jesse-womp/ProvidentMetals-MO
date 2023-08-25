/*var notPwreset = true;

// if this is a pwreset then redirect to the homepage
// https://www.providentmetals.com/?pwreset=1
if(window.location.href.indexOf('pwreset')>-1){
    debugger;
    console.log('Detected pwredirect: redirecting to homepage');
    notPwreset = false;
    window.location.href = 'https://www.providentmetals.com/';
    return;
}*/

// if this isn't a product page, opt-out of PWA for next load
if ($('.product-detail-region').length < 1) {
    
    if(window.location.href.indexOf('pwreset')>-1){
        console.log('Detected pwredirect: redirecting to homepage');
        notPwreset = false;
        window.location.href = 'https://amp.providentmetals.com/';
        return;
    }else{
        sessionStorage.setItem('wmSkipNextPwamp', 'true');
        console.log('Error loading MO: Next Page will be Desktop');
        top.location.href = location.href;
        return;
    }
    
}

// open current page in top
console.log('Error loading iframe: navigating top frame');
try {
    top.wompPwampFunctions.loadInPwa(location.href);
} catch (ex) {
    top.location.href = location.href;
}
