$(document).ready(function() {
    selectAjax();

    $('#timePicker-insert').datetimepicker({
        minView: "hour",
        format: "yyyy-mm-dd hh:ii",
        autoclose: true,
        todayBtn: true,
        language:'zh-CN',
        pickerPosition:"bottom-left"
    });
});

var reportCardVm = new Vue({
    el:'#reportCard',
    data:{
        courseMessage: {'courseMessage':''},
        courseArr:[],//课程花名册
        insertArr:{},
        addArr:{'number':'','name':'','credit':'','start_time':''},//新增的表单字段
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
                    self.addArr.start_time = value;
                });
        },
        //将日历插件的值赋值给 editArr.start_time
        dateEdit:function() {
            var self = this;
            $('#timePicker-edit').datetimepicker({
                minView: "hour",
                format: "yyyy-mm-dd hh:ii",
                autoclose: true,
                todayBtn: true,
                language:'zh-CN',
                pickerPosition:"bottom-left"
            });
            $('#timePicker-edit').datetimepicker()
                .on('hide', function (ev) {
                    var value = $("#timePicker-edit").val();
                    self.editArr.start_time = value;
                });
        },
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
            for(var i=0,len=this.courseArr.length;i<len;i++){
                if(id === this.courseArr[i]['number'] ){
                    if (this.editArr.number == '' || this.editArr.name == '' || this.editArr.credit == '' || this.editArr.start_time == '') {
                        alert("输入不能为空！");
                    } else if(this.editArr.credit.toString().indexOf(".") < 0 ||this.editArr.credit.toString().split(".")[1].length != 1){
                        alert("学分按规范输入，如3.5");
                    } else if (this.editArr.start_time.length < 10) {
                        alert("开课时间输入过短！");
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
            for(var i=0,len=this.courseArr.length;i<len;i++){
                if(id === this.courseArr[i]['number'] ){
                    if (confirm("是否删除课程号为：" + this.courseArr[i]['number'])) {
                        deleteAjax(this.courseArr[i]['number']);
                    }
                    break;
                }
            }
        },
        //新增成绩
        submitStu:function(){
            if (this.addArr.number == '' || this.addArr.name == '' || this.addArr.credit == '' || this.addArr.start_time == '') {
                alert("输入不能为空！");
            }else if (this.addArr.start_time.length < 10) {
                alert("开课时间输入过短！");
            } else {
                var addArr={
                    'number':this.addArr.number,
                    'name':this.addArr.name,
                    'credit':this.addArr.credit,
                    'start_time':this.addArr.start_time
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
                'credit':'',
                'start_time':''
            }
        }

    },
    updated: function() {
        this.dateDefind();
        this.dateEdit();
    },
    computed:{
        //存储当前编辑的对象
        editArr:function(){
            var editO={};
            for(var i=0,len=this.courseArr.length;i<len;i++){
                if(this.nowEditCol === this.courseArr[i]['number'] ){
                    editO= this.courseArr[i];
                    break;
                }
            }
            return {
                'number':editO.number,
                'name':editO.name,
                'credit':editO.credit,
                'start_time':editO.start_time
            }
        }
    }
})

// 用于查询的ajax
function selectAjax(){
    reportCardVm.courseArr = [];
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." }); // loading遮盖层开始
    $.ajax({
        url: "/src/selectCourse.php",
        type: 'post',
        dataType: 'json',
        data:{"courseMessage": reportCardVm.courseMessage.courseMessage}, // 数据为vue的绑定数据
        success: function (data, status) {
            if(data == "1") {
                window.location = "/web/login.html";
            }
            $.each(data,function(index, value){
                if (value.status != false) {
                    value.start_time = value.start_time.slice(0, 16);
                    reportCardVm.courseArr.push(value); // 保存查询数据到courseArr中
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
function insertAjax(){
    console.log(reportCardVm.insertArr);
    $.bootstrapLoading.start({ loadingTips: "正在插入数据，请稍候..." });
    $.ajax({
        url: "/src/insertCourse.php",
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

function updateAjax(){
    $.bootstrapLoading.start({ loadingTips: "正在修改数据，请稍候..." });
    $.ajax({
        url: "/src/updateCourse.php",
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

function deleteAjax(number){
    console.log(number);
    $.bootstrapLoading.start({ loadingTips: "正在删除数据，请稍候..." });
    $.ajax({
        url: "/src/deleteCourse.php",
        type: 'post',
        data: {'number': number},
        success: function (data, Cstatus) {
            $.bootstrapLoading.end();
            if (data != 1){
                alert("删除失败");
            }
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}
$("#inputCredit").blur(function(){
    if(parseFloat($("#inputCredit").val()) > 100){
        alert("输入的值不允许大于100");
        $("#inputCredit").val("");
    }
})
