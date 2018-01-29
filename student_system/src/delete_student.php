<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 18:37
 */

include_once("./operation_mysql.php");

$number = $_POST['number'];

$db = new DB();
$db->is_login();
$res = $db->delete_student_message($number);
printf("%s rows have been delete.", $res);