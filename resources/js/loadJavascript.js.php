<?php
header('Content-type: text/javascript');
header('Last-Modified: '.gmstrftime("%a, %d %b %Y %H:%M:%S GMT", getlastmod()));
header('Cache-Control: max-age=1296000, public');

if(file_exists('js.cache'))
	die(file_get_contents('js.cache'));
require_once('../lib/jsmin.php');
$f = array();
$f[] = 'jquery.js';
$f[] = 'fileuploader.js';
$f[] = 'languages.js';
$f[] = 'webstorage.js';
$f[] = 'jquery.jgrowl.js';
$f[] = 'fileuploader.js';
$f[] = 'jquery.qtip.js';
$f[] = 'jquery.easing.1.3.js';
$f[] = 'jquery.bouncebox.1.0.js';
$f[] = 'jquery-ui-1.8.16.drag.js';
$f[] = 'facebox.js';
$f[] = 'jquery.selectbox-0.1.3.js';
$f[] = 'jquery.placeholder.js';
$f[] = 'init.js';
$script = '';
for($i=0, $count=count($f), $content=''; $i<$count; ++$i) {
	$handler = fopen($f[$i], 'r');
	$script .= fread($handler, filesize($f[$i]));
	fclose($handler);
}
$script = JSMin::minify($script);
$handler = fopen('js.cache', 'w');
fwrite($handler, $script);
fclose($handler);
die(file_get_contents('js.cache'));
