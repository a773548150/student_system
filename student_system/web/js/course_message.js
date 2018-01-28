var reportCardVm=new Vue({
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
                    updateAjax();
                    break;
                }
            }
            this.nowEditCol=-1;
        },
        //删除索引index数据
        deleteStu:function(id){
            for(var i=0,len=this.courseArr.length;i<len;i++){
                if(id === this.courseArr[i]['number'] ){
                    deleteAjax(this.courseArr[i]['number']);
                    break;
                }
            }
        },
        //新增成绩
        submitStu:function(){
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

function selectAjax(){
    reportCardVm.courseArr = [];
    $.ajax({
        url: "/src/select_course.php",
        type: 'post',
        dataType: 'json',
        data:{"courseMessage": reportCardVm.courseMessage.courseMessage},
        success: function (data, status) {
            console.log(reportCardVm.courseArr);
            $.each(data,function(index, value){
                if (value.status != false) {
                    reportCardVm.courseArr.push(value);
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
        url: "/src/insert_course.php",
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
        url: "/src/update_course.php",
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
        url: "/src/delete_course.php",
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