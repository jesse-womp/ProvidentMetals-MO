
// Account subNavigation
// $('.sidebar').remove();
$('.learn-more-sidebar').remove();

/* Customer payment methods: Bank account table - https://qa.providentmetals.com/customer/payment-methods/ */
$('#account-list-table').prev('p').addClass('noItemsMsg');

/* https://qa.providentmetals.com/customer/payment-methods/new/ */
if (location.pathname.includes('customer/payment-methods/new/')) {
    $('#new-cc-payment-form .button-section').prepend($('.error_message'));
}

/* https://qa.providentmetals.com/customer/payment-methods/new/ */
if (location.pathname === '/customer/account/') {
    $('a:contains(Manage Addresses)').attr('class', 'col-xs-6 textRt');
    
    $('#my-orders-table').wrap('<div id="my-account-order-table"></div>');
}

// Wrap order table on customer/account and sales/order/history so that other order table are not affected 
if (location.pathname === '/sales/order/history/') {
    $('#my-orders-table').wrap('<div id="my-account-order-table"></div>');
}

$('.tabs li:contains(My Information)').each(function(){
    $(this).html($(this).html().replace('Information', 'Info'));
});

$('.tab-title.methods').prepend('<i class="fa fa-credit-card" aria-hidden="true"></i>');

$('#create_address_button').closest('.user-address').addClass('newaddr');

$('table.order-table,#payment_list table,#account-list-table').addClass('flextable');

// Move payment type headers into td cells
$('#payment_list table th').each(function(i){
    var label = $(this).html();
    $(this).closest('table').find('td:nth-child(' + (i+1) + ')').prepend(`<span class="label">${label}</span>`);
});
$('#account-list-table th').each(function(i){
    var label = $(this).html();
    $(this).closest('table').find('td:nth-child(' + (i+1) + ')').prepend(`<span class="label">${label}</span>`);
});

$('.view-order .order-steps p:not(.hide)').appendTo($('.order-pages div.head:first'));

$('#edit-info').html('<button class="main-btn"><span>Edit</span></button>');
$('#change-pwd').html('<button class="main-btn"><span>Change Password</span></button>');

// Remove extra space from heading
$('.right-section span:contains(Write paper)').text(function () {
    return $(this).text().replace('below :', 'below:');
});

// Payment types - remove some inline styles (not all)
$('#cc-list-table .tble_row1 td,#account-list-table *,.new-credit .credit-card').removeAttr('style');
$('.new-credit .credit-card').removeAttr('style');

// Buyback orders
$('h3:contains(Buyback Orders)').addClass('buyback-heading'); // /my-account/ only
$('.view-buyback-order .order-pages.thank-you .prepared.detail').removeAttr('style');
$('.view-buyback-order .order-pages.thank-you .prepared.detail *').removeAttr('style');
$('.view-buyback-order .social-section,.view-buyback-order .download.icons').remove();
$('.view-buyback-order .payment-area').unwrap();

/** BEGIN: Replace table of products with container that can more easily match mock-ups **/
function generateProductContainer(img, title, price, qty, subtotal) {
    var priceLabel = /view-buyback-order/.test(location.pathname) ? 'Buyback Price' : 'Price';
    return $(`
        <div class="womp-product-container">
            <div class="product-img">
                <img src="` + img + `">
            </div>
            <div class="product-info">
                <div class="product-title">` + title + `</div>
                <div class="product-price"><span class="product-price-label">${priceLabel}: </span>` + price + `</div>
                <div class="product-qty"><span class="product-qty-label">Qty: </span>` + qty + `</div>
                <div class="product-subtotal"><span class="product-subtotal-label">Subtotal: </span>` + subtotal + `</div>
            </div>
        </div>
    `);
}

if (/view-order|view-buyback/.test(location.pathname)) {
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
    $('.social-wrapper').remove();
}

// ZD 2251 requested that we adjust bank wires and paper check styling (/sales/order/view/?order): 
$('.my-account .prepared-area').height('auto');
$('.my-account .prepared-area .right-section').height('auto');

/** END: Replace table of products with container that can more easily match mock-ups **/

//remove href="#" from delete address links to make delete address links work; Michael 9/6/2020
$('.address-book a[id*="remove_address_button"]').removeAttr('href');

//form updates to edit account information
//example url: https://qa.providentmetals.com/customer/account/edit/
$('.my-account form#pm_update_account').after(`
    <form method="post" id="pm_update_account2" style="display:none">
        <div class="row">
            <div class="new-input current-password">     
                <input id="pwd2" name="pwd" required="" type="password">
			    <label for="current_password" class="required">Current Password</label>
            </div>
            <div class="new-input new-password">     
                <input id="new-pwd2" name="new-pwd" required="" type="password">
				<label for="password" class="required">New Password</label> 
            </div>
            <div class="new-input confirm-password">
                <input id="cpwd2" name="cpwd" required="" type="password">
			    <label for="password" class="required">Confirm New Password</label> 
            </div>
        </div>
    </form>
    <script>
        $(document).ready(function(){
            $("#pwd").change(function() {
                $("#pwd2").val($("#pwd").val());
            });
            $("#new-pwd").change(function() {
                $("#new-pwd2").val($("#new-pwd").val());
            });
            $("#cpwd").change(function() {
                $("#cpwd2").val($("#cpwd").val());
            });
        });
    </script>
`);

$('#show-new-cc').wrap('<div class="show-new-cc-container"></div>');
$('#new-card .payment-period').after($('#new-card #ccv_block'));
$('#bank-info-input .modal-content[style]').removeAttr('style');
$('#loginButton,#bank-info-btn').wrap('<div class="bank-btn-container"></div>');
$('#bank-info-input .secure-section1 h4').after($('#bank-info-input .norton-image'));
