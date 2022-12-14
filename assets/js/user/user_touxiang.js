$(function () {
    const layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    const $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 上传点击事件
    $('#setbtn').on('click', function () {
        $('#file').click()
    })

    // 文件按钮change事件
    $('#file').on('change', function (e) {
        const fileList = e.target.files
        console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请发送图片！')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $('#sureBtn').on('click', function () {
        const dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串 
            // 上传裁剪图片到服务器
            $.ajax({
                method: 'PATCH',
                url: '/my/update/avatar',
                data: {
                    avatar:dataURL
                },
                success(res) {
                    if(res.code!==0) {
                        return layer.msg('头像更换失败！')
                    }
                    layer.msg('头像更换成功！')
                    window.parent.getuserinfo()
                }
            })
    })



})

