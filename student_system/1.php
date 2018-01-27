<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/27
 * Time: 9:55
 */

header("Content-type:text/html;charset=utf-8");
$username = "lin";
$password = "123465";

$message = "尊敬的用户\"$username\",您的密码为\"$password\"";
echo $message;

$sum = 5 + 10;
$sum = $sum + 3.14;
$sum = $sum -5;
$sum = $sum / 3;
$sum = $sum % 5;
echo "<br/>$sum<br/>";

//$a = fopen("a.txt", 'a');
//fwrite($a,"123\r\n245");

$num = 111;

if ($num >100 && $num != 150) {
    echo "恭喜您，输入正确";
} else {
    echo "很遗憾，您输入的数字不符合条件";
}
echo "<br/>";
$a=(boolean)array(1);
if($a) {
    echo "1";
    var_dump($a);
} else {
    var_dump($a);
}
//
//$q = -1;
//while($q++<100) {
//    if($q>=50 && $q<=60){
//        continue;
//    }
//    echo "<br/>";
//    echo $q;
//}

//while($q-->0) {
//    if($q===50){
//        break;
//    }
//    echo "<br/>";
//    echo $q;
//}

for ($q=100,$p = 0;$q>=0;$q-- ) {
    $p=$p+$q;
}
echo "<br/>".$p;
$v = 0;
$u = 0;
while ($u<101) {
    $v=$u+$v;
    $u++;
}
echo "<br/>".$v;