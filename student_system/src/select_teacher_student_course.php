<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/1
 * Time: 16:57
 */

// 此页面作为查询教师所教的某课的所有学生

require("./operation_mysql.php");

$message = trim($_POST['courseName']);

$db = new DB();
$db->is_login_teacher();
$res = $db->select_teacher_student_course($message);
echo json_encode($res);