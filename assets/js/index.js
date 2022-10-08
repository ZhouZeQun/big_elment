$(function () {
    const layer = layui.layer

    // 获取用户基本信息
    getuserinfo()

    // 退出点击事件
    $('#tuichu').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1清空本地存储token
            localStorage.removeItem('token')
            // 2跳转页面到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })

    

})

function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.code !== 0) {
                return layer.msg('身份验证失败')
            }
            gendeAvatarr(res.data)
        }
    })
}

   // 渲染genderAvatar函数cfffff
   function gendeAvatarr(user) {
    // 渲染文本
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase()
        $('.avatar').html(first).show()
    }

}
