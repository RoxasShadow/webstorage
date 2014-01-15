<?php
/**
	core/class.MySQL.php
	(C) Giovanni Capuano 2011
*/
require_once('class.Utilities.php');

/* Questa classe mette a disposizione dei metodi per gestire il database. */
class MySQL extends Utilities {
	/* Edit here... */
	private $host = 'localhost';
	private $username = ' ';
	private $password = ' ';
	private $database = ' ';
	public $prefix = 'ws_';
	public $caching = true; // `true` -> Caching abilitato; `false` -> Caching disabilitato.
	public $storage = '/home/giovanni/giovannicapuano/htdocs/webstorage/cache/';
	public $filter = array('log', 'personalmessage', 'repository', 'utenti', 'visitatori'); // Tabelle da non cachare.
	/* Stop, g'day :) */
	public $mysql = NULL;
	public $countQuery = 0;
	public $countCache = 0;
	
	public function __construct() {
		$this->mysql = new mysqli($this->host, $this->username, $this->password, $this->database);
		if(mysqli_connect_errno())
			die('Connection to the database failed. Error number ');
		elseif($this->caching)
			if(!is_dir($this->storage))
				die('The folder which contains the cache files does not exists.');
			elseif(!is_writable($this->storage))
				die('The folder which contains the cache files is not writable.<br />Should to try to correct the permissions.');
	}
	
	public function __distruct() {
		$this->mysql->close();
		unset($this->mysql);
	}
	
	/* Private methods. */
	/* Oggetto -> cache. */
	private function serial($file, $obj) {
		$f = fopen($this->storage.$file, 'w');
		fwrite($f, serialize($obj));
		fclose($f);
	}
	
	/* Cache -> oggetto. */
	private function unserial($file) {
		$f = fopen($this->storage.$file, 'r');
		$content = fread($f, filesize($this->storage.$file));
		fclose($f);
		return unserialize($content);
	}
	
	/* Controlla se la query aggiorna dei dati. */
	private function is_cachable($query) {
		return !preg_match('/\s*(INSERT[\s]+|DELETE[\s]+|UPDATE[\s]+|REPLACE[\s]+|CREATE[\s]+|ALTER[\s]+|SET[\s]+|FOUND_ROWS[\s]+|SQL_NO_CACHE[\s]+)/is', $query);
	}
	
	/* Controlla se la query rientra nelle eccezioni da non cachare. */
	private function is_exception($query) {
		for($i=0, $count=count($this->filter); $i<$count; ++$i)
			if(preg_match('/(.*?)'.$this->filter[$i].'(.*?)/is', $query))
				return true;
		return false;
	}
	
	/* Controlla se un file di cache esiste. */
	private function is_cached($file) {
		return file_exists($this->storage.$file) ? true : false;
	}
	
	/* Rimuove un file di cache. */
	private function cache_remove($file) {
		if($this->is_cached($file))
			unlink($this->storage.$file);
	}
	
	/* Public methods. */
	/* Rimuove tutti i file di cache. */
	public function cache_clean() {
		$dir = opendir($this->storage);
		while($file = readdir($dir))
			if(substr($file, -6) == '.cache')
				$this->cache_remove($file);
	}
	
	/* Esegue una query SQL. */
	public function query($query) {
		if(($this->caching) && (!$this->is_cachable($query)))
			$this->cache_clean();
		return (!$result = $this->mysql->query($query)) ? false : $result;
	}
	
	/* Ottiene un oggetto con i record di una tabella. */
	public function get($query) {
		$get = array();
		$file = md5($query).'.cache';
		if((!$this->caching) || ($this->is_exception($query))) {
			++$this->countQuery;
			if(!$result = $this->mysql->query($query))
				return false;
			while($fetch = $result->fetch_object())
				array_push($get, $fetch);
			$result->close();
			return empty($get) ? false : $get;
		}
		if(($this->caching) && ($this->is_cached($file))) {
			++$this->countCache;
			return $this->unserial($file);
		}
		++$this->countQuery;
		if(!$result = $this->mysql->query($query))
			return false;
		while($fetch = $result->fetch_object())
			array_push($get, $fetch);
		$result->close();
		if(($this->caching) && (!$this->is_cached($file)))
			$this->serial($file, $get);
		return empty($get) ? false : $get;
	}
	
	/* Ritorna il numero di righe di una query. */
	public function count($query) {
		if((!$this->caching) || ($this->is_exception($query))) {
			++$this->countQuery;
			if(!$result = $this->mysql->query($query))
				return 0;
			$count = count($result->fetch_row());
			return ((!$count) || (!is_numeric($count)) || ((int)$count <= 0)) ? 0 : (int)$count;
		}
		++$this->countCache;
		$file = md5($query).'.cache';
		if(($this->caching) && ($this->is_cached($file))) {
			$count = count($this->unserial($file));
			return ((!$count) || (!is_numeric($count)) || ((int)$count <= 0)) ? 0 : (int)$count;
		}
	}
	
	/* Ritorna il valore di una query COUNT. */
	public function resultCountQuery($query) {
		++$this->countQuery;
		if(!$result = $this->mysql->query($query))
			return 0;
		$count = $result->fetch_row();
		return ((!$count[0]) || (!is_numeric($count[0])) || ((int)$count[0] <= 0)) ? 0 : (int)$count[0];
	}
	
	/* Ottiene un array con i valori enum di una colonna. */
	public function getEnum($query) {
		++$this->countQuery;
		$result = $this->mysql->query($query);
		if(!$rows = $result->fetch_row())
			return false;
		$category = explode("','", preg_replace("/(enum|set)\('(.+?)'\)/", "\\2", $rows[1]));
		return (empty($category)) ? false : $category;
	}
	
	/* Ottiene un array con le colonne di una tabella. */
	public function getColumns($query) {
		++$this->countQuery;
		if(!$result = $this->mysql->query($query))
			return false;
		$fields = $result->fetch_fields();
		$fieldsList = array();
		$columns = array();
		foreach($fields as $v)
			$fieldsList[] = $v->name;
		for($i=0, $numColumns=count($result->fetch_row()); $i<$numColumns; ++$i)
			$columns[$i] = $fieldsList[$i];
		return (empty($columns)) ? false : $columns;
	}
	
	/* Crea le tabelle per il database nel setup. */
	public function createDatabase() {
		$array = array(
			"CREATE TABLE IF NOT EXISTS `{$this->prefix}configurazione` (
			  `nomesito` varchar(100) NOT NULL,
			  `email` varchar(100) NOT NULL,
			  `registrazioni` tinyint(1) NOT NULL,
			  `validazioneaccount` tinyint(1) NOT NULL,
			  `log` tinyint(1) NOT NULL,
			  `cookie` varchar(20) NOT NULL,
			  `limiteonline` int(10) NOT NULL,
			  `loginexpire` int(10) NOT NULL,
			  `url` varchar(100) NOT NULL,
			  `url_index` varchar(100) NOT NULL,
			  `url_uploads` varchar(100) NOT NULL,
			  `root` varchar(100) NOT NULL,
			  `root_index` varchar(100) NOT NULL,
			  `root_uploads` varchar(100) NOT NULL
			) ENGINE=MyISAM DEFAULT CHARSET=latin1;",

			"CREATE TABLE IF NOT EXISTS `{$this->prefix}follow` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `me` varchar(100) NOT NULL,
			  `you` varchar(100) NOT NULL,
			  `date` varchar(10) NOT NULL,
			  `hour` varchar(10) NOT NULL,
			  PRIMARY KEY (`id`),
			  KEY `me` (`me`,`you`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1;",

			"CREATE TABLE IF NOT EXISTS `{$this->prefix}log` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `nickname` varchar(100) NOT NULL,
			  `azione` varchar(100) NOT NULL,
			  `ip` varchar(20) NOT NULL,
			  `data` varchar(10) NOT NULL,
			  `ora` varchar(10) NOT NULL,
			  `useragent` varchar(100) NOT NULL,
			  `referer` text NOT NULL,
			  PRIMARY KEY (`id`),
			  KEY `nickname` (`nickname`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1;",

			"CREATE TABLE IF NOT EXISTS `{$this->prefix}personalmessage` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `sender` varchar(100) NOT NULL,
			  `receiver` varchar(100) NOT NULL,
			  `date` varchar(10) NOT NULL,
			  `hour` varchar(10) NOT NULL,
			  `subject` varchar(100) NOT NULL,
			  `message` text NOT NULL,
			  `readed` tinyint(1) NOT NULL,
			  PRIMARY KEY (`id`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1;",

			"CREATE TABLE IF NOT EXISTS `{$this->prefix}repository` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `nickname` varchar(100) NOT NULL,
			  `path` varchar(255) NOT NULL,
			  `status` varchar(100) NOT NULL,
			  `download` int(100) NOT NULL,
			  `visite` int(100) NOT NULL,
			  `data` varchar(10) NOT NULL,
			  `ora` varchar(10) NOT NULL,
			  PRIMARY KEY (`id`),
			  KEY `nickname` (`nickname`),
			  KEY `nickname_2` (`nickname`,`path`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1;",

			"CREATE TABLE IF NOT EXISTS `{$this->prefix}utenti` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `nickname` varchar(100) NOT NULL,
			  `password` varchar(100) NOT NULL,
			  `secret` varchar(100) NOT NULL,
			  `email` varchar(100) NOT NULL,
			  `grado` tinyint(1) NOT NULL,
			  `data` varchar(10) NOT NULL,
			  `ora` varchar(10) NOT NULL,
			  `lastlogout` varchar(10) NOT NULL,
			  `ip` varchar(20) NOT NULL,
			  `codiceregistrazione` varchar(40) NOT NULL,
			  `codicerecupero` varchar(40) NOT NULL,
			  `bio` text NOT NULL,
			  `avatar` text NOT NULL,
			  `browsername` varchar(100) NOT NULL,
			  `browserversion` varchar(100) NOT NULL,
			  `platform` varchar(100) NOT NULL,
			  `storage` varchar(100) NOT NULL,
			  `profile` varchar(10) NOT NULL DEFAULT '',
			  `language` varchar(2) NOT NULL,
			  PRIMARY KEY (`id`),
			  KEY `secret` (`secret`),
			  KEY `nickname` (`nickname`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1;",

			"CREATE TABLE IF NOT EXISTS `{$this->prefix}visitatori` (
			  `id` int(10) NOT NULL AUTO_INCREMENT,
			  `ip` varchar(20) NOT NULL,
			  `lastaction` varchar(15) NOT NULL,
			  `giorno` varchar(10) NOT NULL,
			  `data` varchar(10) NOT NULL,
			  `nickname` varchar(100) NOT NULL,
			  PRIMARY KEY (`id`)
			) ENGINE=MyISAM  DEFAULT CHARSET=latin1;"
		);
		for($i=0, $count=count($array); $i<$count; ++$i)
			if(!$this->query($array[$i]))
				return false;
		return true;
	}
	
	/* Filtra una stringa o un array multidimensionale.
	   ATTENZIONE: Non usare per la creazione di news e le pagine, altrimenti l'HTML non sarà parsato! */
	public function purge($var) {
		if(is_array($var))
			foreach($var as $key => $value) {
				if(is_array($var[$key]))
					$var[$key] = $this->purge($var[$key]);
				if((is_string($var[$key])) && (!is_numeric($var[$key]))) {
					if(get_magic_quotes_gpc())
						$var[$key] = stripslashes($var[$key]);
					$var[$key] = trim($this->mysql->real_escape_string(parent::htmlentities(parent::purgeByXSS($var[$key]))));
				}
			}
		if((is_string($var)) && (!is_numeric($var))) {
			if(get_magic_quotes_gpc())
				$var = stripslashes($var);
			$var = trim($this->mysql->real_escape_string(parent::htmlentities(parent::purgeByXSS($var))));
		}
		return $var;
	}
	
	/* Inserisce gli slahes o meno a seconda dei magic_quotes_gpc. */
	public function purgeSlashes($var) {
		if(is_array($var))
			foreach($var as $key => $value) {
				if(is_array($var[$key]))
					$var[$key] = $this->purgeSlashes($var[$key]);
				if((is_string($var[$key])) && (!is_numeric($var[$key]))) {
					if(get_magic_quotes_gpc())
						$var[$key] = stripslashes($var[$key]);
					$var[$key] = $this->mysql->real_escape_string($var[$key]);
				}
			}
		if((is_string($var)) && (!is_numeric($var))) {
			if(get_magic_quotes_gpc())
				$var = stripslashes($var);
			$var = $this->mysql->real_escape_string($var);
		}
		return $var;
	}
}
