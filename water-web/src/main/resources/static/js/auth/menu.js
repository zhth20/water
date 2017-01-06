
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var Menu = layui.base;
    //dom元素定义
    Menu.fn.elem = {};
    //全局参数定义
    Menu.fn.config = {
        test:'OK'
    };
    //事件定义
    Menu.fn.events = function () {

    }
    //初始化方法
    Menu.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new Menu();
});