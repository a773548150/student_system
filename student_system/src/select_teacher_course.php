<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/1
 * Time: 16:08
 */

require("./operation_mysql.php");

$message = trim($_POST['teacherMessage']);

$db = new DB();
$db->is_login_teacher();
$res = $db->select_teacher($message);
echo json_encode($res);