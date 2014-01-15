<?php
$id = ((isset($_GET['id'])) && is_numeric($_GET['id'])) ? (int)$_GET['id'] : '';
$status = '';

$error = array(
	400 => array(
		'400',
		'Bad Request',
		'Your browser sent a request that this server could not understand.'
	),
	402 => array(
		'402',
		'Access Denied',
		'You are not authorized to access in this page.'
	),
	403 => array(
		'403',
		'Forbidden',
		'You are not authorized to access in this page.'
	),
	404 => array(
		'404',
		'Not Found',
		'The page you requested was not found.'
	),
	500 => array(
		'500',
		'Internal Server Error',
		'Internal server error.'
	),
	503 => array(
		'503',
		'Service Temporarily Unavailable',
		'The server cannot process your request right now.'
	),
	999 => array(
		'402',
		'Access Denied',
		'Invalid token. Access denied.'
	)
);

if(isset($error[$id])) {
	header("HTTP/1.1 $id {$error[$id][1]}", 1);
	header("HTTP/1.1 $id {$error[$id][1]}", 1);
	$status = $error[$id][2];
}

echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Error '.$id.'</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="http://localhost/webstorage/resources/css/error.css" />
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" />
<script type="text/javascript" src="http://localhost/webstorage/resources/js/jquery.js"></script>
<script type="text/javascript" src="http://localhost/webstorage/resources/js/shuffleLetters.js"></script>
<script type="text/javascript">$(document).ready(function(){$(\'#container\').shuffleLetters({text:$(\'#error\').val()})});</script>
</head>
<body>
	<div id="container"></div>
	<div id="mainpage"><a href="http://localhost/webstorage/" title="Return to main page.">Return to main page.</a></div>
	<input type="text" class="hidden" id="error" value="Error '.$id.': '.$status.'" readonly />
</body>
</html>';
