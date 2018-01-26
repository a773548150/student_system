function login(event) {
    if ($("#inputUsername").val() == '' || $("#inputPssword").val() == ''){
        alert("账号密码不能为空，请重新输入");
        var event = event || window.event;
        event.preventDefault();
    }
}