<?php
header('Content-type: text/css');
header('Last-Modified: '.gmstrftime("%a, %d %b %Y %H:%M:%S GMT", getlastmod()));
header('Cache-Control: max-age=1296000, public');

if(file_exists('css.cache'))
	die(file_get_contents('css.cache'));
require_once('../lib/cssmin.php');
$f = array();
$apri = opendir('./');
while($style = readdir($apri))
	if((is_file($style)) && (substr($style, -4) == '.css') && ($style !== 'error.css'))
		$f[] = $style;
closedir($apri);
unset($config);
sort($f); // Ordine alfabetico
$style = '';
for($i=0, $count=count($f), $content=''; $i<$count; ++$i) {
	$handler = fopen($f[$i], 'r');
	$style .= fread($handler, filesize($f[$i]));
	fclose($handler);
}
$style = CssMin::minify($style);
$handler = fopen('css.cache', 'w');
fwrite($handler, $style);
fclose($handler);
die(file_get_contents('css.cache'));
