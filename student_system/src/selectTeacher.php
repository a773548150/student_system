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
$db->is_login_manager();
$res = $db->select_teacher($message);
echo json_encode($res);