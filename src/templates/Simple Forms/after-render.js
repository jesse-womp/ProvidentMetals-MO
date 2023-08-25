$('.link a[href="/featured/trending-now-top-products.html"]').text('Sell').attr('href','https://www.providentmetals.com/sell-to-us.html');

/* JGW - changed window.location.href to  window.top.location.href for iFrame compatibility in PWA */
// if (/^\/log-in/.test(location.pathname) && !/^qa/.test(location.host)) {

//     jQuery( document ).ready(function($){    
//          /* login form submitted */
//     	jQuery('#jmlogin').off().on("click", function(e){
//             e.preventDefault();
     
//     		jQuery('#jm_message').hide();
//     		var user_email = jQuery('#jm_user_email').val().trim();
//     		var user_password = jQuery('#jm_user_password').val().trim();
//     		var redirect =  jQuery('#loginpage').val().trim();
//             if (window.location.hash)
//                 redirect = redirect + window.location.hash;
//     		if( user_email == '' ) {
//     			jQuery('#jm_message').fadeIn("slow");
//      			jQuery("#jm_message").html("Please enter your email");
//     			jQuery('#jm_user_email').focus();
//     			return false;
//     		}
    
//     		if( user_password == '' ) {
//     			jQuery('#jm_message').fadeIn("slow");
//     			jQuery("#jm_message").html("Please enter your password");
//     			jQuery('#jm_user_password').focus();
//     			return false;
//     		}
      
//     		var parms = '&id=jm-ajaxlogin&';
    		
//     		parms +=jQuery("#jm-login-form").serialize();
    
//     		jQuery.ajax({
//     		   type: "POST",
//     		   url: templateUrl+"/includes/login.php",
//     		   data: parms,
//     		   success: function(msg){
//     				var parsedMsg = parseInt(msg);
//     				if(parsedMsg==1){
//     					 window.top.location.href = redirect;
//     				}
//     				else{
//     					jQuery('#jm_message').fadeIn("slow");
//     					jQuery('#jm_message').html(msg);
//     				}
//     		   }
//     		});
    
//     		return false;
//     	});
    	
//     });
// }