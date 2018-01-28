<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:52
 */

include_once("./operation_mysql.php");

$studentNumber = $_POST['studentNumber'];
$courseNumber = $_POST['courseNumber'];
$score = $_POST['score'];

$message = array(
    'studentNumber' => $studentNumber,
    'courseNumber' => $courseNumber,
    'score' => $score
);

$db = new DB();
$res = $db->insert_score($message);
printf("%s rows have been insert.", $res);