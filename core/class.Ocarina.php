<?php
/**
	core/class.Ocarina.php
	(C) Giovanni Capuano 2011
*/
require_once('class.Repository.php');
//error_reporting(0);
header('Content-Type: text/html; charset=UTF-8');

/* Istanziando questa classe, è possibile usufruire di tutti i metodi e attributi delle sottoclassi facenti parte del core. */
class Ocarina extends Repository {
	public function __construct() {
		parent::__construct();
		if(session_id() == '')
			session_start();
	}
	
	public function generate_token() {
		$lifetime = 3600;
		if((isset($_SESSION['token-id'])) && (isset($_SESSION['token-time'])) && ((time() - $_SESSION['token-time']) <= $lifetime))
			return $_SESSION['token-id'];
		$array = array();
		$str = '';
		$num = 10;
		for($i=0; $i<$num; $i++)
			$array[$i] = chr(rand(97, 122));
		for($i=0; $i<$num; $i++)
			$str .= $array[$i];
		$str = md5(md5((isset($_SESSION['token-id'])) ? $_SESSION['token-id'].$str : $str));
		$_SESSION['token-id'] = $str;
		$_SESSION['token-time'] = time();
		return $str;
	}
}
