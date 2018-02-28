<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/29
 * Time: 11:16
 */

require("./operationMysql.php");
$db = new DB();
$db->is_login_manager();
//调用
$db->upExecel();