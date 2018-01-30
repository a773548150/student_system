<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 21:24
 */

require("./operation_mysql.php");

$message = trim($_POST['studentMessage']);

$db = new DB();
$db->is_login_manager();
$res = $db->select_student($message);
echo json_encode($res);