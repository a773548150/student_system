$(document).ready(function() {
    selectAjax();

    $('#timePicker-insert').datetimepicker({
        minView: "month",
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        language:'zh-CN',
        pickerPosition:"bottom-left"
    });
});

var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        studentMessage: {'studentMessage':''},
        studyArr: [],
        insertArr:{},
        storeAge: [],
        addArr:{'number':'','name':'','sex':'','age':'','major':''},//新增的表单字段
        nowEditCol:-1,//当前编辑的行
        editStatus:false,//当前是否在编辑状态
        searchTxt:''//搜索字段
    },
    methods:{
        //将日历插件的值赋值给 addArr.age
        dateDefind:function() {
            var self = this;
            $('#timePicker-insert').datetimepicker()
                .on('hide', function (ev) {
                    var value = $("#timePicker-insert").val();
                    self.addArr.age = value;
                });
        },
        //将日历插件的值赋值给 editArr.age
        dateEdit:function() {
            var self = this;
            $('#timePicker-edit').datetimepicker({
                minView: "month",
                format: "yyyy-mm-dd",
                autoclose: true,
                todayBtn: true,
                language:'zh-CN',
                pickerPosition:"bottom-left"
            });
            $('#timePicker-edit').datetimepicker()
                .on('hide', function (ev) {
                    var value = $("#timePicker-edit").val();
                    self.editArr.age = value;
                });
        },
        turnToDigitally:function() {
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ) {
                    this.studyArr[i].age = toAge(this.editArr.age);
                }
            }
        },
        //启动索引index数据编辑
        startEdit:function(id){
            this.turnToDigitally();
            this.nowEditCol=id;
        },
        //取消编辑状态
        cancelEdit:function(){
            // 把y-m-d格式转换为年龄
            this.turnToDigitally();
            this.nowEditCol=-1;
        },
        //启动索引index数据修改确认
        sureEdit:function(id){
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(id === this.studyArr[i]['number'] ){
                    this.editArr.sex= this.editArr.sex == "男" ? "1" : "0";
                    if (this.editArr.number == '' || this.editArr.name == '' || this.editArr.sex == '' || this.editArr.age == '' || this.editArr.major == '') {
                        alert("输入不能为空！");
                    } else if (this.editArr.number.length < 13) {
                        alert("学号不能少于13位！");
                    } else if (this.editArr.age.length < 10) {
                        alert("年龄按规范输入，如1999-10-01");
                    } else {
                        updateAjax();
                    }
                    break;
                }
            }
            // 当按确定时，将处于编辑的Y-m-d模式转为年龄
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ){
                    this.studyArr[i].age = toAge(this.studyArr[i].age);
                    break;
                }
            }

            this.nowEditCol=-1;
        },
        //删除索引index数据
        deleteStu:function(id){
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(id === this.studyArr[i]['number'] ){
                    if (confirm("是否删除？")) {
                        deleteAjax(this.studyArr[i]['number']);
                    }
                    break;
                }
            }
        },
        //新增成绩
        submitStu:function(){
            if (this.addArr.number == '' || this.addArr.name == '' || this.addArr.sex == '' || this.addArr.age == '' || this.addArr.major == '') {
                alert("输入不能为空！");
            } else if (this.addArr.number.length < 13) {
                alert("学号不能少于13位！");
            } else {
                var addArr={
                    'number':this.addArr.number,
                    'name':this.addArr.name,
                    'sex':(this.addArr.sex == '男' || this.addArr.sex == '1') ? '1' : '0',
                    'age':this.addArr.age,
                    'major':this.addArr.major
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
                'sex':'',
                'age':'',
                'major':''
            }
        }
    },
    updated: function () {
        this.dateDefind();
        this.dateEdit();
    },
    computed:{

        //存储当前编辑的对象
        editArr:function(){
            var editO={};
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ){
                    editO = this.studyArr[i];
                    editO.age = this.storeAge[i]; // 将进入编辑模式的年龄转为Y-m-d格式
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
    reportCardVm.storeAge = [];
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." });
    $.ajax({
        url: "/src/selectStudent.php",
        type: 'post',
        dataType: 'json',
        data:{"studentMessage": reportCardVm.studentMessage.studentMessage},
        success: function (data, status) {
            $.each(data,function(index, value){
                value.sex = (value.sex == 1 || value.sex == "男") ? "男":"女";
                if (value.status != false) {
                    reportCardVm.storeAge.unshift(value.age); // 存储Y-m-d格式的年龄到storeAge中
                    value.age = toAge(value.age);
                    reportCardVm.studyArr.unshift(value);
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
    $.bootstrapLoading.start({ loadingTips: "正在插入数据，请稍候..." });
    $.ajax({
        url: "/src/insertStudent.php",
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
        url: "/src/updateStudent.php",
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
        url: "/src/deleteStudent.php",
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