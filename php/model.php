<?php
namespace Model;
use \PHPMailer\PHPMailer\PHPMailer;
use \PHPMailer\PHPMailer\SMTP;
use \PHPMailer\PHPMailer\Exception;
require 'vendor/phpmailer/src/Exception.php';
require 'vendor/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/src/SMTP.php';
require_once('connection.php');

function getData(){
	$intro = 'I am software engineer based in Athens, Greece who enjoys solving problems. I develop exceptional websites and web apps that provide intuitive, pixel-perfect user interfaces with efficient and modern backends.
	Shortly after graduating, I joined the engineering team at
	<a href="https://conferience.com" target="_blank" class="text--bold">Conferience</a>
	where I work on a wide variety of interesting and meaningful projects on a daily basis for the past 4 years.
	During this period i have also been working as a freelancer on
	<a href="https://upwork.com" target="_blank" class="text--bold">Upwork</a>.';
	return [
		'skills' =>  getSkills(),
		'education' => getEducation(),
		'experience' =>  getExperience(),
		'projects' => getProjects(),
		'intro' => $intro,
		'links' => getLinks(),
		'languages' => getLanguages(),
		'profile' => getProfile()
	];
}
function getSkills(){
	global $CONNECTION;
	$q = 'SELECT
	`Skills`.`id`,
	`Skills`.`text`,
	`Skills`.`icon`
	FROM `Skills`
	WHERE 1';
	$cq = $CONNECTION->prepare($q);
	if( $cq->execute() ){
		$o = $cq->fetchAll(\PDO::FETCH_ASSOC);
		return $o;
	}
	return NULL;
}
function getEducation(){
	global $CONNECTION;
	$q = 'SELECT
	`Education`.`id`,
	`Education`.`text`,
	`Education`.`title`,
	`Education`.`year`
	FROM `Education`
	WHERE 1';
	$cq = $CONNECTION->prepare($q);
	if( $cq->execute() ){
		return $cq->fetchAll(\PDO::FETCH_ASSOC);
	}
	return NULL;
}
function getExperience(){
	global $CONNECTION;
	$q = 'SELECT
	`Experience`.`id`,
	`Experience`.`text`,
	`Experience`.`title`,
	`Experience`.`year`,
	`Experience`.`link`
	FROM `Experience`
	WHERE 1';
	$cq = $CONNECTION->prepare($q);
	if( $cq->execute() ){
		return $cq->fetchAll(\PDO::FETCH_ASSOC);
	}
	return NULL;
}
function getProjects(){
	global $CONNECTION;
	$q = 'SELECT
	`Projects`.`id`,
	`Projects`.`title`,
	`Projects`.`logo`,
	`Projects`.`text`,
	`Projects`.`demoLink`,
	`Projects`.`gitLink`,
	`Projects`.`image`
	FROM `Projects`
	WHERE 1';
	$cq = $CONNECTION->prepare($q);
	if( $cq->execute() ){
		return $cq->fetchAll(\PDO::FETCH_ASSOC);
	}
	return NULL;
}
function sendMessage($name, $surname, $email, $message){
	$mail = new PHPMailer(true);
	$smtp = getenv('SMTP');
	$username = getenv('MAIL_USERNAME');
	$password = getenv('MAIL_PASS');
	try {
		$email = filter_var ( $email, FILTER_SANITIZE_EMAIL);
		$html = "<div>";
		$html .= "<br>Name: $name";
		$html .= "<br>Surname: $surname";
		$html .= "<br>Email: $email";
		$html .= "<br>Message: $message </div>";

		//Server settings
		$mail->isSMTP();                                //Send using SMTP
		$mail->Host       = $smtp;                     //Set the SMTP server to send through
		$mail->SMTPAuth   = true;                      //Enable SMTP authentication
		$mail->Username   = $username;                     //SMTP username
		$mail->Password   = $password;                               //SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
		$mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

		//Recipients
		$mail->setFrom($email, 'Mailer');
		$mail->addAddress($username, 'Recipient');     //Add a recipient

		//Content
		$mail->isHTML(true);                                  //Set email format to HTML
		$mail->Subject = 'Website contact me';
		$mail->Body    = $html;
		$mail->AltBody = strip_tags($html);

		$mail->send();
		return true;
	} catch (Exception $e) {
		return false;
	}
}
function getLinks(){
	return [
		'website'=> 'https://marioruci.com',
		'github'=> 'https://github.com/MRmarioruci',
		'linkedin' => 'https://www.linkedin.com/in/mario-ruci-a03689151/',
		'email' => 'marioruci15@gmail.com'
	];
}
function getLanguages(){
	return [
		'English',
		'Greek',
		'Albanian'
	];
}
function getProfile(){
	return [
		'image' => 'images/mario.jpg',
		'name' => 'Mario Ruci',
		'title' => 'Software Engineer',
		'address' => 'G.Gennimata 3 Athens(Greece)',
		'phone' => '(+31) 6949809063'
	];
}
?>
