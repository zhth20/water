/**
 * Created by Loyal on 2016/12/20.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var Role = layui.base;
    //dom元素定义
    Role.fn.elem = {};
    //全局参数定义
    Role.fn.config = {
        test:'OK'
    };
    //事件定义
    Role.fn.events = function () {

    }
    //初始化方法
    Role.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new Role();
});