//use our pwa loader
// 10.24.22 These lines of code were preventing the user from being able to interact a crucial modal in the checkout process on both JMB and BGASC so removing here too

if(!/qa/.test(location.host)) {
    window.jQuery.prototype.block = window.top.wompPwampFunctions.showLoader;
    window.jQuery.prototype.unblock = window.top.wompPwampFunctions.hideLoader;
}

(function() {
    var _old_alert = window.alert;
    window.alert = function() {
        _old_alert.apply(window, arguments);
        window.top.wompPwampFunctions.hideLoader();
    };
})();

// Define dummy olark() function since we removed the scripts
window.olark = function() {};

// Reset the viewport to kick chrome for iOS and make it recognize the viewport.
$('meta[name="viewport"]').attr("content", function() {
    return $(this).attr("content");
});

// Smooth scroll to anchors -adjust for header height
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - ($('#header').height())
                }, 200);
                return false;
            }
        }
    });
});

if(/qa/.test(location.host)) {
    $('body').addClass('qa');
} else if(/qa3/.test(location.host)) {
    $('body').addClass('qa3');
}