<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 16:47
 */
include_once("./operation_mysql.php");

$name = $_POST['name'];
$number = $_POST['number'];
$sex = $_POST['sex'];
$age = $_POST['age'];
$major = $_POST['major'];

$message = array(
    'number' => $number,
    'name' => $name,
    'sex' => $sex,
    'age' => $age,
    'major' => $major
);

$db = new DB();
$res = $db->insert_student_message($message);
printf("%s rows have been insert.", $res);