/**
 * Created by Loyal on 2016/12/29.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var Company = layui.base;
    //dom元素定义
    Company.fn.elem = {};
    //全局参数定义
    Company.fn.config = {
        test:'OK'
    };
    //事件定义
    Company.fn.events = function () {

    }
    //初始化方法
    Company.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new Company();
});