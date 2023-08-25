ultraSliderAfter : function(selector){
    var arrows = true;

//load hammer
wompLib.hammerSelector = selector;

$.ajax({
  //url: "https://wompme.blob.core.windows.net/6134/hammer-2.0.4.min.js",
  url: "https://wompme.blob.core.windows.net/7412/hammer.min.js", //upgrade to 2.0.6.
  dataType: "script",
  success: function(){
            selector = wompLib.hammerSelector;
            womp$(selector).each(function(){
            womp$(this).removeAttr('width').removeAttr('height');
            womp$(this).find('*').removeAttr('width').removeAttr('height');
            var p = womp$(this).wrap('<li class="pane">').parent();
            womp$('#carousel #panes').append(p);
        });
        
         /**
         * requestAnimationFrame and cancel polyfill
         */
        (function () {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                            timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
        }());


        /**
        * super simple carousel
        * animation between panes happens with css transitions
        */
        function Carousel(element) {
            var self = this;
            element = womp$(element);
            //document.getElementById('my-image').ondragstart = function() { return false; };
            womp$(element).find('img').bind('dragstart', function(){return false;});
            var container = womp$(">ul", element);
            var panes = womp$(">ul>li", element);

            var pane_width = 0;
            var pane_count = panes.length;
            this.pane_count = function(){return pane_count;};
            
            var current_pane = 0;
            this.current_pane = function(){return current_pane;};
             
            this.hasBeenSlid = false;
            if(pane_count<2){
                this.hasBeenSlid =true;
                arrows = false;
                panes.css('margin', '0');
            }

            /**
             * initial
             */
            this.init = function () {
                setPaneDimensions();

                womp$(window).on("load resize orientationchange", function () {
                    setPaneDimensions();
                    //updateOffset();
                })

                if(pane_count > 0 && arrows){
                    //add some navigation arrows
                    element.after("<div class='arrowNav next wm_icon-keyboard-arrow-right' onclick='carousel.hasBeenSlid = true; carousel.next()' >  </div>");
                    element.after("<div class='arrowNav prev wm_icon-keyboard-arrow-left' onclick='carousel.hasBeenSlid = true; carousel.prev()' >  </div>");

                }
            };

            /**
             * set the pane dimensions and scale the container
             */
            function setPaneDimensions() {
                pane_width = element.width() - 0;
                panes.each(function (index) {
                    // womp$(this).width(pane_width);
                    womp$(this).attr('data-index', index);
                });
                // container.width(pane_width * pane_count);
                console.log(pane_count-1);
                // womp$('.pane[data-index="'+ (pane_count-1) +'"]').prependTo( womp$('#panes')); /* Removed as per MOB-93 */
            }

            /**
             * show pane by index
             * @param   {Number}    index
             */
            this.showPane = function (index) {
               womp$('.pane[data-index="'+ (index) +'"]').prependTo( womp$('#panes'));
               if(index>0){
                   womp$('.pane[data-index="'+ (index-1) +'"]').prependTo( womp$('#panes'));
                   panes.each(function(){
                       if(womp$(this).attr('data-index')>index){
                           $(this).appendTo( womp$('#panes'));
                       }
                   });
                   panes.each(function(){
                       if(womp$(this).attr('data-index')<index-1){
                           $(this).appendTo( womp$('#panes'));
                       }
                   });
                  
               } else {
                   womp$('.pane[data-index="'+ (pane_count-1) +'"]').prependTo( womp$('#panes'));
                   panes.each(function(){
                       if(womp$(this).attr('data-index')!=index && womp$(this).attr('data-index')!=pane_count-1){
                           $(this).appendTo( womp$('#panes'));
                       }
                   });
               }
            };
            
            this.next = function () { 
                container.animate({marginLeft: "-100%"}, 400, function() {
                    container.find('.pane:first-child').appendTo( container );
                    container.find('.pane:first-child').appendTo( container );
                    container.animate({marginLeft: "0"}, 0);
                });

                };
            this.prev = function () {
                container.animate({marginLeft: "100%"}, 400, function() {
                    container.find('.pane:last-child').prependTo( container );
                    container.find('.pane:last-child').prependTo( container );
                    container.animate({marginLeft: "0"}, 0);
                });
            };
            


            function handleHammer(ev) {
                //console.log(ev);

                if(window.carousel) window.carousel.hasBeenSlid = true;
                // disable browser scrolling
               ev.preventDefault();

                switch (ev.type) {
                    case 'panright':
                    case 'panleft':
                        // stick to the finger
                        // var pane_offset = -(100 / pane_count) * womp$('#panes #active').index();
                        var drag_offset = ev.deltaX/4;
                        console.log(drag_offset);

                        container.css("margin-left", drag_offset + "%");
                        break;


                    case 'panend':
                        // more then 50% moved, navigate
                   
                        if (Math.abs(ev.deltaX) > pane_width *0.05) {
                            if (ev.direction == 'right' || ev.direction == 4) {
                                self.prev();
                            } else {
                                self.next();
                            }
                        }
                        else {
                            container.css("margin-left", '0');
                        }
                        break;
                }
            }
             
            new Hammer(element[0]).on("panend panleft panright swipeleft swiperight", handleHammer);
            
        }
        
        window.carousel = new Carousel("#carousel");
        window.carousel.init();
      
    }
});

}
