/**
 * Created by Loyal on 2016/12/20.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var User = layui.base;
    //dom元素定义
    User.fn.elem = {};
    //全局参数定义
    User.fn.config = {
        test: 'OK'
    };
    //事件定义
    User.fn.events = function () {

    }
    User.fn.toAdd = function (config) {
        var self = this;

        this.queryRoles(function (data) {
            config.data = {roles: data.result};
            config.callback = function () {
                self.add();
            }

            self.openPage(config);

        });

    }
    User.fn.queryRoles = function (callback) {
        this.get('/role/queryAll', null, function (data) {
            callback(data)
        });
    }
    //初始化方法
    User.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new User();
});