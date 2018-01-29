function keySearch(){
    if (event.keyCode==13)   //回车键的键值为13
        $("#search").click();  //调用查询按钮的登录事件
}
// 将时间戳转换成 Y-M-D格式
function getFormatYMD(timesamp){
    var date = new Date(timesamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate();
    D= D.toString().length==1 ? '0'+D:D;
    return Y+M+D;
}

// 处理年龄Y-M-D格式转换成年数
function toAge(oldTime) {
    var timestamp = (new Date()).valueOf();
    var currentTime = getFormatYMD(timestamp);
    var sArr = currentTime.split("-");
    var eArr = oldTime.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var age = parseInt((sRDate-eRDate)/(24*60*60*1000*365));
    return age;
}

function toYMD(age) {
    var currentTime = (new Date()).valueOf();
    var nS = currentTime - age*3600*24*1000*365;
    var now = new Date(nS); //获取时间
    var date_time = Array(); //定义数组
    var status = 0; //状态
    var clock;
    date_time.push(now.getFullYear()); //年
    date_time.push(now.getMonth() + 1); //月
    date_time.push(now.getDate()); //日
    do {
        if (status > 0 && status <= 2) {//处理月日
            if (date_time[status] < 10) {
                clock += "0";
            }
            if (status < 2) {
                str = '-';
            } else {
                str = ' ';
            }
            clock += date_time[status] + str;
        } else if (status > 2 && status <= 5) {//处理时分秒
            // if (date_time[status] < 10) {
            //     clock += "0";
            // }
            // if (status < 5) {
            //     str = ':';
            // } else {
            //     str = ' ';
            // }
            // clock += date_time[status] + str;
        } else {//处理年
            clock = date_time[status] + "-";
        }
        status++;
    } while (status <= 5);

    return clock;
}