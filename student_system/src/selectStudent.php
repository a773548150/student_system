<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 21:24
 */

require("./operationMysql.php");

$message = trim($_POST['studentMessage']);

$db = new DB();
$db->isLoginManager();
$res = $db->selectStudent($message);
echo json_encode($res);