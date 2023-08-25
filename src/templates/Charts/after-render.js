var discountHtml = $('body.bitcoin-price .discount').html();
if (discountHtml) {
    $('body.bitcoin-price .discount').html(discountHtml.replace('As Low As:', 'From:'));
}