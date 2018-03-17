<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 17:19
 */

require("./operationMysql.php");

$name = trim($_POST['name']);
$sex = trim($_POST['sex']);
$age = trim($_POST['age']);
$major = trim($_POST['major']);
$number = trim($_POST['number']);

$message = array(
    'name' => $name,
    'number' => $number,
    'age' => $age,
    'sex' => $sex,
    'major' => $major
);

if ($name == "" || $number == "" || $sex == ""|| $age == ""|| $major == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 13) {
    echo "Number is wrong";
} else if (strlen($age) != 10) {
    echo "Age is wrong";
} else{
    $db = new DB();
    $db->isLoginManager();
    $res = $db->updateStudentMessage($message, $number);
    echo $res;
}
