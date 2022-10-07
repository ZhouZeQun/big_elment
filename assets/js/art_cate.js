$(function() {
const layer = layui.layer

    function artcateList() {
        $.ajax({
            method: 'GET',
            url: 'http://big-event-vue-api-t.itheima.net/my/cate/list',
            success(res) {
                if(res.code!==0) {
                    layer.msg('获取列表失败')
                }
               template('tpl_cate',res.data)
            }
        })
    }

    // 添加类别点击事件
    let index = undefined
    $('#btnAdd').on('click',function() {
        // 打开弹窗
       index = layer.open({
            type: 1,
            title: '添加分类名称',
            area: ['500px', '260px'],
            content: $('#addDialog').html()
          });    
    })

// 添加列表框点击事件
$('body').on('submit','#add_form',function(e) {
e.preventDefault()
console.log('ok');
$.ajax({
    method: 'POST',
    url: 'http://big-event-vue-api-t.itheima.net/my/cate/add',
    data:$(this).serialize(),
    headers: {
        Authorization:localStorage.getItem('token')||''
    },
    success(res){
        if(res.code!==0) {
            return layer.msg('添加列表失败')
        }
        layer.msg('添加列表成功')
        layer.close(index)
        artcateList()
    }
})
})


})