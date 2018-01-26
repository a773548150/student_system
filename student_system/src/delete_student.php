<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 18:37
 */

include_once("./operation_mysql.php");

$name = $_POST('name');

$db = new DB();
$res = $db->delete_student_message($name);
printf("%s rows have been delete.", $res);