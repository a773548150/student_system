<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 16:47
 */
include_once("./operation_mysql.php");

$name = "王芳";
$number = "1514080902230";
$sex = "0";
$age = "1997-08-12";
$major = "计算机科学与技术";

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