// qa.providentmetals.com
if (/^qa/i.test(location.hostname)) {
    $('body').addClass('QAPWAMP');
}

// General 'wait for element to become available' promise
function waitForElement(selector) {
    return new Promise(function(resolve, reject) {

        var elm = document.querySelector(selector);
        if (elm !== null) {
            resolve(elm);
        } else {
            var waitTimeout = setTimeout(function () {
                clearInterval(waitInterval);
                reject('waitForElement: timeout reached waiting for ' + selector);
            }, 20000); // Max 20 seconds

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

// Swap out the bitpay iframe -- which is not responsive -- with
// a button that sends users to the full bitpay checkout page
function replaceBitpayIframe() {
    // Show the PWA loader
    if (window.top.wompPwampFunctions)
        window.top.wompPwampFunctions.showLoader();
    
    waitForElement('#bitpay_invoice_iframe')
    .then(function (iframe) {
        // Save the iframe src and then remove the iframe
        window.bitpaySrc = iframe.src.replace('&view=iframe', '');
        iframe.parentNode.removeChild(iframe);
        
        // Create a button to go to Bitpay in a new tab
        var button = document.createElement('button');
        button.setAttribute('class', 'bitcoinbtn');
        button.innerHTML = 'Open BitPay';
        button.setAttribute('onclick', 'window.top.location = window.bitpaySrc;');
        
        // Insert the button into the page
        var bitpayText = document.body.querySelector('.bitpay_checkout_text');
        bitpayText.parentNode.insertBefore(button, bitpayText);

        console.log('Bitpay iframe successfully replaced');
    })
    .catch(function(error) {
        console.log(error);
    })
    .finally(function() {
        // Hide the PWA loader
        if (window.top.wompPwampFunctions)
            window.top.wompPwampFunctions.hideLoader();

        // Scroll to top
        window.top.scroll(0, 0);
    });
}

// Watch for form submission and prepare to replace the
// bitpay iframe with a button
waitForElement('form#checkout')
.then(function(checkout) {
    var paymentMethod = document.getElementById('payment_method');
    if (paymentMethod !== null && paymentMethod.value === 'bitpay'){
        checkout.addEventListener('submit', replaceBitpayIframe, true);
    }  
   
    // gift cert checkbox
    // var giftCheckbox = document.querySelector('.gift');
    // if(giftCheckbox!== null){
    //     var shippingBox = document.querySelector('.shipping-method.checkout-block');
    //     if(shippingBox)
    //         shippingBox.append(giftCheckbox);
    // }
    
})
.catch(function(error) {
    console.log(error);
});

waitForElement('#checkoutpp')
    .then(function(checkout) {
    var paymentMethod = document.getElementById('payment_method');
    if(paymentMethod !== null && paymentMethod.value === 'paypal_express'){
        waitForElement('.paypal-address .change-address')            
        .then(function(paypalChangeAddress) {
            if(paypalChangeAddress){            
                paypalChangeAddress.removeAttribute('href');            
            } 
            
            // need to also add gift checkbox for pp checkout
            // gift cert checkbox
            // var giftCheckbox = document.querySelector('.gift');
            // if(giftCheckbox!== null){
            //     var shippingBox = document.querySelector('.shipping-method.checkout-block');
            //     if(shippingBox)
            //         shippingBox.append(giftCheckbox);
            // }
            })            
            .catch(function(error) {            
                console.log(error);            
            });            
   }
   
})
.catch(function(error) {
    console.log(error);
});

// Watch for the timeout modal to appear and position it
// where the user can see it
waitForElement('#timesup')
.then(function(timesup) {
    var moNode = timesup;
    var moConfig = { attributes: true };
    var moCallback = function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.attributeName === 'style') {
                var modalContent = moNode.querySelector('.modal-content');
                if (modalContent !== null) {
                    var offset = 100 + (window.top.pageYOffset || window.top.document.documentElement.scrollTop);
                    modalContent.style.marginTop = offset + 'px';
                }
            }
        }
    };
    var mo = new MutationObserver(moCallback);
    mo.observe(moNode, moConfig);
})
.catch(function (error) {
    console.log(error);
});

// Watch for an error message and scroll to it if one appears
(function() {
    var moNode = document.getElementById('checkout');
    if (!moNode)
        return;

    var moConfig = { childList: true };
    var moCallback = function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.addedNodes.length > 0) {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                    var addedNode = mutation.addedNodes[j];
                    if (addedNode.classList && addedNode.classList.contains('woocommerce-error')) {
                        window.top.scroll(0, 0);
                    }
                }
            }
        }
    };
    var mo = new MutationObserver(moCallback);
    mo.observe(moNode, moConfig);
}());

var monitorPlaid = function (elm) {
    if (!elm)
        return;

    var moNode = elm;
    var moConfig = { attributes: true };
    var moCallback = function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.attributeName === 'style') {
                if (mutation.target.style.display === 'block') {
                    setTimeout(function () {
                        document.body.style.setProperty('height', 'auto', 'important');
                    }, 100);
                } else if (mutation.target.style.display !== 'block') {
                    setTimeout(function () {
                        document.body.removeAttribute('style');
                    }, 100);
                }
            }
        }
    };
    var mo = new MutationObserver(moCallback);
    mo.observe(moNode, moConfig);
};

// Resize ACH iframe
var achIframes = document.querySelectorAll('.plaid-link-iframe');
for (var i = 0; i < achIframes.length; i++) {
    achIframes[i].style.setProperty('height', (window.top.innerHeight - 80) + 'px', 'important');
    achIframes[i].style.setProperty('min-height', (window.top.innerHeight - 80) + 'px', 'important');
    monitorPlaid(achIframes[i]);
}

// Scroll ACH tooltip into view
$('#new-echeck .echeck-question').on('click', function () {
    window.top.scroll(0, 160);
});

// Scroll bank info modal into view
$('#new-echeck #bank-info-btn').on('click', function () {
    window.top.scroll(0, 0);
});

// Remove styling on checkout
$('button#linkButton.main-btn').removeAttr('style');


// Wait for checkout question and then toggle the model
// ZDT-2574 added Co state taxes modal:
waitForElement('.payment-area.state-fees td i')
.then(function(checkout) {
    document.querySelector('.payment-area.state-fees td:nth-child(2)').setAttribute('id', 'sidebar-checkout-state-taxes');
    var taxStateToggle = document.getElementById('sidebar-checkout-state-taxes');
    if (taxStateToggle !== null){
        console.log("womp: Added state toggle");
        $('tr.payment-area.state-fees').append(`
            <div id="womp-popover-state" class="off state">
                <div class="arrow"></div>
                Your state requires us to charge a Retail Delivery Fee. <a href='https://tax.colorado.gov/retail-delivery-fee' target='_blank'>Click here</a>  to learn more about your state's rules.
            </div>
            <div id="womp-popover-toggle-state" class="off state"></div>`);
        taxStateToggle.addEventListener('click', toggleStateTax);
        document.getElementById('womp-popover-toggle-state').addEventListener('click', toggleStateTax2);
    }
})
.catch(function(error) {
    console.log(error);
});
function toggleStateTax() {
    if($('#womp-popover-state.off').length > 0){
        $('#womp-popover-state, #womp-popover-toggle-state').removeClass('off');
    }else{
        $('#womp-popover-state, #womp-popover-toggle-state').addClass('off');
    }
}
function toggleStateTax2() {
    $('#womp-popover-state, #womp-popover-toggle-state').addClass('off');
}

waitForElement('#sidebar-checkout-taxes i')
.then(function(checkout) {
    var taxToggle = document.getElementById('sidebar-checkout-taxes');
    if (taxToggle !== null){
        console.log("womp: Added toggle");
        $('tr.payment-area.ship').append(`
            <div id="womp-popover" class="off">
                <div class="arrow"></div>
                We may need to charge you sales tax depending on your shipping address. The sales tax amount, if any, will be displayed after you enter your shipping address at checkout. Learn more from our <a href="/sales-tax.html" target="_blank">Sales Tax Guide</a>.
            </div>
            <div id="womp-popover-toggle" class="off"></div>`);
        taxToggle.addEventListener('click', toggleTax);
        document.getElementById('womp-popover-toggle').addEventListener('click', toggleTax2);
    }
})
.catch(function(error) {
    console.log(error);
});
function toggleTax() {
    if($('#womp-popover.off').length > 0){
        $('#womp-popover, #womp-popover-toggle').removeClass('off');
    }else{
        $('#womp-popover, #womp-popover-toggle').addClass('off');
    }
}
function toggleTax2() {
    $('#womp-popover, #womp-popover-toggle').addClass('off');
}

/*
$('#blockmodal #shippingModal .user-address').each(function () {            
    $(this).find('a').wrapAll('<div class="edit_remove_flex"></div>');            
});            
$('#blockmodalbilling #billingareablocks .user-address').each(function () {            
    $(this).find('a').wrapAll('<div class="edit_remove_flex"></div>');            
});
*/
$('#blockmodalbilling .addnewbill').closest('tr').addClass('addnewbill_container');

//specifices guest account page for easier css splitting in some cases
if($('#createaccountmodal').length > 0) {
    $('body').addClass('guest_checkout');
}

//adds top scroll click listener to change billing and shipping address buttons (when visible)            
$(`a.edit_address_button.pickbilling, a.edit_address_button.pickshipping, .addnewbill h4, .addnewship h4, .pagination a,
    .changeAddress, .removeaddress, .changeBillAddress, .removeBillAddress`).on('click', function () {
        
    window.top.scroll(0, 0);            
});            

// displays current shipping address properly for mobile 
let elem_wrap = setInterval(function() {                       
    if ($('body.checkout').length > 0) {          
        $('#billingarea .billaddy').each(function() {
           $(this).find('.contact-detail, .address-detail').wrapAll('<div class="contact_btn_wrap"></div>');
        });
        clearInterval(elem_wrap);            
}}, 200);        


//adds top scroll click listener to change billing and shipping address buttons (when visible)     
function scroll_top_on_buttons() {
    $(`a.edit_address_button.pickbilling, a.edit_address_button.pickshipping, .addnewbill h4, .addnewship h4, .pagination a,
        .changeAddress, .removeaddress, .changeBillAddress, .removeBillAddress`).on('click', function () {
            
        window.top.scroll(0, 0);            
    });  
} scroll_top_on_buttons();

// previous function and function call set scroll top listener on addr change buttons
// observer reapplies scroll top functionality if an addr is edited or a new addr is added
let ship_bill_observer = new MutationObserver(() => {
    scroll_top_on_buttons();
});
const ship_bill_observer_options = {
    childList: true, // observe direct children
    subtree: true // and lower descendants too
};
// observe everything except attributes
ship_bill_observer.observe(document.querySelector('#billingarea'), ship_bill_observer_options);





