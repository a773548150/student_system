<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/1/31
 * Time: 15:51
 */

require("./operationMysql.php");

$number = trim($_POST['number']);

if (strlen($number) != 13) {
    echo "Number is wrong";
} else {
    $db = new DB();
    $db->isLoginManager();
    $res = $db->deleteTeacherMessage($number);
    printf("%s rows have been delete.", $res);
}
