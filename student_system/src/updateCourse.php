<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:18
 */

require("./operationMysql.php");

$number = trim($_POST['number']);
$name = trim($_POST['name']);
$credit = trim($_POST['credit']);
$start_time = trim($_POST['start_time']);

$message = array(
    'number' => $number,
    'name' => $name,
    'credit' => $credit,
    'start_time' => $start_time
);

if ($name == "" || $number == "" || $credit == ""|| $start_time == "") {
    echo "Input can't be empty";
} else if (strlen($number) != 4) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->updateCourseMessage($message);
    printf("%s rows have been update.", $res);
}
