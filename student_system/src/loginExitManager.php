<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/3/15
 * Time: 8:15
 */

session_start();
//返回1表示没有登录，返回0表示正常退出登录
if (! isset($_SESSION['username'])) {
    echo "1";
} else {
    unset($_SESSION['username']);
    echo "0";
}

