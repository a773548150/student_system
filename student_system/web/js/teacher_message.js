$(document).ready(function() {
    selectAjax();
});

var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        teacherMessage: {'teacherMessage':''},
        teacherArr: [],
        insertArr:{},
        addArr:{'number':'','name':'','username':'','password':''},//新增的表单字段
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
            for(var i=0,len=this.teacherArr.length;i<len;i++){
                if(id === this.teacherArr[i]['number'] ){
                    if (this.editArr.number == '' || this.editArr.name == '' || this.editArr.username == '' || this.editArr.password == '') {
                        alert("输入不能为空！");
                    } else if (this.editArr.number.length < 13) {
                        alert("编号不能少于13位！");
                    } else {
                        updateAjax();
                    }
                    break;
                }
            }
            this.nowEditCol=-1;
        },
        //删除索引index数据
        deleteStu:function(id){
            for(var i=0,len=this.teacherArr.length;i<len;i++){
                if(id === this.teacherArr[i]['number'] ){
                    deleteAjax(this.teacherArr[i]['number']);
                    break;
                }
            }
        },
        //新增成绩
        submitStu:function(){
            if (this.addArr.number == '' || this.addArr.name == '' || this.addArr.username == '' || this.addArr.password == '') {
                alert("输入不能为空！");
            } else if (this.addArr.number.length < 13) {
                alert("学号不能少于13位！");
            } else {
                var addArr={
                    'number':this.addArr.number,
                    'name':this.addArr.name,
                    'username':this.addArr.username,
                    'password':this.addArr.password
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
                'number':'',
                'name':'',
                'username':'',
                'password':''
            }
        }
    },
    computed:{
        //存储当前编辑的对象
        editArr:function(){
            var editO={};
            for(var i=0,len=this.teacherArr.length;i<len;i++){
                if(this.nowEditCol === this.teacherArr[i]['number'] ){
                    editO = this.teacherArr[i];
                    break;
                }
            }
            return {
                'number':editO.number,
                'name':editO.name,
                'username':editO.username ,
                'password':editO.password
            }
        }
    }
});

function selectAjax(){
    reportCardVm.teacherArr = [];
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." });
    $.ajax({
        url: "/src/selectTeacher.php",
        type: 'post',
        dataType: 'json',
        data:{"teacherMessage": reportCardVm.teacherMessage.teacherMessage},
        success: function (data, status) {
            $.each(data,function(index, value){
                if (value.status != false) {
                    reportCardVm.teacherArr.unshift(value);
                }
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
        url: "/src/insertTeacher.php",
        type: 'post',
        data: reportCardVm.insertArr,
        success: function (data, status) {
            $.bootstrapLoading.end();
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err);
        }
    })
}

function updateAjax(){
    $.bootstrapLoading.start({ loadingTips: "正在修改数据，请稍候..." });
    $.ajax({
        url: "/src/updateTeacher.php",
        type: 'post',
        data: reportCardVm.editArr,
        success: function (data, status) {
            $.bootstrapLoading.end();
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}

function deleteAjax(number){
    $.bootstrapLoading.start({ loadingTips: "正在删除数据，请稍候..." });
    $.ajax({
        url: "/src/deleteTeacher.php",
        type: 'post',
        data: {'number': number},
        success: function (data, status) {
            $.bootstrapLoading.end();
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}