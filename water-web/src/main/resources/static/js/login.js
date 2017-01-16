layui.config({
    base: '/static/js/common/'
});

if(!(window.top === window.self)){
    window.parent.location.reload();
}
layui.use(['element', 'form', 'article'], function () {
    //导航的hover效果、二级菜单等功能，需要依赖element模块
    var $ = layui.jquery,
        element = layui.element(),
        form = layui.form(),
        layer = layui.layer;
    layui.article($);
    $('.beg-login-box').fadeIn();
    form.on('submit(login)', function (data) {
        $.post('/login', data.field, function (data) {
            layer.msg(data.message, {time: 1000}, function () {
                if (data.status === 'OK') window.location.href = "/";
                layer.closeAll();
            });
        });
        return false;
    });

    $(".layui-canvs").jParticle({
        background: "#000",
        color: "#009688"
    });

    $(window).on('resize', function(){
        $('.layui-canvs').width($(window).width()).height($(window).height());
    });
});