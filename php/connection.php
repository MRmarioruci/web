<?php
$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$ssl_ca = getenv('DB_SSL_CA');

try {
	$options = [];
	if( $ssl_ca ){
		$options[PDO::MYSQL_ATTR_SSL_CA] = $ssl_ca;
	}
	$CONNECTION = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4;names=utf8mb4", $user, $pass, $options);
} catch (PDOException $e) {
	die();
}
?>
