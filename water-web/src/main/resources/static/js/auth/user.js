/**
 * Created by Loyal on 2016/12/20.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('base', function () {
    var User = layui.base;
    var $ = layui.jquery;
    //dom元素定义
    User.fn.elem = {};
    //全局参数定义
    User.fn.config = {
        test: 'OK'
    };
    User.fn.data = {
        roles: null
    };
    //事件定义
    User.fn.events = function () {

    }
    User.fn.toAdd = function (config) {
        var self = this;

        if (self.data.roles) {
            config.data.roles = self.data.roles;
            self.openPage(config);
        } else {
            $.when(self.queryRoles()).done(function(){
                config.data.roles = self.data.roles;
                self.openPage(config);
            });
        }

    }

    User.fn.toUpdate = function (config) {

        var self = this;
        if (config.url && config.url != '') {
            $.when(
                self.get(config.url, null).done(function (data) {
                    config.data = data.result;
                }),
                self.queryRoles(),
                self.queryStatus()
            ).done(function(){
                config.data.roles = self.data.roles;
                config.data.statusAll = self.data.status;
                self.openPage(config);
            });
        } else {
            layer.msg('数据链接地址不能为空');
        }

    }

    User.fn.queryStatus = function () {
        var self = this;
        if (self.data.status) return;
        return self.get('/user/status', null)
            .done(function (data) {
                self.data.status = data.result;
            });
    }

    User.fn.queryRoles = function () {
        var self = this;
        if (self.data.roles) return;
        return self.get('/role/queryAll', null)
            .done(function (data) {
                self.data.roles = data.result;
            });
    }
    //初始化方法
    User.fn.ready = function () {
        //layer.msg(this.config.test);
    }
    //实例化
    new User();
});