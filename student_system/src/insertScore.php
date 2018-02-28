<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:52
 */

require("./operationMysql.php");

$studentNumber = trim($_POST['studentNumber']);
$courseNumber = trim($_POST['courseNumber']);
$score = trim($_POST['score']);

$message = array(
    'studentNumber' => $studentNumber,
    'courseNumber' => $courseNumber,
    'score' => $score
);

if ($studentNumber == "" || $courseNumber == "" || $score == "") {
    echo "Input can't be empty";
} else if (strlen($studentNumber) != 13) {
    echo "StudentNumber is wrong";
} else if (strlen($courseNumber) != 4) {
    echo "CourseNumber is wrong";
} else {
    $db = new DB();
    $db->is_login_manager();
    $res = $db->insert_score($message);
    printf("%s rows have been insert.", $res);
}