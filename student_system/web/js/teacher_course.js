$(document).ready(function(){
    selectAjax();
});

var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        courseMessage: {'courseMessage':''},
        courseArr: [],
        selectArr: {'courseName':''},
        titleArr: [],
        nowEditCol: -1
    },
    methods:{
        insertTeacherCourse:function(id){
            for(var i=0,len=this.courseArr.length;i<len;i++){
                if(id === this.courseArr[i]['number'] ){
                    if (confirm("是否任课课程号为：" + this.courseArr[i]['number'])) {
                        insertTeacherCourseAjax(this.courseArr[i]['number']);
                    }
                    break;
                }
            }
        }
    }
})

// 用于查询的ajax
function selectAjax(){
    reportCardVm.courseArr = [];
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." }); // loading遮盖层开始
    $.ajax({
        url: "/src/selectNotCourse.php",
        type: 'post',
        dataType: 'json',
        data:{"courseMessage": reportCardVm.courseMessage.courseMessage}, // 数据为vue的绑定数据
        success: function (data, status) {
            if(data == "1") {
                window.location = "/web/login.html";
            }
            console.log(data);
            $.each(data,function(index, value){
                if (value.status != false && value.course_id == null) {
                    reportCardVm.courseArr.unshift(value); // 保存查询数据到courseArr中
                }
            });
            $.bootstrapLoading.end(); // loading遮盖层结束
        },
        fail: function (err, status) {
            console.log(err);
            window.location="/web/login.html";
        }
    })
}

//退出登录
function exitTeacherLogin() {
    $.ajax({
        url: "/src/loginExitTeacher.php",
        type: 'post',
        dataType: 'json',
        success: function (data, status) {
            if (data == 1) {
                alert("当前没有登录");
                window.location = "/web/login_teacher.html";
            } else if(data == 0) {
                alert("成功退出登录");
                $.cookie('TeacherUsername', null);
                window.location = "/web/login_teacher.html";
            }
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}

function insertTeacherCourseAjax(number){
    console.log(number);
    $.bootstrapLoading.start({ loadingTips: "正在确定任课，请稍候..." });
    $.ajax({
        url: "/src/insertTeacherCourse.php",
        type: 'post',
        data: {'number': number},
        success: function (data, Cstatus) {
            $.bootstrapLoading.end();
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}
