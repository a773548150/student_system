// bootstrap inputfile的设置
$("#excelFile").fileinput({
    language: 'zh', //设置语言
    showPreview : false //是否显示预览
});

// 返回前页
function backToStudentPage(){
    history.go(-1);
}
