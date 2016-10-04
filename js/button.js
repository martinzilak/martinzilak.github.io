$(function() {
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
    $("#contact_form").submit(function() {
	  var counter = 0;
	  // validate and process form here
		  
	  $("input").removeClass("glowing-input");
	  $("textarea").removeClass("glowing-input");
	  var message = $("textarea#message").val();
		if (message == "") {
		$("textarea#message").addClass("glowing-input");
		$("textarea#message").focus();
		counter += 1;
	  }
	  var subject = $("input#subject").val();
		if (subject == "") {
		$("input#subject").addClass("glowing-input");
		$("input#subject").focus();
		counter += 1;
	  }
	  var email = $("input#email").val();
		if (email.length < 5 || !emailRegex.test(email)){
		$("input#email").addClass("glowing-input");
		$("input#email").focus();
		counter += 1;
	  }
	  var name = $("input#name").val();
		if (name == "") {
		$("input#name").addClass("glowing-input");
		$("input#name").focus();
		counter += 1;
	  }

	  if (counter > 0) {
	    return false;
	  }
		
	  // ajax
	   $.ajax({
		 type: "POST",
		 url: "send_email.php",
		 data: {'name': name, 'email': email, 'subject': subject, 'message': message},
		 success: function (response) {
		    //display message back to user here
			$('#send_status').html("<div id='status'>"+ response +"<br></div>");
			//clear the form
			$('#contact_form').find(':input').each(function() {
				switch(this.type) {
					case 'text':
					case 'textarea':
						$(this).val('');
						break;
				}
			});
		 }
	   });
	   return false;
	   
	
    });
	
	$("input#email").keyup(function(){
		if(emailRegex.test($(this).val())){
			$(this).removeClass("glowing-input");
		}
	});
	$("input#email").change(function(){
		if(!emailRegex.test($(this).val())){
			$(this).addClass("glowing-input");
		}
	});
	$("input#name").keyup(function(){
		if($(this).val().length >= 1){
			$(this).removeClass("glowing-input");
		}
	});
	$("input#subject").keyup(function(){
		if($(this).val().length >= 1){
			$(this).removeClass("glowing-input");
		}
	});
	$("textarea").keyup(function(){
		if($(this).val().length >= 1){
			$(this).removeClass("glowing-input");
		}
	});
});