$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {

            if (value !== $('[name=newPwd]').val()) {
                console.log(newPwd.value())
                return '两次密码输入不一致'
            }
        }
    })

    // 表单提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                //重置表单  form表单元素有一个reset的重置方法 但是只能通过原生的dom元素才能调用 所以把jQuery对象转换为dom元素$('layui-form')[0]
                $('.layui-form')[0].reset();

            }
        })
    })
})