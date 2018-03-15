<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/1
 * Time: 16:08
 */

// 此页面作为查询教师所有教的课程

require("./operationMysql.php");

$message = trim($_POST['teacherMessage']);

if ($message == "") {
    echo "Input can't be empty";
} else {
    $db = new DB();
    $db->is_login_teacher();
    $res = $db->select_teacher($message);// 查询教师信息，通过模糊搜索姓名或学号，查询出编号，姓名，用户名，密码
    echo json_encode($res);
}
