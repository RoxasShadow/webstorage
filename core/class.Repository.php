<?php
/**
	core/class.Repository.php
	(C) Giovanni Capuano 2011
*/
require_once('class.PersonalMessage.php');

/* Questa classe permette di gestire il proprio repository. */
class Repository extends PersonalMessage {

	/* Ottiene uno o più repository. */
	public function getRepository($path = '', $nickname = '') {
		if(($path !== '') && ($nickname !== ''))
			if($this->isRepository($path, $nickname))
				return ($result = parent::get("SELECT * FROM {$this->prefix}repository WHERE path='$path' AND nickname='$nickname' LIMIT 1")) ? $result : false;
			else
				return false;
		elseif(($path == '') && ($nickname !== ''))
			return ($result = parent::get("SELECT * FROM {$this->prefix}repository WHERE nickname='$nickname' ORDER BY id DESC")) ? $result : false;
		else
			return ($result = parent::get('SELECT * FROM '.$this->prefix.'repository ORDER BY id DESC')) ? $result : false;
	}
	
	/* Controlla se il file esiste. */
	public function isRepository($path, $nickname) {
		return parent::resultCountQuery("SELECT COUNT(*) FROM {$this->prefix}repository WHERE path='$path' AND nickname='$nickname'") > 0 ? true : false;
	}
	
	/* Controlla lo spazio disponibile per l'utente. */
	public function remainingStorage($nickname) {
		$storage = 0;
		$dir = opendir($this->config[0]->root_uploads.'/'.$nickname.'/');
		$f = array();
		while($file = readdir($dir))
			if(($file !== '.') && ($file !== '..'))
				$storage += parent::byteToMega(filesize($this->config[0]->root_uploads.'/'.$nickname.'/'.$file)); // Dimensione in mb di ogni file
		closedir($dir);
		return ($this->username[0]->storage - $storage);
	}
	
	/* Crea lo storage per un utente. */
	public function buildStorage($nickname) {
		if(!is_dir($this->config[0]->root_uploads.'/'.$nickname.'/'))
			mkdir($this->config[0]->root_uploads.'/'.$nickname.'/', 0700);
	}
	
	/* Crea un file. */
	public function createFile($array) {
		if(empty($array))
			return false;
		if(parent::isUser($array[0])) {
			$query = 'INSERT INTO '.$this->prefix.'repository(nickname, path, status, data, ora) VALUES(';
			foreach($array as $var)
				$query .= "'$var', ";
			$query = trim($query, ', ');
			$query .= ')';
			return parent::query($query) ? true : false;
		}
		return false;
	}
	
	/* Modifica un file. */
	public function editFile($campo, $valore, $path, $nickname) {
		return parent::query("UPDATE {$this->prefix}repository SET $campo='$valore' WHERE path='$path' AND nickname='$nickname' LIMIT 1") ? true : false;
	}
	
	/* Elimina un file. */
	public function deleteFile($path, $nickname) {
		if(($nickname == 'NULL') && ($path == 'NULL'))
			return false;
		parent::query("DELETE FROM {$this->prefix}repository WHERE path='$path' AND nickname='$nickname' LIMIT 1");
		if(file_exists($this->config[0]->root_uploads.'/'.$nickname.'/'.$path))
			unlink($this->config[0]->root_uploads.'/'.$nickname.'/'.$path);
		if((file_exists($this->config[0]->root_uploads.'/'.$nickname.'/'.$path)) || ($this->isRepository($path, $nickname)))
			return false;
		return true;
	}
	
	public function listFile($path, $repository, $own) {
		$list = array();
		$i = 0;
		foreach($repository as $v) {
			if(($v->status == 'private') && (!$own))
				continue;
			$list[$i]['nickname'] = $v->nickname;
			$list[$i]['path'] = $v->path;
			$list[$i]['status'] = $v->status;
			$list[$i]['downloads'] = $v->download;
			$list[$i]['visits'] = $v->visite;
			$list[$i]['date'] = (strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2)) == 'it') ? $v->data : parent::dataToDate($v->data);
			$list[$i]['hour'] = $v->ora;
			++$i;
		}
		return json_encode($list);
	}
	
	public function uploadFile($path, $upload) {
		if((empty($_FILES[$upload])) || (!is_array($_FILES[$upload])))
			return 'badrequest';
		if(is_uploaded_file($_FILES[$upload]["tmp_name"])) {
			if(file_exists($path.$_FILES[$upload]["name"]))
				return 'duplicate';
			if(!move_uploaded_file($_FILES[$upload]["tmp_name"], $path.$_FILES[$upload]["name"]))
				return 'error';
		}
		if(file_exists($path.$_FILES[$upload]["name"])) {
			chmod($path.$_FILES[$upload]["name"], 0000);
			return 'success';
		}
		return 'error';
	}
	
	public function mount($text) {
		return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="resources/css/style.css" />
	</head>
	<body style="background-color:#000;background-repeat:repeat;font-size:13px;">
	<div id="menu" style="padding-left:2px;">'.$text.'</div>
	</body>
	</html>';
	}
	
	public function purgeFileName($text) {
		return parent::purgeByXSS($text);
	}
	
	public function viewFile($file, $clear = false) {
		chmod($file, 0644);
		if(parent::is_text($file)) {
			header('Content-type: text/html');
			echo ($clear) ? parent::htmlentities(file_get_contents($file)) : $this->mount(nl2br(parent::htmlentities(file_get_contents($file))));
		}
		elseif(parent::is_image($file)) {
			header('Content-type: '.parent::getMime($file));
			echo file_get_contents($file);
		}
		else
			parent::downloadFile($file, $_GET['file']);
		chmod($file, 0000);
	}
	
	public function profileViewer($nickname, $force = false) {
		$user = parent::getUser($nickname);
		$profile = '{';
			$profile .= '"response": {';
				$profile .= '"id":'.json_encode($user[0]->id).',';
				$profile .= '"nickname":'.json_encode($user[0]->nickname).',';
				$profile .= '"grade":'.json_encode($user[0]->grado).',';
				if($force)
					$profile .= '"email":'.json_encode($user[0]->email).',';
				$profile .= '"date":'.json_encode($user[0]->data).',';
				$profile .= '"bio":'.json_encode($user[0]->bio).',';
				$profile .= '"avatar":'.json_encode($user[0]->avatar).',';
				$profile .= '"browsername":'.json_encode($user[0]->browsername).',';
				$profile .= '"browserversion":'.json_encode($user[0]->browserversion).',';
				$profile .= '"platform":'.json_encode($user[0]->platform).',';
				$profile .= '"storage":'.json_encode($user[0]->storage).',';
				$profile .= '"profile":'.json_encode($user[0]->profile).',';
				$profile .= '"language":'.json_encode($user[0]->language);
			$profile .= '}';
		$profile .= '}';
		return $profile;
	}
	
	public function follow($me, $you) {
		return parent::resultCountQuery("SELECT COUNT(*) FROM {$this->prefix}follow WHERE me='$me' AND you='$you'") > 0 ? true : false;
	}
	
	public function following($me) {
		return ($result = parent::get("SELECT * FROM {$this->prefix}follow WHERE me='$me' ORDER BY id DESC")) ? $result : false;
	}
	
	public function newFollow($me, $you) {
		$date = date('d-m-y');
		$hour = date('G:m:i');
		return parent::query("INSERT INTO {$this->prefix}follow(me, you, date, hour) VALUES('$me', '$you', '$date', '$hour')") ? true : false;
	}
	
	public function deleteFollow($me, $you) {
		return parent::query("DELETE FROM {$this->prefix}follow WHERE me='$me' AND you='$you' LIMIT 1") ? true : false;
	}
	
	public function changePassword($nickname, $password, $newpassword) {
		$user = parent::getUser($nickname);
		$actualpassword = $user[0]->password;
		$password = md5($this->salt.$password);
		if($actualpassword !== $password)
			return false;
		if(strlen($newpassword) <= 4)
			return false;
		return (parent::editUser('password', md5($this->salt.$newpassword), $nickname)) ? true : false;
	}
	
	public function getLive($nickname) {
		$follows = $this->following($nickname);
		if(!$follows)
			return false;
		$count = count($follows);
		$count = ($count > 10) ? round($count / 10) : 10;
		$tmp = array();
		$live = array();
		$i = 0;
		foreach($follows as $v) {
			$user = parent::getUser($v->you);
			if($user[0]->profile !== 'open')
				continue;
			$action = ($result = parent::get("SELECT * FROM {$this->prefix}repository WHERE nickname='{$v->you}' AND status='public' ORDER BY id DESC LIMIT $count")) ? $result : false;
			if(!$action)
				continue;
			$tmp[] = $action;
		}
		if(empty($tmp))
			return false;
		foreach($tmp as $v) {
			foreach($v as $f) {
				$live[$i]['nickname'] = $f->nickname;
				$live[$i]['path'] = $f->path;
				$live[$i]['date'] = (strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2)) == 'it') ? $f->data : parent::dataToDate($f->data);
				$live[$i]['hour'] = $f->ora;
				++$i;
			}
		}
		return $live;
	}	
}
