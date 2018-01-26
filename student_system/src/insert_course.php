<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 9:52
 */
include_once("./operation_mysql.php");

$number = "A008";
$name = "软件工程导论";
$credit = "2.5";
$start_time = "2018-03-12";

$message = array(
    'number' => $number,
    'name' => $name,
    'credit' => $credit,
    'start_time' => $start_time
);

$db = new DB();
$res = $db->insert_course_message($message);
printf("%s rows have been insert.", $res);