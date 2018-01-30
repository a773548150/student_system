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
    age = age.toString();
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

//  加载
jQuery.bootstrapLoading = {
    start: function (options) {
        var defaults = {
            opacity: 0.7,
            //loading页面透明度
            backgroundColor: "#fff",
            //loading页面背景色
            borderColor: "white",
            //提示边框颜色
            borderWidth: 1,
            //提示边框宽度
            borderStyle: "solid",
            //提示边框样式
            loadingTips: "Loading, please wait...",
            //提示文本
            TipsColor: "black",
            //提示颜色
            delayTime: 1000,
            //页面加载完成后，加载页面渐出速度
            zindex: 999,
            //loading页面层次
            sleep: 0
            //设置挂起,等于0时则无需挂起
        }
        var options = $.extend(defaults, options);
        //获取页面宽高
        var _PageHeight = document.documentElement.clientHeight,
            _PageWidth = document.documentElement.clientWidth;
        //在页面未加载完毕之前显示的loading Html自定义内容
        var _LoadingHtml = '<div id="loadingPage" style="position:fixed;left:0;top:0;_position: absolute;width:100%;height:'
            + _PageHeight + 'px;background:' + options.backgroundColor + ';opacity:' + options.opacity + ';' +
            'filter:alpha(opacity=' + options.opacity * 100 + ');z-index:' + options.zindex + '; ">' +
            '<div id="loadingTips" style="position: absolute; cursor1: wait; width: auto;border-color:' + options.borderColor + ';' +
            'border-style:' + options.borderStyle + ';border-width:' + options.borderWidth + 'px; height:80px; line-height:80px; ' +
            'padding-left:80px; padding-right: 5px;border-radius:10px; ' +
            'background: ' + options.backgroundColor + ' url(/web/common/loading.jpg) no-repeat 5px center; color:' + options.TipsColor + ';' +
            'font-size:20px; background-size: 40px 40px;">' + options.loadingTips + '</div></div>';
        //呈现loading效果
        $("body").append(_LoadingHtml);
        //获取loading提示框宽高
        var _LoadingTipsH = document.getElementById("loadingTips").clientHeight,
            _LoadingTipsW = document.getElementById("loadingTips").clientWidth;
        //计算距离，让loading提示框保持在屏幕上下左右居中
        var _LoadingTop = _PageHeight > _LoadingTipsH ? (_PageHeight - _LoadingTipsH) / 2 : 0,
            _LoadingLeft = _PageWidth > _LoadingTipsW ? (_PageWidth - _LoadingTipsW) / 2 : 0;
        $("#loadingTips").css({
            "left": _LoadingLeft + "px",
            "top": _LoadingTop + "px"
        });
        //监听页面加载状态
        document.onreadystatechange = PageLoaded;
        //当页面加载完成后执行
        function PageLoaded() {
            if (document.readyState == "complete") {
                var loadingMask = $('#loadingPage');
                setTimeout(function () {
                        loadingMask.animate({
                                "opacity": 0
                            },
                            options.delayTime,
                            function () {
                                $(this).hide();
                            });
                    },
                    options.sleep);
            }
        }
    },
    end: function () {
        $("#loadingPage").remove();
    }
}