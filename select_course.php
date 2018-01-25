<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:15
 */

include_once("./operation_mysql.php");

$message = '03';

$db = new DB();
$res = $db->select_course($message);
printf("%s rows have been find.", $res);