var reportCardVm=new Vue({
    el:'#reportCard',
    data:{
        studentMessage: {'studentMessage':''},
        studyArr: [],//成绩花名册
        insertArr:{},
        storeAge: [],
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
            // 把年龄转换为y-m-d格式
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ) {
                    this.studyArr[i].age = toAge(this.editArr.age);
                }
            }
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
            if (this.addArr.number == '' || this.addArr.name == '' || this.addArr.sex == '' || this.addArr.age == '' || this.addArr.major == '') {
                alert("输入不能为空！");
            } else if (this.addArr.number.length < 13) {
                alert("学号不能少于13位！");
            } else if (this.addArr.age.length < 10) {
                alert("年龄按规范输入，如1999-10-01");
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
    computed:{

        //存储当前编辑的对象
        editArr:function(){
            var editO={};
            for(var i=0,len=this.studyArr.length;i<len;i++){
                if(this.nowEditCol === this.studyArr[i]['number'] ){
                    editO = this.studyArr[i];
                    editO.age = this.storeAge[i];
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
    $.bootstrapLoading.start({ loadingTips: "正在查询数据，请稍候..." });
    $.ajax({
        url: "/src/select_student.php",
        type: 'post',
        dataType: 'json',
        data:{"studentMessage": reportCardVm.studentMessage.studentMessage},
        success: function (data, status) {
            console.log(reportCardVm.studyArr);
            $.each(data,function(index, value){
                value.sex = (value.sex == 1 || value.sex == "男") ? "男":"女";
                if (value.status != false) {
                    reportCardVm.storeAge.push(value.age);
                    value.age = toAge(value.age);
                    reportCardVm.studyArr.push(value);
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
        url: "/src/insert_student.php",
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
        url: "/src/update_student.php",
        type: 'post',
        data: reportCardVm.editArr,
        success: function (data, status) {
            console.log(reportCardVm.editArr);
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
    console.log(number);
    $.ajax({
        url: "/src/delete_student.php",
        type: 'post',
        data: {'number': number},
        success: function (data, status) {
            console.log(number);
            $.bootstrapLoading.end();
            selectAjax();
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
}