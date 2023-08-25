// Add arrow to login buttons
$('#jmlogin').addClass('right-arrow');

if (/^\/register/.test(location.pathname)) {
    $('#createaccountmodal').remove();
    $('a.log-in').attr('href', '/log-in/');
}

$('#jm_cust_phone').attr('type', 'tel');
$('#jm_cust_email').attr('type', 'email');

$('.order-steps .steps p').addClass('summaryp').insertBefore($('.order-steps'));

// Remove inline styles
$('#nfalertportal').removeAttr('style');