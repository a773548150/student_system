
//初始化datatables
var table = $('#table').DataTable({
    "searching": false,
    "serverSide": true,
    "bProcessing": true,
    "bPaginate": true, //翻页功能
    "bLengthChange": true, //改变每页显示数据数量
    "bFilter": true, //过滤功能
    "bSort": false, //排序功能
    "sPaginationType": "full_numbers",
    "fnServerData": function (sSource, aoData, fnCallback) {
        $.ajax({
            type: "post",
            url: "http://localhost/student_system/src/select_student.php",
            data: {"studentNumber": $("#searchTitle").val()},
            dataType:"json",
            success: function (data) {
                data.recordsTotal = data.page.recordsTotal;
                data.recordsFiltered = data.page.recordsTotal;
                fnCallback(data);
            }
        });
    },
    "oLanguage": {
        "sLengthMenu": "每页显示 _MENU_ 条记录",
        "sZeroRecords": "抱歉， 没有找到",
        "sInfoEmpty": "没有数据",
        "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "前一页",
            "sNext": "后一页",
            "sLast": "尾页"
        },
        "sZeroRecords": "没有检索到数据",
    },
    "aoColumns": [
        {"data": "name"},
        {"data": "sex"},
        {"data": "age"},
        {"data": "major"}
    ]
});

$("#search").click(function () {
    table.ajax.reload();
});
///////////////////////////////////////////////////////////////////////////////
//增加
$("#add").click(function () {
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '240px'], //宽高
        btn: ['确定'],
        yes: function (index, layero) {
            var json = {
                "zy": $("#zhiy").val(),
                "xm": $("#name").val(),
                "xb": $("#sex").val(),
                "fov_ck": $("#aihao").val()
            };
            $.ajax({
                type: "POST",
                url: server + "user/addUser.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(json),
                dataType: "json",
                success: function (data) {
                    if (data.success == true) {
                        layer.msg(data.msg);
                    } else if (data.success == false) {
                        layer.msg(data.msg);
                    }
                }
            });
            layer.close(index);
            table.ajax.reload();
        },
        content: '职业：' + '<input type="text" name="" id="zhiy" value=""/>' + '<br>姓名：'
        + '<input type="text" name="" id="name" value=""/>' + '<br>性别：'
        + '<input type="text" name="" id="sex" value=""/>' + '<br>爱好：'
        + '<input type="text" name="" id="aihao" value=""/>'
    });
});

//选中一行触发
$('#example tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        adatid = "";
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        adatid = table.row(this).data().guid;
        adata = table.row(this).data().zy;
        bdata = table.row(this).data().xm;
        cdata = table.row(this).data().xb;
        ddata = table.row(this).data().fov;
    }
});
////////////////////////////////////////////////////////////////////////////////////////
//修改
$("#change").click(function () {
    if (adatid === '') {
        alert("请选中要修改的数据");
    } else {
        layer.open({
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '240px'], //宽高
            btn: ['确定'],
            yes: function (index, layero) {
                var json = {
                    "guid": adatid,
                    "zy": $("#cid").val(),
                    "xm": $("#cname").val(),
                    "xb": $("#csex").val(),
                    "fov_ck": $("#cage").val()
                };
                $.ajax({
                    type: "POST",
                    url: server + "user/updateUser.do",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(json),
                    dataType: "json",
                    success: function (data) {
                        if (data.success == true) {
                            layer.msg(data.msg);
                        } else if (data.success == false) {
                            layer.msg(data.msg);
                        }
                    }
                });
                layer.close(index);
                table.ajax.reload();
            },
            content: '职业：' + '<input type="text" name="" id="cid"/>' + '<br>姓名：'
            + '<input type="text" name="" id="cname"/>' + '<br>性别：'
            + '<input type="text" name="" id="csex"/>' + '<br>爱好：'
            + '<input type="text" name="" id="cage"/>'
        });
    }
    $("#cid").val(adata);
    $("#cname").val(bdata);
    $("#csex").val(cdata);
    $("#cage").val(ddata);
});

////////////////////////////////////////////////////////////////////////////////
//删除
$("#del").click(function () {
    if (adatid === '') {
        alert("请删除要修改的数据");
    } else {
        var json = {
            "guid": adatid
        };
        $.ajax({
            type: "POST",
            url: server + "user/deleteUser.do",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            dataType: "json",
            success: function (data) {
                if (data.success == true) {
                    layer.msg(data.msg);
                } else if (data.success == false) {
                    layer.msg(data.msg);
                }
            }
        });
        table.ajax.reload();
    }
});