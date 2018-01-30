<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 17:19
 */

require("./operation_mysql.php");

$name = $_POST['name'];
$sex = $_POST['sex'];
$age = $_POST['age'];
$major = $_POST['major'];
$number = $_POST['number'];

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
    $db->is_login_manager();
    $res = $db->update_student_message($message, $number);
    printf("%s rows have been update.", $res);
}
