<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 18:37
 */

require("./operation_mysql.php");

$number = $_POST['number'];

if (strlen($number) != 13) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->is_login_manager();
    $res = $db->delete_student_message($number);
    printf("%s rows have been delete.", $res);
}
