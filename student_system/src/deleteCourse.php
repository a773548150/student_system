<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 10:25
 */

require("./operationMysql.php");

$number = trim($_POST['number']);

if (strlen($number) != 4) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->deleteCourseMessage($number);
    echo $res;
}
