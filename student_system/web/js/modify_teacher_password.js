function modifyTeacherPassword(event) {
    var username = $("#inputUsername").val()
    if ($("#inputUsername").val() == "" || $("#inputOldPssword").val() == "" || $("#inputNewPssword").val() == ""){
        alert("输入不能为空，请重新输入");
        var event = event || window.event;
        event.preventDefault();
    } else {
        $.ajax({
            url: "/src/updateTeacherPassword.php",
            type: 'post',
            dataType: 'json',
            data:{
                "username": $("#inputUsername").val(),
                "oldPassword": $("#inputOldPssword").val(),
                "newPassword": $("#inputNewPssword").val()
            },
            success: function (data, status) {
                console.log(data);
                if (data == 2) {
                    $.cookie("username", username, { expires: 7, path: '/', secure: false });
                    alert("修改密码成功");
                    window.location = "/index.html";
                } else if(data == 1) {
                    alert("修改密码失败");
                    window.location = "/index.html";
                } else if(data == 0) {
                    alert("账号或密码错误");
                } else if(data == 3) {
                    alert("未知错误");
                } else if(data == "Input can't be empty") {
                    alert("输入不能为空");
                }
            },
            fail: function (err, status) {
                console.log(err)
            }
        })
    }
}

function keyOK(){
    if (event.keyCode==13)   //回车键的键值为13
        $("#OK").click();  //调用查询按钮的登录事件
}

$("#back").click(function(){
    window.history.back();
});

$(".inputNewPsswordHide").hide();
$("#eye").click(function(){
    if ($(".inputNewPssword").attr("id") != "") {
        $(".inputNewPssword").hide();
        $(".inputNewPssword").attr("id", "");
        $(".inputNewPsswordHide").show();
        $(".inputNewPsswordHide").attr("id", "inputNewPssword");
        $(".inputNewPsswordHide").val($(".inputNewPssword").val());
    } else {
        $(".inputNewPsswordHide").hide();
        $(".inputNewPsswordHide").attr("id", "");
        $(".inputNewPssword").show();
        $(".inputNewPssword").attr("id", "inputNewPssword");
        $(".inputNewPssword").val($(".inputNewPsswordHide").val());
    }
});