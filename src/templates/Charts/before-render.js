$('.price-chart-heading, .price2col_rgt').addClass('norm');
$('.chart-block, #chartlinkblocks, ul.world-price-links').addClass('flex');

if($('#chartlinkblocks>*').length>3){
    $('#chartlinkblocks').addClass('four');
}else{
    $('#chartlinkblocks').addClass('three');
}

$('.add-to-cart').removeAttr('style');
$('input[name="quantity"]').attr('placeholder', 'QTY: 1');

$('.metal_price_alerts').removeAttr('style');
