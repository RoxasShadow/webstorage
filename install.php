<?php
include('core/class.MySQL.php');
$mysql = new MySQL();
echo ($mysql->createDatabase()) ? 'Done.' : 'Fail.';