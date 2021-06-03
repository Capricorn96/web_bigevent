$(function() {
    var form = layui.form

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
        // alert(1);
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo/',
            // 快速拿到表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 调用父页面中的方法 重新渲染一下用户的头像和信息
                window.parent.getUserInfo();
            }
        })
    })
})