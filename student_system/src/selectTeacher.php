<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/1/31
 * Time: 15:53
 */

require("./operationMysql.php");

$message = trim($_POST['teacherMessage']);

$db = new DB();
$db->isLoginManager();
$res = $db->selectTeacher($message);
echo json_encode($res);