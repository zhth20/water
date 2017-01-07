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
        test: 'OK'
    };
    Customer.fn.data = {};
    //事件定义
    Customer.fn.events = function () {

    }
    Customer.fn.toAdd = function (config) {
        var self = this;

        $.when(self.queryUsers())
            .done(function () {
                config.data.users = self.data.users;
                self.openPage(config);
            });

    }
    Customer.fn.queryUsers = function (callback) {
        var self = this;
        if (self.data.users) return;
        return self.get('/user/queryAll', null)
            .done(function (data) {
                self.data.users = data.result;
            });
    }
    //初始化方法
    Customer.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new Customer();
});