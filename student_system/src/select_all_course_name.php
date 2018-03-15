<?php
/**
 * Created by PhpStorm.
 * User: 77354
 * Date: 2018/3/15
 * Time: 13:26
 */

require("./operationMysql.php");

$db = new DB();
$db->is_login_manager();
$res = $db->select_all_course_name();
echo json_encode($res);