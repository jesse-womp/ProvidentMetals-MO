// Remove inline styles
$('.checkout-block>div>div[style]').removeAttr('style');
$('.checkout-block>div:first-child>div>span[style]').removeAttr('style');
$('#new-payment-details[style]').removeAttr('style');

// Use standard input checkboxes
$('.chk-area .chk-box').each(function() {
    $(this).replaceWith($(this).find('input'));
});

// Move image out of div for easier arrangement of text next to it
$('.checkout-block>div:first-child>div>img').prependTo($('.checkout-block>div:first-child'));

// Use numpad for digit inputs and set correct types where appropriate
$('#authorize-net-cim-cc-number, #authorize-net-cim-cc-cvv').attr('type', 'number').attr('pattern', '\\d*');

/* Invoice Thank You */

// Move print link from head to body
$('.head:first .print').prependTo($('.body:first'));

/* Invoice CC payment */

// Move CCV block to correct spot
$('.payment-period #ccv_block').appendTo($('.payment-period').parent());