<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:15
 */

include_once("./operation_mysql.php");

$message = $_POST['courseMessage'];

$db = new DB();
$db->is_login();
$res = $db->select_course($message);
echo json_encode($res);