// $(document).ready(function(){
//     $.ajax({
//         url: "/src/select_student.php",
//         type: 'post',
//         dataType: 'json',
//         data:{"studentNumber": $("#studentNumber").val()},
//         success: function (data, status) {
//             console.log(data)
//         },
//         fail: function (err, status) {
//             console.log(err)
//         }
//     })
// });

$(document).ready(function() {
    selectAjax();
});

var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        selectNumber: {'studentNumber':''},
        studyArr:[],//成绩花名册
        insertArr:{},
        addArr:{'studentNumber':'','courseName':'','score':''},//新增的表单字段
    },
    methods:{
        //新增成绩
        submitStu:function(){
            if (this.addArr.studentNumber == '' || this.addArr.courseName == '' || this.addArr.score == '') {
                alert("输入不能为空！");
            } else if(this.addArr.studentNumber.length < 13){
                alert("学号不能少于13位！");
            } else if (parseFloat(this.addArr.score) > 100 || parseFloat(this.addArr.score) < 0) {
                alert("成绩按规范输入,如88.5");
            } else{
                var addArr={
                    'studentNumber':this.addArr.studentNumber,
                    'courseName':this.addArr.courseName,
                    'score':this.addArr.score
                };
                this.insertArr = addArr;
                //console.log(this.insertArr);
                insertAjax();
                this.resetStu();
            }
        },
        //复位新增表单
        resetStu:function(){
            this.addArr={
                'studentNumber':'',
                'courseName':'',
                'score':''
            }
        }
    }
})

function selectAjax(){
    reportCardVm.studyArr = [];
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." });
    $.ajax({
        url: "/src/selectScore.php",
        type: 'post',
        dataType: 'json',
        data:{"studentNumber": reportCardVm.selectNumber.studentNumber},
        success: function (data, status) {
            if(data == "1") {
                window.location = "/web/login.html";
            }
            console.log(reportCardVm.studyArr);
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
function insertAjax(){
    console.log(reportCardVm.insertArr);
    $.bootstrapLoading.start({ loadingTips: "正在插入数据，请稍候..." });
    $.ajax({
        url: "/src/insertScore.php",
        type: 'post',
        data: reportCardVm.insertArr,
        success: function (data, status) {
            $.bootstrapLoading.end();
            if(data != 1) {
                alert("录入失败");
            }
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err);
        }
    })
}

$("#inputScore").blur(function(){
    if(parseFloat($("#inputScore").val()) > 100){
        alert("输入的值不允许大于100");
        $("#inputScore").val("");
    }
})

$(document).ready(function(){
    var obj = $("#courseNameSelect");
    $.ajax({
        url: "/src/selectAllCourseName.php",
        type: 'post',
        success: function (data, status) {
            $.each(JSON.parse(data),function(index, value) {
                obj.append("<option value='"+value.name+"'>"+value.name+"</option>");
            })
        },
        fail: function (err, status) {
            console.log(err);
        }
    })
})