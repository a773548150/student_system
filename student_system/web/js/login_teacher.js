function login(event) {
    var username = $("#inputUsername").val()
    if ($("#inputUsername").val() == '' || $("#inputPssword").val() == ''){
        alert("账号密码不能为空，请重新输入");
        var event = event || window.event;
        event.preventDefault();
    } else {
        $.ajax({
            url: "/src/login_teacher.php",
            type: 'post',
            dataType: 'json',
            data:{
                "username": $("#inputUsername").val(),
                "password": $("#inputPassword").val()
            },
            success: function (data, status) {
                console.log(data);
                if (data == 1) {
                    $.cookie("username", username, { path: '/', secure: false });
                    window.location = "/web/teacher.html";
                } else if(data == 2) {
                    alert("已经登录");
                    window.location = "/web/teacher.html";
                } else if(data == 0) {
                    alert("账号或密码错误");
                }
            },
            fail: function (err, status) {
                console.log(err)
            }
        })
    }
}

function keyLogin(){
    if (event.keyCode==13)   //回车键的键值为13
        $("#submit").click();  //调用查询按钮的登录事件
}