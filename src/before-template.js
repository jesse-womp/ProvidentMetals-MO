//name the pages for incidental styles
var url = $(location).attr('href');
var filename = url.substring(url.lastIndexOf('.com/')+5).replace(/\//g, ' ').replace('.html', '').replace('#', ' ').replace('?', ' ');
if (filename==='') {
    $('body').addClass('home');
} else if (!/log-in|register/.test(filename)) {
    $('body').addClass(filename);
}

$('.spot-prices').hide();
$('.footer').remove();
$('.right-cont, .contact-sidebar').removeAttr('style');

// Remove olark chat widget from mobile optimize pages (already in PWA)
$('script:contains(olark),script[src*="olark"]').remove();
