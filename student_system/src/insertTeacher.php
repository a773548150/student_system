<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/1/31
 * Time: 15:42
 */


require("./operationMysql.php");

$name = trim($_POST['name']);
$number = trim($_POST['number']);
$username = trim($_POST['username']);
$password = trim(md5($_POST['password']));

$message = array(
    'number' => $number,
    'name' => $name,
    'username' => $username,
    'password' => $password
);

if ($name == "" || $number == "" || $username == ""|| $password == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 13) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->insertTeacherMessage($message);
    echo $res;
}



