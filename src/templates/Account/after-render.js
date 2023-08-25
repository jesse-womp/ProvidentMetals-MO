
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

// Scroll ACH iframe into view
// $('.method-payment #linkButton,#account-list-table .verify-account,#new-echeck #linkButton').on('click', function () {
//     window.top.scroll(0, 0);
// });

// Scroll "Add Bank" modal into view
$('.prepared-area #modify_echeck, #bank-info-btn, #linkButton, #addBankAccount').on('click', function () {
     window.top.scroll(0, 0);
});

// Listen for the appearance of new ACH iframes and apply styles
(function() {
    var moNode = document.body;
    var moConfig = { childList: true, subtree: true };
    var moCallback = function (mutations) {
        var j, mutation, addedNode;
        for (var i = 0; i < mutations.length; i++) {
            mutation = mutations[i];
            for (j = 0; j < mutation.addedNodes.length; j++) {
                addedNode = mutation.addedNodes[j];
                if (addedNode.classList && addedNode.classList.contains('plaid-link-iframe')) {
                    addedNode.style.setProperty('height', (window.top.innerHeight - 80) + 'px', 'important');
                    addedNode.style.setProperty('min-height', (window.top.innerHeight - 80) + 'px', 'important');
                    
                    monitorPlaid(addedNode);
                }
            }
        }
    };
    var mo = new MutationObserver(moCallback);
    mo.observe(moNode, moConfig);
}());

//Replace font awesome icons with svgs
$('.fa-user').append('<svg class="wi wi-user"><use xlink:href="#fa-user"></use></svg>');
$('.fa-heart').append('<svg class="wi wi-heart"><use xlink:href="#fa-heart-solid"></use></svg>');
$('.fa-bell').append('<svg class="wi wi-bell-solid"><use xlink:href="#fa-bell-solid"></use></svg>');
$('.fa-check-circle').append('<svg class="wi wi-circle-check"><use xlink:href="#fa-circle-check"></use></svg>');
$('.fa-credit-card').append('<svg class="wi wi-credit-card-solid"><use xlink:href="#fa-credit-card-solid"></use></svg>');
$('.fa-search').append('<svg class="wi wi-search"><use xlink:href="#fa-search"></use></svg>');
//$('.fa-shopping-cart').append('<svg class="wi wi-cart-shopping"><use xlink:href="#fa-cart-shopping"></use></svg>'); //for sell to us/autobuy modal, not yet implemented on PM
$('.fa-info-circle').append('<svg class="wi wi-info-circle"><use xlink:href="#fa-info-circle"></use></svg>');
$('.fa-lock').append('<svg class="wi wi-lock"><use xlink:href="#fa-lock"></use></svg>');
$('.fa-star').append('<svg class="wi wi-star"><use xlink:href="#fa-star"></use></svg>');
$('.fa-suitcase').append('<svg class="wi wi-suitcase"><use xlink:href="#fa-suitcase"></use></svg>');
$('.fa-tasks').append('<svg class="wi wi-list-check"><use xlink:href="#fa-list-check"></use></svg>');
$('.fa-book').append('<svg class="wi wi-book"><use xlink:href="#fa-book"></use></svg>');
$('.fa-reply').append('<svg class="wi wi-reply"><use xlink:href="#fa-reply"></use></svg>');
// Wishlist trash icon            
$('.section-jmb-wishlist .jmb-wishlist').prepend('<svg class="wi wi-fa-trash-can"><use xlink:href="#fa-trash-can"></use></svg>');
//end replace font awesome icons

