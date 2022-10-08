$(function() {
    const form = layui.form
    const layer = layui.layer
    getUserinfo()

    // 获取用户基本信息
    function getUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if(res.code!==0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                form.val('formuserinfo',res.data)
            }
        })
    }

// 自定义表单验证
form.verify({
    nickname: function(value) {
        if(value.length>6) {
            return '用户昵称长度不能大于6!'
        }
    } 
})

// 重置点击事件
$('#btnReset').on('click',function(e) {
    e.preventDefault()
    getUserinfo()
})

// 提交更改表单事件
$('.layui-form').on('submit',function(e) {
e.preventDefault()
$.ajax({
    method: 'PUT',
    url: '/my/userinfo',
    data: $(this).serialize(),
    success(res) {
        if(res.code!==0) {
            return layer.msg('用户信息更改失败！')
        }
        layer.msg('用户信息更改成功')
        console.log(res);
        window.parent.getuserinfo()
    }
})
})


})