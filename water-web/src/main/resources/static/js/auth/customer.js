/**
 * Created by Loyal on 2016/12/20.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var Customer = layui.base;
    //dom元素定义
    Customer.fn.elem = {};
    //全局参数定义
    Customer.fn.config = {
        test:'OK'
    };
    //事件定义
    Customer.fn.events = function () {

    }
    //初始化方法
    Customer.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new Customer();
});