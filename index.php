<?php
class ThisIsPowaSurely {
	public $logged = false;
	public $nickname = '';
	public $title = 'Webstorage - open beta';
	public $description = 'The only free webstorage where you can upload and share all you want, intecting with your friends. Enjoy it!';
	public $keyword = 'hosting,free,social,network,upload,server,file,image,download,share';
	public $initstorage = 20;
	public $morestorage = 500;
	public $euroblock = 5;
	public $url_index = 'HTTP';
	
	public function __construct($ocarina) {
		if($ocarina->isLogged()) {
			$this->logged = true;
			$this->nickname = $ocarina->username[0]->nickname;
		}
		$this->url_index = $ocarina->config[0]->url_index;
		unset($ocarina);
	}
}

require_once('core/class.Ocarina.php');
include('resources/lib/mustache.php');
$mustache = new Mustache;
$tpl = (strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2)) == 'it') ? 'index_it.tpl' : 'index.tpl';
echo $mustache->render(file_get_contents($tpl), new ThisIsPowaSurely(new Ocarina()));
unset($mustache);
