<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/26
 * Time: 9:10
 */

include_once("./operation_mysql.php");

session_start();

if (! isset($_SESSION['username'])) {
    if (isset($_POST['username']) != FALSE) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $db = new DB();
        $res = $db->login_manager($username, $password);
        if ($res != FALSE) {
            $_SESSION['username'] = $username;
            echo "1";
        } else {
            echo "0";
        }
    }
} else {
    echo "2";
}

