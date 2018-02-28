<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/25
 * Time: 11:32
 */

require("./operationMysql.php");

$message = trim($_POST['studentNumber']);

$db = new DB();
$db->is_login_manager();
$res = $db->select_score($message);
//printf("%s rows have been find.", $res);
echo json_encode($res);