// Wait for an element to become available before proceeding
function wmWaitForElement(selector) {
    return new Promise(function (resolve, reject) {
        var elm = document.querySelector(selector);
        if (elm !== null) {
            resolve();
        } else {
            var waitTimeout = setTimeout(function () {
                clearInterval(waitInterval);
                reject('wmWaitForElement: timeout reached waiting for ' + selector);
            }, 15000); // Max 15 seconds
            var waitInterval = setInterval(function () {
                elm = document.querySelector(selector);
                if (elm !== null) {
                    clearInterval(waitInterval);
                    clearTimeout(waitTimeout);
                    resolve(elm);
                }
            }, 50);
        }
    });
}

/* /cookie-policy */

// Change consent link
wmWaitForElement('a[href="javascript:CookieConsent.renew();CookieDeclaration.SetUserStatusLabel();"]')
.then(function (cookieConsentLink) {
    cookieConsentLink.href = 'javascript:window.top.CookieConsent.renew();';
})
.catch(function (error) {
    console.log(error);
});
// Withdraw consent link
wmWaitForElement('a[href="javascript:CookieConsent.withdraw();CookieDeclaration.SetUserStatusLabel();"]')
.then(function (cookieConsentLink) {
    cookieConsentLink.href = 'javascript:window.top.CookieConsent.withdraw();window.top.wompPwampFunctions.showLoader();location.reload();';
})
.catch(function (error) {
    console.log(error);
});
