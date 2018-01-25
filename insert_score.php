<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:52
 */

include_once("./operation_mysql.php");

$studnetNumber = "1514080902230";
$courseNumber = "A003";
$score = "92";

$message = array(
    'studentNumber' => $studnetNumber,
    'courseNumber' => $courseNumber,
    'score' => $score
);

$db = new DB();
$res = $db->insert_score($message);
printf("%s rows have been insert.", $res);