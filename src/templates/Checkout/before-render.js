// PM added problematic class onto checkout cvc 4.1.22
$('.payment-period #ccv_block div').removeClass('third');

$('.payment-method table, #cart-frm table').addClass('blocked');
$('.payment-method ul').addClass('nostyle');
$('.payment-method ul ul').removeClass('nostyle').addClass('disc');

$('.card .payment-none-selected .blue-arrow, .card .payment-none-selected p:first-child, .card .payment-none-selected br, body>.footer, #wpadminbar, #query-monitor').remove();

$('form#checkout').each(function(){
    var action = $(this).attr('action');
    $(this).contents().unwrap();
    $('.cart-page .checkout-detail').wrapInner(`<form name="checkout" method="post" id="checkout" class="checkout" action="${action}"></form>`);
});

// Remove inline styles on payment-area rows
$('#order_review tr.payment-area td').removeAttr('style');

// Reorganize TDS storage so it closer resembles other shipping-list items
$('.shipping-list-storage>*').wrapAll('<div class="secure-storage"></div>');
$('.secure-storage label.chk-box').appendTo($('.secure-storage div.chk-area'));
$('.secure-storage .storage-title').replaceTagName('span');

// Bug on desktop: li.shipping-list are missing their parent ul
if ($('li.shipping-list').length > 0 && $('li.shipping-list').parents('ul.method-details').length === 0) {
    $('li.shipping-list').wrapAll($('<ul class="method-details"></ul>'));
}

// Replace fa-warning for smarty streets error
$('.fa-warning').replaceWith(`
<svg class="icon icon-exclamation-triangle" viewBox="0 0 28 28">
    <title>exclamation-triangle</title>
    <path d="M16 21.484v-2.969c0-0.281-0.219-0.516-0.5-0.516h-3c-0.281 0-0.5 0.234-0.5 0.516v2.969c0 0.281 0.219 0.516 0.5 0.516h3c0.281 0 0.5-0.234 0.5-0.516zM15.969 15.641l0.281-7.172c0-0.094-0.047-0.219-0.156-0.297-0.094-0.078-0.234-0.172-0.375-0.172h-3.437c-0.141 0-0.281 0.094-0.375 0.172-0.109 0.078-0.156 0.234-0.156 0.328l0.266 7.141c0 0.203 0.234 0.359 0.531 0.359h2.891c0.281 0 0.516-0.156 0.531-0.359zM15.75 1.047l12 22c0.344 0.609 0.328 1.359-0.031 1.969s-1.016 0.984-1.719 0.984h-24c-0.703 0-1.359-0.375-1.719-0.984s-0.375-1.359-0.031-1.969l12-22c0.344-0.641 1.016-1.047 1.75-1.047s1.406 0.406 1.75 1.047z"></path>
</svg>
`);

// Add Hidden Address to checkout screen for styles
// let addyHTML = `
//     <div class="address-detail hidden" style="width: 95%!important;padding-right: 0">
//         <p style="width: 90%">
//             <span class=""><br></span>
//         </p>
//         <span style="float: right;">
//             <a href="javascript:void(0)" class="edit_address_button pickshipping">
//                 <i class="fa fa-edit" style="padding-top:0">
//                     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-2x hidden">
//                         <path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class="hidden"></path>
//                     </svg>
//                 </i>
//             </a>
//         </span>
//     </div>
// `;

// $('.body>.addr-detail').append(addyHTML);

/** BEGIN: Replace table of products with container that can more easily match mock-ups **/
function generateProductContainer(img, title, price, qty, subtotal) {
    return $(`
        <div class="womp-product-container">
            <div class="product-img">
                <img src="` + img + `">
            </div>
            <div class="product-info">
                <div class="product-title">` + title + `</div>
                <div class="product-price"><span class="product-price-label">Price: </span>` + price + `</div>
                <div class="product-qty"><span class="product-qty-label">Qty: </span>` + qty + `</div>
                <div class="product-subtotal"><span class="product-subtotal-label">Subtotal: </span>` + subtotal + `</div>
            </div>
        </div>
    `);
}

if (/order-received/.test(location.pathname)) {
    var orderDetailProducts = [];

    $('.order-detail tbody tr').each(function () {
        var $this = $(this);
        var img = $this.find('.items-image img').attr('x-src') || $this.find('.items-image img').attr('src');
        var title = $this.find('.items-desc').text().trim();
        var price = $this.find('td:nth-child(2)').text().trim();
        var qty = $this.find('td:nth-child(3)').text().trim();
        var subtotal = $this.find('td:nth-child(4)').text().trim();
        
        orderDetailProducts.push(generateProductContainer(img, title, price, qty, subtotal));
    });
    
    if (orderDetailProducts.length > 0) {
        var productsWrapper = $('<div class="womp-products-wrapper">');
        productsWrapper.append(orderDetailProducts);
        $('.order-detail .body table').replaceWith(productsWrapper);
    }
    
    $('.order-detail .body').append($('.payment-area'));
    $('.order-detail .body').after($('.social-wrapper'));
}
/** END: Replace table of products with container that can more easily match mock-ups **/

// Use numpad for digit inputs and set correct types where appropriate
$('#authorize-net-cim-cc-number, #authorize-net-cim-cc-cvv').attr('type', 'number').attr('pattern', '\\d*');
$('#shipping_phone').attr('type', 'tel');
$('#billing_email_2').attr('type', 'email');

// Remove step numbers from headings and shrink some long headings
$('.checkout-block .head h5').each(function() {
    var $this = $(this);
    var headingText = $this.html().replace(/^\d\. /, '').replace(' Method:', ':').replace('Contact and Shipping', 'Contact/Shipping');
    $this.html(headingText);
});

// Add a class to new account setup so it can get styles
$('.order-delivery').each(function() {
    if (/New Account Setup/.test($(this).text()))
        $(this).addClass('new-account-setup');
});

// Remove inline styles from some elements
$('.createaccount div[style]').removeAttr('style');

// The browser autoscroll for HTML5 required fields does not bring the input into view correctly.
// Rely on JMB input verification
$('#authorize-net-cim-cc-cvv').removeAttr('required');

// Move modal login button inside form
$('#jm-login-form ~ .button-section').appendTo($('#jm-login-form'));

$('.fa-map-marker').html(`<svg aria-hidden="true" data-prefix="fas" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-map-marker-alt fa-w-12"><path fill="#1e5688" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" class=""></path></svg>`);
$('.fa-user').html(`<svg aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-user fa-w-16"><path fill="#1e5688" d="M256 0c88.366 0 160 71.634 160 160s-71.634 160-160 160S96 248.366 96 160 167.634 0 256 0zm183.283 333.821l-71.313-17.828c-74.923 53.89-165.738 41.864-223.94 0l-71.313 17.828C29.981 344.505 0 382.903 0 426.955V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-37.045c0-44.052-29.981-82.45-72.717-93.134z" class=""></path></svg>`);
$('.fa-phone').html(`<svg aria-hidden="true" data-prefix="fas" data-icon="phone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-phone fa-w-16"><path fill="#1e5688" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" class=""></path></svg>`);

$('.fa-facebook,.fa-facebook-f').html(`<svg aria-hidden="true" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512" class="svg-inline--fa fa-facebook-f fa-w-9"><path fill="currentColor" d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229" class=""></path></svg>`);
$('.fa-twitter').html(`<svg aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-twitter fa-w-16"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" class=""></path></svg>`);
$('.fa-youtube').html(`<svg aria-hidden="true" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-youtube fa-w-18"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" class=""></path></svg>`);
$('.fa-instagram').html(`<svg aria-hidden="true" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-instagram fa-w-14"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" class=""></path></svg>`);
$('.fa-apple').html(`<svg aria-hidden="true" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 376 512" class="svg-inline--fa fa-apple fa-w-12"><path fill="currentColor" d="M314.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C59.3 141.2 0 184.8 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" class=""></path></svg>`);
$('.fa-android').html(`<svg aria-hidden="true" data-prefix="fab" data-icon="android" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-android fa-w-14"><path fill="currentColor" d="M89.6 204.5v115.8c0 15.4-12.1 27.7-27.5 27.7-15.3 0-30.1-12.4-30.1-27.7V204.5c0-15.1 14.8-27.5 30.1-27.5 15.1 0 27.5 12.4 27.5 27.5zm10.8 157c0 16.4 13.2 29.6 29.6 29.6h19.9l.3 61.1c0 36.9 55.2 36.6 55.2 0v-61.1h37.2v61.1c0 36.7 55.5 36.8 55.5 0v-61.1h20.2c16.2 0 29.4-13.2 29.4-29.6V182.1H100.4v179.4zm248-189.1H99.3c0-42.8 25.6-80 63.6-99.4l-19.1-35.3c-2.8-4.9 4.3-8 6.7-3.8l19.4 35.6c34.9-15.5 75-14.7 108.3 0L297.5 34c2.5-4.3 9.5-1.1 6.7 3.8L285.1 73c37.7 19.4 63.3 56.6 63.3 99.4zm-170.7-55.5c0-5.7-4.6-10.5-10.5-10.5-5.7 0-10.2 4.8-10.2 10.5s4.6 10.5 10.2 10.5c5.9 0 10.5-4.8 10.5-10.5zm113.4 0c0-5.7-4.6-10.5-10.2-10.5-5.9 0-10.5 4.8-10.5 10.5s4.6 10.5 10.5 10.5c5.6 0 10.2-4.8 10.2-10.5zm94.8 60.1c-15.1 0-27.5 12.1-27.5 27.5v115.8c0 15.4 12.4 27.7 27.5 27.7 15.4 0 30.1-12.4 30.1-27.7V204.5c0-15.4-14.8-27.5-30.1-27.5z" class=""></path></svg>`);
$('.fa-edit').html(`<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-2x"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>`);

$('#new-echeck [style]').removeAttr('style');
$('#bank-info-input .modal-content[style]').removeAttr('style');
$('#loginButton,#bank-info-btn').addClass('right-arrow').wrap('<div class="bank-btn-container"></div>');
$('#bank-info-input .secure-section1 h4').after($('#bank-info-input .norton-image'));
