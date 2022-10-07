$(function () {
    const layer = layui.layer
    // 获取用户基本信息
    function getuserinfo() {
        $.ajax({
            method: 'GET',
            url: 'http://big-event-vue-api-t.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('身份验证失败')
                }
                genderAvatar(res.data)
                layer.msg('身份验证成功')
            },
            complete(res) {
                // console.log('回调了complete函数');
                // console.log(res);
                if (res.responseJSON.code == 1 && res.responseJSON.message == '身份认证失败！') {
                    // 1清空本地存储token
                    localStorage.removeItem('token')
                    // 2跳转页面到登录页面
                    location.href = '/login.html'
                }
            }
        })
    }
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


    // 渲染genderAvatar函数
    function genderAvatar(user) {
        // 渲染文本
        let name = user.nickname || user.username
        $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
        // 渲染头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', 'user.user_pic').show()
            $('.avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            const first = name[0].toUpperCase()
            $('.avatar').html(first).show()
        }

    }













})

