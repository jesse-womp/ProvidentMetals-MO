$('.wpcf7-form div:contains("How would you like us to contact you?")').addClass('contact-method');
var contactTextNode = $('.contact-method').contents().filter(function() {
    return this.nodeType == Node.TEXT_NODE;
});
if (contactTextNode.length > 0)
    contactTextNode.wrap('<span class="contact-method-text"></span>');

// Remove inline attributes
$('.new-input').removeAttr('style');
$('.contact-method').removeAttr('style');

// Remove unnecessary elements
$('.wpcf7-form br').remove();