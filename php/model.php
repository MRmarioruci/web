<?php
namespace Model;
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
	$message = filter_var ( $message, FILTER_SANITIZE_STRING);
	$email = filter_var ( $email, FILTER_SANITIZE_EMAIL);
	$html = "<div>";
	$html .= "<br>Name: $name";
	$html .= "<br>Surname: $surname";
	$html .= "<br>Email: $email";
	$html .= "<br>Message: $message";
	mail("marioruci15@gmail.com","Website contact", $html);
	return true;
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
