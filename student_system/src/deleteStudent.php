<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 18:37
 */

require("./operationMysql.php");

$number = trim($_POST['number']);

if (strlen($number) != 13) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->deleteStudentMessage($number);
    echo $res;
}
