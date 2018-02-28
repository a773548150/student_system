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
$db->is_login_manager();
$res = $db->select_course($message);
echo json_encode($res);