<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/24
 * Time: 17:19
 */

include_once("./operation_mysql.php");

$name = "林晓聪";
//$sex = "1";
//$age = "1996-10-08";
//$major = "软件工程";

$number = "1514080902117";

//$message = array(
//    'sex' => $sex,
//    'age' => $age,
//    'major' => $major
//);

$message = array(
    'name' => $name,
    'number' => $number
);

$db = new DB();
$res = $db->update_student_message($message, $name);
printf("%s rows have been update.", $res);