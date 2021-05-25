<?php
header('Content-type: application/json');
require_once('model.php');

if( isset($_POST['action']) && ($_POST['action']=='getData') ){
	$res = Model\getData();
	if( $res === NULL ){
		echo json_encode(['status'=>'err']);
	}else if( $res ){
		echo json_encode(['status'=>'ok','data'=>$res]);
	}else{
		echo json_encode(['status'=>'ok','data'=>false]);
	}
}
if( isset($_POST['action']) && ($_POST['action']=='sendMessage') ){
	$res = Model\sendMessage($_POST['name'], $_POST['surname'], $_POST['email'], $_POST['message']);
	if( $res === NULL ){
		echo json_encode(['status'=>'err']);
	}else if( $res ){
		echo json_encode(['status'=>'ok','data'=>$res]);
	}else{
		echo json_encode(['status'=>'ok','data'=>false]);
	}
}
?>
