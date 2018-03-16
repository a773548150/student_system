<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/3/15
 * Time: 13:26
 */

require("./operationMysql.php");

$db = new DB();
$db->isLoginManager();
$res = $db->selectAllCourseName();
echo json_encode($res);