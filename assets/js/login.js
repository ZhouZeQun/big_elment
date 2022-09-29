// 入口函数
$(function() {

    // Ajax参数转化函数
    const JsonData = (source)=> {
        let str = {}
        source.split('&').forEach((item)=> {
           let arr = item.split('=')
           str[arr[0]] = arr[1]
        })
        return JSON.stringify(str)
    }


    // 去注册点击事件
    $('#go_reg').on('click',function(e) {
        e.preventDefault()
        $('.reg_wrap').show()
        $('.login_wrap').hide()
    })
    $('#go_login').on('click',function(e) {
        e.preventDefault()
        $('.reg_wrap').hide()
        $('.login_wrap').show()
    })

    /* 判断输入符合与否 */
    const form = layui.form
    const layer = layui.layer
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
          repsd : function(value) {
            if($('#password').val()!==value) {
                return '两次密码不一致'
            }
          }
    })

    // 注册api接口部分
    $('#form_reg').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://big-event-vue-api-t.itheima.net/api/reg',
            contentType : 'application/Json',
            data: JsonData($(this).serialize()),
            success(res) {
                if(res.code!==0) {
                  return  layer.msg(res.message);
                }
                layer.msg('注册成功！');
                $('#go_login').click()
            }
        })
    })

    // 登录api接口部分
    $('#form_login').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://big-event-vue-api-t.itheima.net/api/login',
            contentType : 'application/Json',
            data: JsonData($(this).serialize()),
            success(res) {
                if(res.code!==0) {
                  return  layer.msg(res.message);
                }
                // 本地存储token
                localStorage.setItem('token',res.token)
                // 登录成功跳转首页页面
                location.href = '/index.html'
            }
        })
    })



























})