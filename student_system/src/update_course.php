<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:18
 */

require("./operation_mysql.php");

$number = $_POST['number'];
$name = $_POST['name'];
$credit = $_POST['credit'];
$start_time = $_POST['start_time'];

$message = array(
    'number' => $number,
    'name' => $name,
    'credit' => $credit,
    'start_time' => $start_time
);

if ($name == "" || $number == "" || $credit == ""|| $start_time == ""|| $major == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 4) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->is_login_manager();
    $res = $db->update_course_message($message);
    printf("%s rows have been update.", $res);
}
