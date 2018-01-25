<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:18
 */

include_once("./operation_mysql.php");

$number = "A012";
$start_time = "2018-09-15";

$message = array(
    'number' => $number,
    'start_time' => $start_time
);

$db = new DB();
$res = $db->update_course_message($message);
printf("%s rows have been update.", $res);