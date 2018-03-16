<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/3/15
 * Time: 22:51
 */

require("./operationMysql.php");

$db = new DB();
$db->isLoginTeacher();
$res = $db->selectNotCourse();
echo json_encode($res);