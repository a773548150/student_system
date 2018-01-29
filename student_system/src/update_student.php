<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 17:19
 */

include_once("./operation_mysql.php");

$name = $_POST['name'];
$sex = $_POST['sex'];
$age = $_POST['age'];
$major = $_POST['major'];
$number = $_POST['number'];


//$message = array(
//    'sex' => $sex,
//    'age' => $age,
//    'major' => $major
//);

$message = array(
    'name' => $name,
    'number' => $number,
    'age' => $age,
    'sex' => $sex,
    'major' => $major
);
var_dump($message);
$db = new DB();
$db->is_login();
$res = $db->update_student_message($message, $number);
printf("%s rows have been update.", $res);