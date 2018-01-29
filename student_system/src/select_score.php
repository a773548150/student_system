<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 11:32
 */

include_once("./operation_mysql.php");

$message = $_POST['studentNumber'];

$db = new DB();
$db->is_login();
$res = $db->select_score($message);
//printf("%s rows have been find.", $res);
echo json_encode($res);