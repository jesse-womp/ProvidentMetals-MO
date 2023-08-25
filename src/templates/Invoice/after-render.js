// Watch for an error message and scroll to it if one appears
(function() {
    var moNode = document.querySelector('.woocommerce-error');
    if (!moNode)
        return;

    var moConfig = { childList: true };
    var moCallback = function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.addedNodes.length > 0) {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                    var addedNode = mutation.addedNodes[j];
                    if (addedNode.tagName === 'LI') {
                        window.top.scroll(0, 0);
                    }
                }
            }
        }
    };
    var mo = new MutationObserver(moCallback);
    mo.observe(moNode, moConfig);
})();