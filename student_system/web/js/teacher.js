$(document).ready(function(){
    selectTitleAjax();
});

var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        studyArr: [],
        selectArr: {'courseName':''},
        titleArr: [],
        nowEditCol: -1
    },
    methods:{
        //启动索引index数据编辑
        startEdit:function(id){
            this.nowEditCol=id;
        },
        //取消编辑状态
        cancelEdit:function(){
            this.nowEditCol=-1;
        },
        //启动索引index数据修改确认
        sureEdit:function(id){
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(id === this.studyArr[i]['number'] ){
                    if (this.editArr.score == '') {
                        alert("输入不能为空！");
                    } else {
                        updateAjax();
                    }
                    break;
                }
            }
            this.nowEditCol=-1;
        }
    },
    computed:{

        //存储当前编辑的对象
        editArr:function(){
            var editO={};
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ){
                    editO = this.studyArr[i];
                    console.log(editO);
                    break;
                }
            }
            return {
                'studentNumber': editO.number,
                'courseName': editO.course_name,
                'score':editO.score
            }
        }
    }
})

function selectTitleAjax(){
    reportCardVm.titleArr = [];
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." });
    $.ajax({
        url: "/src/selectTeacherCourse.php",
        type: 'post',
        dataType: 'json',
        data:{"teacherMessage": $.cookie("teacherUsername")},
        success: function (data, status) {
            $.each(data,function(index, value){
                reportCardVm.titleArr.push(value);
            });
            console.log(reportCardVm.titleArr[0]);
            $.bootstrapLoading.end();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}

function selectAjax(){
    reportCardVm.studyArr = [];
    console.log(reportCardVm.selectArr.courseName);
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." });
    $.ajax({
        url: "/src/selectTeacherStudentCourse.php",
        type: 'post',
        dataType: 'json',
        data:{"courseName": reportCardVm.selectArr.courseName},
        success: function (data, status) {
            $.each(data,function(index, value){
                reportCardVm.studyArr.push(value);
            });
            $.bootstrapLoading.end();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}

function updateAjax(){
    $.bootstrapLoading.start({ loadingTips: "正在修改数据，请稍候..." });
    $.ajax({
        url: "/src/updateTeacherToScore.php",
        type: 'post',
        data: reportCardVm.editArr,
        success: function (data, status) {
            $.bootstrapLoading.end();
            if (data == 0) {
                alert("没有数据可修改");
            }
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
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