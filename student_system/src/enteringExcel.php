<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/29
 * Time: 11:16
 */

require("./operationMysql.php");
$db = new DB();
$db->isLoginManager();
//调用
$db->upExecel();