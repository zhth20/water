/**
 * Created by Loyal on 2016/12/29.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var Meter = layui.base;
    //dom元素定义
    Meter.fn.elem = {};
    //全局参数定义
    Meter.fn.config = {
        test:'OK'
    };
    //事件定义
    Meter.fn.events = function () {

    }
    //初始化方法
    Meter.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new Meter();
});