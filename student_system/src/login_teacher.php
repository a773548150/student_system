<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/30
 * Time: 9:51
 */

require("./operation_mysql.php");

session_start();

if (! isset($_SESSION['teacherName'])) {
    if (isset($_POST['username']) != FALSE) {
        $username = trim($_POST['username']);
        $password = trim(md5($_POST['password']));
        $db = new DB();
        $res = $db->login_teacher($username, $password);
        if ($res != FALSE) {
            $_SESSION['teacherName'] = $username;
            echo "1";
        } else {
            echo "0";
        }
    }
} else {
    echo "2";
}