$(document).ready(function() {
    $("#submit").click(function(e) {
        $.ajax({
            type:"post",
            url:"http://localhost/student_system/src/select_course.php",
            data:{"courseMessage": $("#courseMessage").val()},
            dataType:"json", // 因为PHP返回数据是JSON格式，所以这里类似要用JSON
            success: function(data) {
                //alert(data.length);
                createShowingTable(data);
            },
            error: function() {

            }
        });
    });

    function createShowingTable(data) {
        //获取后台传过来的jsonData,并进行解析

        //此处需要让其动态的生成一个table并填充数据
        var tableStr = "";
        var len = data.length;
        for (var i = 0; i < len; i++) {
            tableStr = tableStr + "<tr><td align='center'>" + data[i].number
                + "</td>" + "<td align='center'>" + data[i].name + "</td>"
                + "<td align='center'>" + data[i].credit + "</td>"
                + "<td align='center'>" + data[i].start_time + "</td></tr>";
        }
        //将动态生成的table添加的事先隐藏的div中.
        $("#dataTable").html(tableStr);
    }
});
