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

var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        selectNumber: {'studentNumber':''},
        studyArr:[],//成绩花名册
        insertArr:{},
        addArr:{'studentNumber':'','courseNumber':'','score':''},//新增的表单字段
    },
    methods:{
        //新增成绩
        submitStu:function(){
            var addArr={
                'studentNumber':this.addArr.studentNumber,
                'courseNumber':this.addArr.courseNumber,
                'score':this.addArr.score
            };
            this.insertArr = addArr;
            //console.log(this.insertArr);
            insertAjax();
            this.resetStu();
        },
        //复位新增表单
        resetStu:function(){
            this.addArr={
                'studentNumber':'',
                'courseNumber':'',
                'score':''
            }
        }
    }
})

function selectAjax(){
    reportCardVm.studyArr = [];
    $.ajax({
        url: "/src/select_score.php",
        type: 'post',
        dataType: 'json',
        data:{"studentNumber": reportCardVm.selectNumber.studentNumber},
        success: function (data, status) {
            console.log(reportCardVm.studyArr);
            $.each(data,function(index, value){
                reportCardVm.studyArr.push(value);
            });
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}
function insertAjax(){
    console.log(reportCardVm.insertArr);
    $.ajax({
        url: "/src/insert_score.php",
        type: 'post',
        data: reportCardVm.insertArr,
        success: function (data, status) {
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err);
        }
    })
}
