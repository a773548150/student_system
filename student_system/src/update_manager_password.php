<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/26
 * Time: 9:10
 */

include_once("./operation_mysql.php");

$username = $_POST['username'];
$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];
$db = new DB();
$db->is_login();
$res = $db->update_manager_password($username, $oldPassword, $newPassword);
if ($res === 0) {
    echo "0"; // 账号或密码错误
} else if ($res === 1) {
    echo "1"; // 修改密码失败
} else if ($res === 2) {
    echo "2"; // 修改密码成功
} else {
    echo "3"; // 未知错误
}