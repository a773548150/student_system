<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 21:24
 */

include_once("./operation_mysql.php");

$message = $_POST['studentMessage'];

$db = new DB();
$db->is_login();
$res = $db->select_student($message);
echo json_encode($res);