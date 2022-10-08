$(function() {
    const form = layui.form
    const layer = layui.layer
    // 密码要求验证
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          newpsd:function(value) {
            if(value==$('[name="old_pwd"]').val()){
                return '新旧密码不能一致'
            }
          },
          renewpsd:function(value) {
            if(value!==$('[name="new_pwd"]').val()){
                return '两次密码不一致'
            }
          }
    })

    // 提交表单事件
    $('.layui-form').on('submit',function(e) {
        e.preventDefault() 
        $.ajax({
            method: 'PATCH',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                if(res.code!==0) {
                    console.log(res);
                    return layer.msg('更改密码失败！')
                   
                }
                layer.msg('更改密码成功！')
                console.log(res);
                $('.layui-form')[0].reset()
            }
        })
    })
})