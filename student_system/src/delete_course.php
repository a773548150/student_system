<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:25
 */

include_once("./operation_mysql.php");

$number = $_POST['number'];

$db = new DB();
$db->is_login();
$res = $db->delete_course_message($number);
printf("%s rows have been delete.", $res);