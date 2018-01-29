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
        studentMessage: {'studentMessage':''},
        studyArr:[],//成绩花名册
        insertArr:{},
        addArr:{'number':'','name':'','sex':'','age':'','major':''},//新增的表单字段
        nowEditCol:-1,//当前编辑的行
        editStatus:false,//当前是否在编辑状态
        searchTxt:''//搜索字段
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
                    this.editArr.sex= this.editArr.sex == "男" ? "1" : "0";
                    updateAjax();
                    break;
                }
            }
            this.nowEditCol=-1;
        },
        //删除索引index数据
        deleteStu:function(id){
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(id === this.studyArr[i]['number'] ){
                    deleteAjax(this.studyArr[i]['number']);
                    break;
                }
            }
        },
        //新增成绩
        submitStu:function(){
            var addArr={
                'number':this.addArr.number,
                'name':this.addArr.name,
                'sex':(this.addArr.sex == '男') ? '1' : '0',
                'age':this.addArr.age,
                'major':this.addArr.major
            };
            this.insertArr = addArr;
            //console.log(this.insertArr);
            insertAjax();
            this.resetStu();
        },
        //复位新增表单
        resetStu:function(){
            this.addArr={
                'number':'',
                'name':'',
                'sex':'',
                'age':'',
                'major':''
            }
        }
    },
    computed:{

        //存储当前编辑的对象
        editArr:function(){
            var editO={};
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ){
                    editO= this.studyArr[i];
                    break;
                }
            }
            return {
                'number':editO.number,
                'name':editO.name,
                'sex':editO.sex ,
                'age':editO.age,
                'major':editO.major
            }
        }
    }
})

function selectAjax(){
    reportCardVm.studyArr = [];
    $.ajax({
        url: "/src/select_student.php",
        type: 'post',
        dataType: 'json',
        data:{"studentMessage": reportCardVm.studentMessage.studentMessage},
        success: function (data, status) {
            console.log(reportCardVm.studyArr);
            $.each(data,function(index, value){
                value.sex = (value.sex == 1) ? "男":"女";
                if (value.status != false) {
                    value.age = toAge(value.age);
                    reportCardVm.studyArr.push(value);
                }
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
        url: "/src/insert_student.php",
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

function updateAjax(){
    $.ajax({
        url: "/src/update_student.php",
        type: 'post',
        data: reportCardVm.editArr,
        success: function (data, status) {
            console.log(reportCardVm.editArr);
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}

function deleteAjax(number){
    console.log(number);
    $.ajax({
        url: "/src/delete_student.php",
        type: 'post',
        data: {'number': number},
        success: function (data, status) {
            console.log(number);
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}