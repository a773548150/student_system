<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/1/31
 * Time: 15:51
 */

require("./operation_mysql.php");

$number = trim($_POST['number']);

if (strlen($number) != 13) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->is_login_manager();
    $res = $db->delete_teacher_message($number);
    printf("%s rows have been delete.", $res);
}
