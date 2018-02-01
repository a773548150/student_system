<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/1/31
 * Time: 15:52
 */

require("./operation_mysql.php");

$name = trim($_POST['name']);
$number = trim($_POST['number']);
$username = trim($_POST['username']);
$password = trim($_POST['password']);

$message = array(
    'name' => $name,
    'number' => $number,
    'username' => $username,
    'password' => $password
);

if ($name == "" || $number == "" || $username == ""|| $password == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 13) {
    echo "Number is wrong";
}else{
    $db = new DB();
    $db->is_login_manager();
    $res = $db->update_teacher_message($message, $number);
    printf("%s rows have been update.", $res);
}
