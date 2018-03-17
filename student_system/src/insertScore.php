<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:52
 */

require("./operationMysql.php");

$studentNumber = trim($_POST['studentNumber']);
$courseName = trim($_POST['courseName']);
$score = trim($_POST['score']);

$message = array(
    'studentNumber' => $studentNumber,
    'courseName' => $courseName,
    'score' => $score
);

if ($studentNumber == "" || $courseName == "" || $score == "") {
    echo "Input can't be empty";
} else if (strlen($studentNumber) != 13) {
    echo "StudentNumber is wrong";
} else if (strlen($courseName) == "") {
    echo "CourseName is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->insertScore($message);
    echo $res;
}
