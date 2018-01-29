$(document).ready(function(){
    console.log($.cookie('username'));
    if($.cookie('username')===undefined) {
        window.location="/web/login.html";
    }
});