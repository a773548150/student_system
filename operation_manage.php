<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 16:22
 */

include_once("./operation_mysql.php");

$username = "admin";
$pwd = "555";
$db = new DB();
$res = $db->update_manager_password($username, $pwd);
printf("%s rows have been update.", $res);