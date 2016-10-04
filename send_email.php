<?php
 header('Content-Type: text/plain');

if(isset($_POST['email'])) {
 
     
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "martin@zilak.sk";
 
    $email_subject = "zilak.sk CF: " . $_POST['subject'];
 
     
 
    function died() {
 
        // your error code can go here
 
        echo("<h3 class='mail-error'>Your email hasn't been sent</h3>");
        
		die("message");
 
    }
 
    // validation expected data exists
 
    if(!isset($_POST['name']) ||
 
        !isset($_POST['subject']) ||
 
        !isset($_POST['email']) ||
 
        !isset($_POST['message'])) {
 
        died();       
 
    }
 
     
 
    $name = $_POST['name']; // required
 
    $subject = $_POST['subject']; // required
 
    $email_from = $_POST['email']; // required
  
    $message = $_POST['message']; // required
 
     
 
    $is_okay = True;
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/';
 
	if(!preg_match($email_exp,$email_from)) {

		$is_okay = False;

	}

	if(strlen($name) < 1) {
	
		$is_okay = False;
	
	}

	if(strlen($message) < 1) {

		$is_okay = False;

	}
	
	if(strlen($subject) < 1) {
	
		$is_okay = False;
	
	}

	if($is_okay == False) {

		died();

	}
 
         
 
    function clean_string($string) {
 
		$bad = array("content-type","bcc:","to:","cc:","href");

		return str_replace($bad,"",$string);
 
    }
 
     
	
    $email_message = "Name: ".clean_string($name)."\n";
 
    $email_message .= "Email: ".clean_string($email_from)."\n";
 
    $email_message .= "Subject: ".clean_string($subject)."\n\n";
 
    $email_message .= "Message: \n".clean_string($message)."\n";
 
     
 
     
 
	// create email headers
	 
	$headers = 'From: '.$email_from."\r\n".
	 
	'Reply-To: '.$email_from."\r\n" .
	 
	'X-Mailer: PHP/' . phpversion();
	 
	mail($email_to, $email_subject, $email_message, $headers); 

	echo "<h3 class='mail-success'>Your email has been sent successfully</h3>" ;
 
}
 
//header('Location: http://test.zilak.sk/#contact');
 
?>