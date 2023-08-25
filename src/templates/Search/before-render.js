$('.price-chart-heading, .price2col_rgt').addClass('norm');
$('.chart-block, #chartlinkblocks, ul.world-price-links').addClass('flex');

var searchForm = $('form[role="search"]:not(#searchform)');
searchForm.removeAttr('style');
searchForm.find('.input-text').removeAttr('id'); // Prevent 'clear on focus' listener from attaching
$('div.right-cont').prepend(searchForm);

$('.breadcrumb-area').remove();