<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/3/15
 * Time: 22:20
 */

require("./operationMysql.php");

$number = trim($_POST['number']);


if ($number == "") {
    echo "Input can't be empty";
} else {
    $db = new DB();
    $db->isLoginTeacher();
    $res = $db->insertTeacherCourse($number);
    printf("%s rows have been insert.", $res);
}
