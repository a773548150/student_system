<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/3/15
 * Time: 22:51
 */

require("./operationMysql.php");

$message = trim($_POST['courseMessage']);

$db = new DB();
$db->is_login_teacher();
$res = $db->select_not_course($message);
echo json_encode($res);