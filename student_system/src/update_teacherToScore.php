<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/2/1
 * Time: 20:27
 */

// 此文件作为教师修改学生成绩使用
require("./operation_mysql.php");

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
} else{
    $db = new DB();
    $db->is_login_teacher();
    $res = $db->update_teacherToScore($message);
    printf("%s rows have been update.", $res);
}
