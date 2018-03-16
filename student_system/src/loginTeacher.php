<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/30
 * Time: 9:51
 */

require("./operationMysql.php");

session_start();

if (! isset($_SESSION['teacherName'])) {
    if (isset($_POST['username']) != FALSE) {
        $username = trim($_POST['username']);
        $password = trim(md5($_POST['password']));
        $db = new DB();
        $res = $db->loginTeacher($username, $password);
        // 登录成功则把username存入session中并返回1，失败返回0
        if ($res != FALSE) {
            $_SESSION['teacherName'] = $username;
            echo "1";
        } else {
            echo "0";
        }
    }
} else {
    echo "2"; // 若已有username的session，表明已经登录，返回2
}