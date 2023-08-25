$('.payment-method table, #cart-frm table').addClass('blocked');
$('.payment-method ul').addClass('nostyle');
$('.payment-method ul ul').removeClass('nostyle').addClass('disc');

$('.card .payment-none-selected .blue-arrow, .card .payment-none-selected p:first-child, .card .payment-none-selected br').remove();

// $('.fa-question-circle').html(`<svg aria-hidden="true" data-prefix="fas" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-question-circle fa-w-16"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" class=""></path></svg>`)

$('.payment-selection li').wrapInner('<label></label>');

//lots of text abbreviations/copying to other areas for mobile
$('.payment-selection li').each(function() {
    var $this = $(this);
    var type = $this.attr('id').replace('block_', '');
    var minmax = $('.choosen li#tick' + type + ' p').html();
    $('#pay' + type).prepend(`<p class="blue">${minmax}</p>`);
    minmax = minmax.replace('Minimum', 'Min').replace('Maximum', 'Max');
    $this.find('p').append(`<span> ${minmax}</span>`);
});

$('.choosen li').each(function() {
    var $this = $(this);
    $this.find('h2').html($(this).find('h2').html().replace('payment Chosen', '').replace('Payment Chosen', ''));
    var max = $(this).find('p').html();
        max = max.substring(max.lastIndexOf("/")+1).replace('Maximum', 'Max');
    $this.find('p').html(max);
});

$('#tickbitpay h2').html('Crypto');

$('.cart-qty input[type="submit"]').attr('value', 'Update').addClass('main-btn');

$('.cart-login #order_review table').addClass('blocked');
$('.cart-login .cart-section-btm').insertAfter($('.cart-login #order_review'));

// Add arrow to login buttons
$('.beforePaypal button').addClass('right-arrow');

// Move 'Remove' button under product title
$('.cart_table_item').each(function(){
    $(this).find('a.remove-item').insertAfter($(this).find('.product-desc h2'));
});

// Remove 'In Stock' from item listing
$('.stockalert:not(.presale)').remove();

// Combine presale confirmation text
var confirmationText = $('.confirmation p:nth-child(2)').text();
$('.confirmation .presale span strong').append('. ' + confirmationText);
$('.confirmation p:nth-child(2)').remove();

// Shrink new customer / guest checkout heading so it fits on one line
$('.new-customer h2').html('New Customers / Guests');

// Use number keypad on mobile devices for qty input
$('input.qty').attr('pattern', '\\d*');

// Special layout for starter pack in cart (no qty form)
$('.cart_table_item').each(function() {
    var $this = $(this);
    var pQty = $this.find('.cart-qty>p');
    if (pQty.length > 0) {
        pQty.html(pQty.html() + ' Per Household');
        $this.find('.product-desc').append(pQty);
        $this.find('.cart-qty').css('padding', '0');
    }
});

//replace payment images with mobile images
$('li[rel="card"] img').attr('x-src', '/wp-content/themes/JMBullion/images/credit-card-all.png');
$('li[rel="paypal"] img').attr('x-src', '/wp-content/themes/JMBullion/images/payment-icons/Paypal.png');
$('li[rel="check"] img').attr('x-src', '/wp-content/themes/JMBullion/images/payment-icons/PaperCheck.png');
$('li[rel="wire"] img').attr('x-src', '/wp-content/themes/JMBullion/images/payment-icons/BankWire.png');
$('li[rel="bitcoin"] img').attr('x-src', '/wp-content/themes/JMBullion/images/payment-icons/Bitcoin.png');
$('li[rel="echeck"] img').attr('x-src', '/wp-content/themes/JMBullion/images/payment-icons/echeck.png');
$('li[rel="googlepay"] img').attr('x-src', '/wp-content/themes/JMBullion/images/payment-icons/google-pay.png');

// Kill the hover listeners so first tap works on payment method
$('script:contains(jQuery):contains(.hover):first').before($('<script>jQuery.prototype.hover = jQuery.noop;</script>'));

// $('#jm_cart_login input[type="text"], #jm_cart_login input[type="password"]').prop('required', true)

// Changes cart for new update -JG 2/18/21
mobileCartManipulation = function() {
    $('.remove-item').text('×');
    $('.remove-item').closest('div').addClass('removeItemContainer');
    $('.product-desc').parent().addClass('productDescContainer');
    
    $('.cart_table_item').each(function() {
        $(this).find($('.removeItemContainer')).appendTo($(this).find($('.product-desc')));    
    });
    
    if($('.payment_type option[value="x"]').length > 0) {
        $('.product-subtotal.total-strong span').addClass('hide_method_text');
    }
    
    //regex to remove the rest of the details in the select, just leaves the name of the payment method -JG 2/26/21
    $('.payment_type option').each(function () {
        $(this).text($(this).text().replace(/(\s\-\sMIN).*$/, ''));
    });
    
}();

