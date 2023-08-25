// Wishlist addition in Cart            
         
if($('.wish-item').length > 2){            
    $('.sliderwrapp').prepend($('.wishlist-area'));            
    $('#cart-frm').append($('.sliderwrapp'));             
}            
    
if($('.wish-item').length <= 2){            
    $('.wish-item').each(function(){            
        var $this = $(this);            
        $this.removeAttr('style');            
    })            
    $('#cart-frm').append($('.wishlist-area'));             
}

// this prevents overflow of select options on iOS
$('#wm_body .payment-selector select').append('<optgroup label=""></optgroup>');

// Text Updates, AL request
$('#order_review tr.payment-area td:contains("Shipping & Handling")').text('Shipping:');
$('#order_review tr.total td:contains("Grand")').text('Total:');

$('.cart-page.two-column.chekout > .container #order_review table.data-table').wrap('<div class="cartSummaryTableWrapper"></div>');

$('.choosen li, .payment-selection li').on('click', function() {
    $('td.card, .payment-selection').slideToggle();
    return false;
});

$('form[method="post"]').on('submit', function() {
    window.top.wompPwampFunctions.showLoader();
});

// Paypal tooltip fix 1.5.23
$('.paypal-cn .fa-question-circle').on('click', function () {
    $('.tool-tip.paypal-shipping-tip').addClass('active');
});

//This applepay element does not exist at "before template is applied" runtime. 
$('#block_braintree_applepay').removeAttr('style');  //Applepay for some reason has an empty style attribute added.
$('#block_braintree_applepay').wrapInner('<label></label>');
$('#block_braintree_applepay').find('p').append(`<span> Min: $0 / Max: $50,000</span>`);
$('li[rel="applepay"] img').attr('src', '/wp-content/themes/JMBullion/images/payment-icons/apple-pay.png');


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
                    if (addedNode.classList.contains('woocommerce-error')) {
                        window.top.scroll(0, 0);
                        window.top.wompPwampFunctions.hideLoader();
                    }
                }
            }
        }
    };
    var mo = new MutationObserver(moCallback);
    mo.observe(moNode, moConfig);
})();

$('.fa-sync').append('<svg class="wi wi-sync"><use xlink:href="#fa-sync"></use></svg>');

$('.fa-arrow-circle-up').append('<svg class="wi wi-user"><use xlink:href="#fa-arrow-circle-up"></use></svg>');

$('.fa-chevron-up').append('<svg class="wi wi-user"><use xlink:href="#fa-chevron-down"></use></svg>');




