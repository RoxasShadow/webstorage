<?php
if(!isset($_GET['request'])) {
	include('resources/lib/mustache.php');
	$mustache = new Mustache;
	echo $mustache->render(file_get_contents('api.tpl'));
	unset($mustache);
	die();
}
require_once('core/class.Ocarina.php');
$ocarina = new Ocarina();
$action = ((isset($_GET['request'])) && (trim($_GET['request']) !== '')) ? $ocarina->purge($_GET['request']) : dieWithStyle($ocarina, 'badrequest');
$token = ((isset($_GET['token'])) && (trim($_GET['token']) !== '')) ? $ocarina->purge($_GET['token']) : '';
$logged = ($ocarina->isLogged()) ? true : false;
$storage = 20; // Spazio (in mb) per gli utenti registrati

function uploadFileAjax($path) {
        $input = fopen("php://input", "r");
        $temp = tmpfile();
        $realSize = stream_copy_to_stream($input, $temp);
        fclose($input);
        
        $target = fopen($path, "w");        
        fseek($temp, 0, SEEK_SET);
        stream_copy_to_stream($temp, $target);
        fclose($target);
        
        return true;
}

$writemode = array('uploader', 'changestatus', 'deleter', 'editprofile', 'sendpm', 'register');
for($i=0, $count=count($writemode); $i<$count; ++$i)
	if(($writemode[$i] == $action) && ($token !== $ocarina->generate_token())) {
		if($ocarina->config[0]->log == 1)
			$ocarina->log('', 'Invalid token -> '.var_dump($_GET));		
		dieWithStyle($ocarina, 'invalidtoken');
		return;
	}

function dieWithStyle($ocarina, $text) {
	unset($ocarina);
	die($text);
}

if($action == 'token') {
	dieWithStyle($ocarina, $ocarina->generate_token());
}
elseif($action == 'checktoken') {
	dieWithStyle($ocarina, ($token == $ocarina->generate_token()) ? 'true' : 'false');
}
elseif($action == 'captcha') {
	$security_code = substr(md5(rand(0,999)), 15, 5);
	$_SESSION['sec'] = $security_code;
	$width = 228;
	$height = 20;
	$image = ImageCreate($width, $height);
	$font = ImageColorAllocate($image, 255, 255, 255);
	$background = ImageColorAllocate($image, 35, 95, 175);
	$line = ImageColorAllocate($image, 204, 204, 204);
	ImageFill($image, 0, 0, $background);
	ImageString($image, 3, $width/2.5+10, 3, $security_code, $font);
	ImageRectangle($image,0,0,$width-1,$height-1,$line);
	imageline($image, 0, $height/2, $width, $height/2, $line);
	imageline($image, $width/2, 0, $width/2, $height, $line);
	header('Content-Type: image/jpeg');
	ImageJpeg($image);
	ImageDestroy($image);
	unset($line, $background, $font, $image, $ocarina);
	exit();
}
elseif($action == 'availablestoragespace') {
	if($logged)
		if($ocarina->remainingStorage($ocarina->username[0]->nickname) == '')
			dieWithStyle($ocarina, '0');
		else
			dieWithStyle($ocarina, (string)$ocarina->remainingStorage($ocarina->username[0]->nickname));
	else
		dieWithStyle($ocarina, 'denied');
}
elseif($action == 'changestatus') {
	$file = ((isset($_GET['file'])) && (trim($_GET['file']) !== '')) ? $ocarina->purgeFileName($_GET['file']) : dieWithStyle($ocarina, 'badrequest');
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	if(($ocarina->isUser($nickname)) && ($repository = $ocarina->getRepository($file, $nickname)))
		if(($logged) && ($nickname == $ocarina->username[0]->nickname) && ($repository[0]->nickname == $nickname))
			if($repository[0]->status == 'public')
				if($ocarina->editFile('status', 'private', $file, $nickname))
					dieWithStyle($ocarina, 'success');
				else
					dieWithStyle($ocarina, 'error');
			elseif($repository[0]->status == 'private')
				if($ocarina->editFile('status', 'public', $file, $nickname))
					dieWithStyle($ocarina, 'success');
				else
					dieWithStyle($ocarina, 'error');
			else
				dieWithStyle($ocarina, 'error');
		else
			dieWithStyle($ocarina, 'denied');
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'countunreadedpm') {
	if(!$logged)
		dieWithStyle($ocarina, 'denied');
	elseif(($count = $ocarina->countPM()) && ($count >= 0))
		dieWithStyle($ocarina, (string)$count);
	else
		dieWithStyle($ocarina, '0');
}
elseif($action == 'deletefollow') {
	$you = ((isset($_GET['you'])) && (trim($_GET['you']) !== '')) ? $ocarina->purge($_GET['you']) : dieWithStyle($ocarina, 'badrequest');
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	if(!$logged)
		dieWithStyle($ocarina, 'denied');
	elseif($you == $nickname)
		dieWithStyle($ocarina, 'same');
	elseif(!$ocarina->isUser($you))
		dieWithStyle($ocarina, 'notfound');
	elseif(!$ocarina->follow($nickname, $you))
		dieWithStyle($ocarina, 'notfollow');
	elseif($ocarina->deleteFollow($nickname, $you)) {
		if($ocarina->config[0]->log == 1)
			$ocarina->log($nickname, "Not following $you.");
		dieWithStyle($ocarina, 'success');
	}
	else
		dieWithStyle($ocarina, 'error');
}
elseif($action == 'deleter') {
	$file = ((isset($_GET['file'])) && (trim($_GET['file']) !== '')) ? $ocarina->purgeFileName($_GET['file']) : dieWithStyle($ocarina, 'badrequest');
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	if(($ocarina->isUser($nickname)) && ($repository = $ocarina->getRepository($file, $nickname)))
		if(($logged) && ($nickname == $ocarina->username[0]->nickname) && ($repository[0]->nickname == $nickname))
			if($ocarina->deleteFile($file, $nickname)) {
				if($ocarina->config[0]->log == 1)
					$ocarina->log($ocarina->username[0]->nickname, "`$file` deleted.");
				dieWithStyle($ocarina, 'success');
			}
			else
				dieWithStyle($ocarina, 'error');
		else
			dieWithStyle($ocarina, 'denied');
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'downloader') {
	$file = ((isset($_GET['file'])) && (trim($_GET['file']) !== '')) ? $ocarina->purgeFileName($_GET['file']) : dieWithStyle($ocarina, 'badrequest');
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : dieWithStyle($ocarina, 'badrequest');
	
	if(($ocarina->isUser($nickname)) && ($repository = $ocarina->getRepository($file, $nickname)))
		if(($user = $ocarina->getUser($nickname)) && ($user[0]->profile == 'close'))
			if(($logged) && ($user[0]->nickname == $ocarina->username[0]->nickname)) {
				chmod($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, 0644);
				$ocarina->downloadFile($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, $file);
				chmod($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, 0000);
			}
			else
				dieWithStyle($ocarina, 'denied');
		elseif($repository[0]->status == 'private')
			if(($logged) && ($nickname == $ocarina->username[0]->nickname) && ($repository[0]->nickname == $nickname)) {
				chmod($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, 0644);
				$ocarina->downloadFile($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, $file);
				chmod($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, 0000);
			}
			else
				dieWithStyle($ocarina, 'denied');
		else {
			if((!$logged) || ($nickname !== $ocarina->username[0]->nickname))
				$ocarina->editFile('download', $repository[0]->download + 1, $file, $nickname);
			chmod($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, 0644);
			$ocarina->downloadFile($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, $file);
			chmod($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, 0000);
		}
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'editprofile') {
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	$email = ((isset($_GET['email'])) && (trim($_GET['email']) !== '')) ? $ocarina->purge($_GET['email']) : '';
	$bio = ((isset($_GET['bio'])) && (trim($_GET['bio']) !== '')) ? $ocarina->purge($_GET['bio']) : '';
	$avatar = ((isset($_GET['avatar'])) && (trim($_GET['avatar']) !== '')) ? $ocarina->purge($_GET['avatar']) : '';
	$password = ((isset($_GET['password'])) && (trim($_GET['password']) !== '')) ? $ocarina->purge($_GET['password']) : '';
	$newpassword = ((isset($_GET['newpassword'])) && (trim($_GET['newpassword']) !== '')) ? $ocarina->purge($_GET['newpassword']) : '';
	$status = ((isset($_GET['status'])) && (trim($_GET['status']) !== '') && (($_GET['status'] == 'open') || ($_GET['status'] == 'close'))) ? $ocarina->purge($_GET['status']) : 'open';
	
	if($ocarina->isUser($nickname))
		if(($logged) && ($nickname == $ocarina->username[0]->nickname))
			if(($ocarina->editUser('email', $email, $nickname)) && ($ocarina->editUser('bio', $bio, $nickname)) && ($ocarina->editUser('avatar', $avatar, $nickname)) && ($ocarina->editUser('profile', $status, $nickname))) {
				$changepassword = false;
				if(($password !== '') && ($newpassword !== '')) {
					if(!$ocarina->changePassword($nickname, $password, $newpassword))
						dieWithStyle($ocarina, 'invalidpassword');
					else
						$changepassword = true;
				}
				if($ocarina->config[0]->log == 1)
					$ocarina->log($ocarina->username[0]->nickname, 'Profile modificated.');
				if($changepassword) {
					if($ocarina->config[0]->log == 1)
						$ocarina->log($nickname, 'Logged out.');
					$ocarina->logout();
				}
				dieWithStyle($ocarina, 'success');
			}
			else
				dieWithStyle($ocarina, 'error');
		else
			dieWithStyle($ocarina, 'denied');
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'following') {
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	$following = $ocarina->following($nickname);
	for($i=0, $count=count($following); $i<$count; ++$i)
		$following[$i]->date = $ocarina->dataToDate($following[$i]->date);
	dieWithStyle($ocarina, json_encode($following));
}
elseif($action == 'isfollowing') {
	$you = ((isset($_GET['you'])) && (trim($_GET['you']) !== '')) ? $ocarina->purge($_GET['you']) : dieWithStyle($ocarina, 'badrequest');
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	if($you == $nickname)
		dieWithStyle($ocarina, 'same');
	elseif(!$ocarina->isUser($you))
		dieWithStyle($ocarina, 'notfound');
	elseif(!$ocarina->follow($nickname, $you))
		dieWithStyle($ocarina, 'notfollowing');
	else
		dieWithStyle($ocarina, 'following');
}
elseif($action == 'getlive') {
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	$live = $ocarina->getLive($nickname);
	if(!$live)
		dieWithStyle($ocarina, 'notfound');
	dieWithStyle($ocarina, json_encode($live));
}
elseif($action == 'getonlineusers') {
	dieWithStyle($ocarina, json_encode($ocarina->getUserOnline()));
}
elseif($action == 'getonlinevisitators') {
	dieWithStyle($ocarina, (string)$ocarina->getVisitatorOnline());
}
elseif($action == 'getpm') {
	$id = ((isset($_GET['id'])) && is_numeric($_GET['id'])) ? (int)$_GET['id'] : '';

	if(!$logged)
		dieWithStyle($ocarina, 'denied');
	elseif($id == '')
		dieWithStyle($ocarina, json_encode($ocarina->getPM('', $ocarina->username[0]->nickname)));
	elseif(($id !== '') && ($pm = $ocarina->getPM($id, $ocarina->username[0]->nickname)) && ($pm[0]->receiver == $ocarina->username[0]->nickname)) {
		$ocarina->readedPM($id);
		dieWithStyle($ocarina, json_encode($pm));
	}
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'getuser') {
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : '';

	if($nickname == '')
		dieWithStyle($ocarina, json_encode($ocarina->getUser()));
	elseif(($logged) && ($nickname == $ocarina->username[0]->nickname) && ($ocarina->isUser($nickname)) && ($user = $ocarina->profileViewer($nickname, true)))
		dieWithStyle($ocarina, $user);
	elseif(($nickname !== '') && ($ocarina->isUser($nickname)) && ($user = $ocarina->profileViewer($nickname)))
		dieWithStyle($ocarina, $user);
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'info') {
	$file = ((isset($_GET['file'])) && (trim($_GET['file']) !== '')) ? $ocarina->purgeFileName($_GET['file']) : '';
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : '';

	if(($file !== '') && ($nickname !== ''))
		if(($ocarina->isUser($nickname)) && ($repo = $ocarina->getRepository($file, $nickname)))
			dieWithStyle($ocarina, json_encode($repo));
		else
			dieWithStyle($ocarina, 'notfound');
	if($logged)
		dieWithStyle($ocarina, json_encode($ocarina->username[0]));
	else
		dieWithStyle($ocarina, 'denied');
}
elseif($action == 'list') {
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : dieWithStyle($ocarina, 'badrequest');
	$own = (($logged) && ($nickname == $ocarina->username[0]->nickname)) ? true : false;

	if(($ocarina->isUser($nickname)) && ($repository = $ocarina->getRepository('', $nickname)))
		dieWithStyle($ocarina, $ocarina->listFile($ocarina->config[0]->root_uploads.'/'.$nickname, $repository, $own));
	else
		dieWithStyle($ocarina, 'notfound');
}
elseif($action == 'login') {
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : dieWithStyle($ocarina, 'badrequest');
	$password = ((isset($_GET['password'])) && (trim($_GET['password']) !== '')) ? $ocarina->purge($_GET['password']) : dieWithStyle($ocarina, 'badrequest');
	$language = ((isset($_GET['language'])) && (trim($_GET['language']) !== '')) ? $ocarina->purge($_GET['language']) : dieWithStyle($ocarina, 'badrequest');

	if($logged)
		dieWithStyle($ocarina, 'alreadylogged');
	else
		if(($ocarina->isUser($nickname)) && ($ocarina->login($nickname, $password, strtolower(substr($language, 0, 2))))) {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($nickname, 'Logged in.');
			dieWithStyle($ocarina, 'success');
		}
		else {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($nickname, 'Login failed.');
			dieWithStyle($ocarina, 'error');
		}
}
elseif($action == 'logout') {
	if(!$logged)
		dieWithStyle($ocarina, 'notlogged');
	$nickname = $ocarina->username[0]->nickname;
	$ocarina->logout();
	if($ocarina->config[0]->log == 1)
		$ocarina->log($nickname, 'Logged out.');
	dieWithStyle($ocarina, 'success'); // It can't fail :D
}
elseif($action == 'mailvalidator') {
	$code = ((isset($_GET['code'])) && (trim($_GET['code']) !== '')) ? $ocarina->purge($_GET['code']) : dieWithStyle($ocarina, 'badrequest');

	if($logged)
		dieWithStyle($ocarina, 'alreadylogged');
	elseif($ocarina->config[0]->validazioneaccount == 0)
		dieWithStyle($ocarina, 'notneed');
	elseif(!$ocarina->username = $ocarina->searchUserByField('codiceregistrazione', $code)) {
		if($ocarina->config[0]->log == 1)
			$ocarina->log('~', 'Invalid validation code.');
		dieWithStyle($ocarina, 'invalid');
	}
	elseif($ocarina->username[0]->codiceregistrazione == $code)
		if($ocarina->editUser('codiceregistrazione', '', $ocarina->username[0]->nickname)) {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($ocarina->username[0]->nickname, 'Account validated.');
			$ocarina->buildStorage($ocarina->username[0]->nickname);
			dieWithStyle($ocarina, 'success');
		}
		else {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($ocarina->username[0]->nickname, 'Error during account validation.');
			dieWithStyle($ocarina, 'error');
		}
	else {
		if($ocarina->config[0]->log == 1)
			$ocarina->log($ocarina->username[0]->nickname, 'Error during account validation.');
		dieWithStyle($ocarina, 'error');
	}
}
elseif($action == 'newfollow') {
	$you = ((isset($_GET['you'])) && (trim($_GET['you']) !== '')) ? $ocarina->purge($_GET['you']) : dieWithStyle($ocarina, 'badrequest');
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, 'badrequest');
	
	if($you == $nickname)
		dieWithStyle($ocarina, 'same');
	elseif(!$ocarina->isUser($you))
		dieWithStyle($ocarina, 'notfound');
	elseif($ocarina->follow($nickname, $you))
		dieWithStyle($ocarina, 'duplicate');
	elseif($ocarina->newFollow($nickname, $you)) {
		if($ocarina->config[0]->log == 1)
			$ocarina->log($nickname, "Following $you.");
		dieWithStyle($ocarina, 'success');
	}
	else
		dieWithStyle($ocarina, 'error');
}
elseif($action == 'register') {
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : dieWithStyle($ocarina, 'badrequest');
	$password = ((isset($_GET['password'])) && (trim($_GET['password']) !== '')) ? $ocarina->purge($_GET['password']) : dieWithStyle($ocarina, 'badrequest');
	$repassword = ((isset($_GET['repassword'])) && (trim($_GET['repassword']) !== '')) ? $ocarina->purge($_GET['repassword']) : dieWithStyle($ocarina, 'badrequest');
	$email = ((isset($_GET['email'])) && (trim($_GET['email']) !== '')) ? $ocarina->purge($_GET['email']) : dieWithStyle($ocarina, 'badrequest');
	$captcha = ((isset($_GET['captcha'])) && (trim($_GET['captcha']) !== '')) ? $ocarina->purge($_GET['captcha']) : dieWithStyle($ocarina, 'badrequest');

	if($logged)
		dieWithStyle($ocarina, 'alreadylogged');
	elseif($ocarina->config[0]->registrazioni == 0)
		dieWithStyle($ocarina, 'denied');
	elseif((strlen($password) <= 4) && (strlen($nickname) <= 4))
		dieWithStyle($ocarina, 'short');
	elseif($password !== $repassword)
		dieWithStyle($ocarina, 'passwordnotequals');
	elseif($captcha !== $_SESSION['sec'])
		dieWithStyle($ocarina, 'invalidcaptcha');		
	elseif($ocarina->config[0]->validazioneaccount == 1) {
		$codice = $ocarina->getCode();
		$array = array($nickname, $password, $email, 6, date('d-m-y'), date('G:m:s'), $codice, $storage, 'open', '');
		if($ocarina->createUser($array)) {
			$ocarina->sendMail($email, $ocarina->config[0]->nomesito.' @ Account validation for '.$nickname.'.', 'Hello dear '.$nickname.',
since you are just registered, the system needs to be sure your email address is valid.
To valid it, just click the follow link: <'.$ocarina->config[0]->url_index.'/index.php?code='.$codice.'>

If you are not '.$nickname.', please, ignore this mail.

Thanks for reading, the '.$ocarina->config[0]->nomesito.' staff.');
			if($ocarina->config[0]->log == 1)
				$ocarina->log($nickname, 'Registrated.');
			dieWithStyle($ocarina, 'successwithconfirm');
		}
		else {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($nickname, 'Registration failed.');
			dieWithStyle($ocarina, 'error');
		}
	}
	else
		if($ocarina->createUser(array($nickname, $password, $email, 6, date('d-m-y'), date('G:m:s'), '', $storage, 'open', ''))) {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($nickname, 'Registrated.');
			$ocarina->buildStorage($nickname);
			dieWithStyle($ocarina, 'success');
		}
		else {
			if($ocarina->config[0]->log == 1)
				$ocarina->log($nickname, 'Error during registration.');
			dieWithStyle($ocarina, 'error');
		}
}
elseif($action == 'sendpm') {
	$to = ((isset($_GET['to'])) && (trim($_GET['to']) !== '')) ? $ocarina->purge($_GET['to']) : dieWithStyle($ocarina, 'badrequest');
	$subject = ((isset($_GET['subject'])) && (trim($_GET['subject']) !== '')) ? $ocarina->purge($_GET['subject']) : dieWithStyle($ocarina, 'badrequest');
	$msg = ((isset($_GET['msg'])) && (trim($_GET['msg']) !== '')) ? $ocarina->purge($_GET['msg']) : dieWithStyle($ocarina, 'badrequest');
	
	if(!$logged)
		dieWithStyle($ocarina, 'denied');
	elseif($ocarina->createPM(array($ocarina->username[0]->nickname, $to, date('d-m-y'), date('G:m:i'), $subject, $msg, 0)))
		dieWithStyle($ocarina, 'success');
	else
		dieWithStyle($ocarina, 'error');
}
elseif($action == 'totalinitstorage') {
	dieWithStyle($ocarina, $storage);
}
elseif($action == 'uploader') {
	$nickname = ($logged) ? $ocarina->username[0]->nickname : dieWithStyle($ocarina, json_encode(array('error'=>'badrequest')));
	$status = ((isset($_GET['status'])) && (trim($_GET['status']) !== '') && (($_GET['status'] == 'public') || ($_GET['status'] == 'private'))) ? $ocarina->purge($_GET['status']) : dieWithStyle($ocarina, json_encode(array('error'=>'badrequest')));
	$filename = ((isset($_GET['qqfile'])) && (trim($_GET['qqfile']) !== '')) ? $ocarina->purgeFileName($_GET['qqfile']) : dieWithStyle($ocarina, json_encode(array('error'=>'badrequest')));

	if(!$ocarina->isRepository($filename, $nickname))
		if(($logged) && ($nickname == $ocarina->username[0]->nickname))
			if((int)($ocarina->remainingStorage($nickname) <= 0) || (((int)$ocarina->remainingStorage($nickname) + (int)$ocarina->byteToMega($filename) > (int)$ocarina->username[0]->storage)))
				dieWithStyle($ocarina, json_encode(array('error'=>'overflow')));
			elseif($res = uploadFileAjax($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$filename)) {
				if($res)
					if($ocarina->createFile(array($ocarina->username[0]->nickname, $filename, $status, date('d-m-y'), date('G:m:i')))) {
						if($ocarina->config[0]->log == 1)
							$ocarina->log($ocarina->username[0]->nickname, "`$filename` uploaded.");
						dieWithStyle($ocarina, htmlspecialchars(json_encode(array('success'=>true)), ENT_NOQUOTES));
					}
					else {
						$ocarina->deleteFile($filename, $nickname);
						dieWithStyle($ocarina, json_encode(array('error'=>'error')));
					}
				else
					dieWithStyle($ocarina, json_encode(array('error'=>'error')));
			}
			else {
				$ocarina->deleteFile($filename, $nickname);
				dieWithStyle($ocarina, json_encode(array('error'=>'error')));
			}
		else
			dieWithStyle($ocarina, json_encode(array('error'=>'denied')));
	else
		dieWithStyle($ocarina, json_encode(array('error'=>'duplicate')));
}
elseif($action == 'viewer') {
	$file = ((isset($_GET['file'])) && (trim($_GET['file']) !== '')) ? $ocarina->purgeFileName($_GET['file']) : dieWithStyle($ocarina, 'badrequest');
	$clear = ((isset($_GET['clear'])) && ($_GET['clear'] == 'true')) ? true : false;
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : dieWithStyle($ocarina, 'badrequest');

	if(($ocarina->isUser($nickname)) && ($repository = $ocarina->getRepository($file, $nickname)))
		if(($user = $ocarina->getUser($nickname)) && ($user[0]->profile == 'close'))
			if(($logged) && ($user[0]->nickname == $ocarina->username[0]->nickname))
				$ocarina->viewFile($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, $clear);
			else
				dieWithStyle($ocarina, 'denied');
		elseif($repository[0]->status == 'private')
			if(($logged) && ($nickname == $ocarina->username[0]->nickname) && ($repository[0]->nickname == $nickname))
				$ocarina->viewFile($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, $clear);
			else
				dieWithStyle($ocarina, 'denied');
		else {
			if((!$logged) || ($nickname !== $ocarina->username[0]->nickname))
				$ocarina->editFile('visite', $repository[0]->visite + 1, $file, $nickname);
			$ocarina->viewFile($ocarina->config[0]->root_uploads.'/'.$nickname.'/'.$file, $clear);
		}
	else
		dieWithStyle($ocarina, 'notfound');
}

/* RESTRICTED AREA!!!111 */
elseif($action == 'viewlog') {
	$max = ((isset($_GET['max'])) && is_numeric($_GET['max'])) ? (int)$_GET['max'] : '';
	
	if(($logged) && ($ocarina->username[0]->grado == 1))
		if(($max !== '') && ($max <= $ocarina->countLog()))
			if($log = $ocarina->getLog(0, $max)) {
				$text = '';
				foreach($log as $v=>$l)
					$text .= $v->azione.'<br />';
				dieWithStyle($ocarina, $text);
			}
			else
				dieWithStyle($ocarina, 'notfound');
		else
			if($log = $ocarina->getLog()) {
				$text = '';
				foreach($log as $v=>$l)
					$text .= $l->nickname.' => '.$l->azione.'<br />';
				dieWithStyle($ocarina, $text);
			}
			else
				dieWithStyle($ocarina, 'notfound');
	else
		dieWithStyle($ocarina, 'denied');
}
elseif($action == 'deletelog') {
	if(($logged) && ($ocarina->username[0]->grado == 1))
		if($ocarina->deleteLog())
			dieWithStyle($ocarina, 'success');
		else
			dieWithStyle($ocarina, 'error');
	else
		dieWithStyle($ocarina, 'denied');
}
/* EVITA DI DIMINUIRE LO SPAZIO, VISTO CHE POI I FILE CHE CI SONO RESTANO... AL MASSIMO USALO PER BANNARE! */
elseif($action == 'changestorage') {
	$nickname = ((isset($_GET['nickname'])) && (trim($_GET['nickname']) !== '')) ? $ocarina->purge($_GET['nickname']) : dieWithStyle($ocarina, 'badrequest');
	$storage = ((isset($_GET['storage'])) && is_numeric($_GET['storage'])) ? (int)$_GET['storage'] : '';
	if(($logged) && ($ocarina->username[0]->grado == 1))
		if(($nickname !== '') && ($storage !== ''))
			if($ocarina->isUser($nickname))
				if($ocarina->editUser('storage', $storage, $nickname))
					dieWithStyle($ocarina, 'success');
				else
					dieWithStyle($ocarina, 'error');
			else
				dieWithStyle($ocarina, 'notfound');
		else
			dieWithStyle($ocarina, 'badrequest');
	else
		dieWithStyle($ocarina, 'denied');
}		
else
	dieWithStyle($ocarina, 'badrequest');
