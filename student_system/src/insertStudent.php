<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 16:47
 */

require("./operationMysql.php");

$name = trim($_POST['name']);
$number = trim($_POST['number']);
$sex = trim($_POST['sex']);
$age = trim($_POST['age']);
$major = trim($_POST['major']);

$message = array(
    'number' => $number,
    'name' => $name,
    'sex' => $sex,
    'age' => $age,
    'major' => $major
);

if ($name == "" || $number == "" || $sex == ""|| $age == ""|| $major == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 13) {
    echo "Number is wrong";
} else if (strlen($age) != 10) {
    echo "Age is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->insertStudentMessage($message);
    echo $res;
}



