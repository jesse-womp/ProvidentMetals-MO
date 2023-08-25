ReturnTop : function(style){
    var returnToTop = $('a#wm_returnToTop');
    
    if(style=='tab') {
        returnToTop.addClass('tab');
    } else if (style =='circle') {
        returnToTop.addClass('circle');
    }
    
    function handleScroll() {
        // Slide Out Tab Style
        console.log('top:' + window.top.scrollY);
            if (window.top.scrollY < 600){
                returnToTop.css('right', '-40px');
            } else {
                returnToTop.css('right', '0px');
            }
        
      
    }
    
    // Create Listener
    $(document).bind("scroll", handleScroll);
    
    // Button Behavior
    returnToTop.click(function(event){
        event.preventDefault();
        window.top.scroll(0,0)
        return false;
    });
}