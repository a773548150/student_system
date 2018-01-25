<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 21:24
 */

include_once("./operation_mysql.php");

$message = '1514';

$db = new DB();
$res = $db->select_student($message);
printf("%s rows have been find.", $res);