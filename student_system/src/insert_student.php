<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 16:47
 */

require("./operation_mysql.php");

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

if ($name == "" || $number == "" || $sex == ""|| $age == ""|| $major == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 13) {
    echo "Number is wrong";
} else if (strlen($age) != 10) {
    echo "Age is wrong";
} else {
    $db = new DB();
    $db->is_login_manager();
    $res = $db->insert_student_message($message);
    printf("%s rows have been insert.", $res);
}



