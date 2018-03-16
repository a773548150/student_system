<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:15
 */

require("./operationMysql.php");

$message = trim($_POST['courseMessage']);

$db = new DB();
$db->isLoginManager();
$res = $db->selectCourse($message);
echo json_encode($res);