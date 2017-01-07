/**
 * Created by Loyal on 2016/12/16.
 */
layui.define(['icheck', 'laypage', 'layer', 'form', 'laydate', 'laytpl', 'underscore'], function (exports) {
    var $ = layui.jquery,
        _ = layui.underscore,
        pager = layui.laypage,
        form = layui.form(),
        laytpl = layui.laytpl,
        layer = layui.layer,
        player = window.layer;

    var Base = function () {
        this.elems = {
            queryForm: '#query-form',
            queryTrigger: '#query-trigger',
            addForm: '#add-form',
            addTrigger: '#add-trigger',
            updateForm: '#update-form',
            updateTrigger: '.update-trigger',
            detailForm: '#detail-form',
            detailTrigger: '.detail-trigger',
            deleteTrigger: '#delete-trigger',
            importTrigger: '#import-trigger',
            exportTrigger: '#export-trigger',
            selectedAll: '#selected-all'
        };

        this.configs = {
            saveTitle: '<i class="fa fa-save"></i> 保存',
            backTitle: '<i class="fa fa-reply"></i> 返回',
            pageIndex: 0,
            loadIndex: 0,
            initFlag: true,
            cacheData: {}
        };

        //jquery 序列化Form为json
        $.fn.serializeJson = function () {
            var serializeObj = {};
            $(this.serializeArray()).each(function () {
                serializeObj[this.name] = this.value;
            });
            return serializeObj;
        }

        this.init();
    }

    Base.fn = Base.prototype;

    /**
     * 初始化操作
     */
    Base.fn.init = function () {
        var self = this;
        self.bindEvents();
        self.events();
        self.ready();
        self.toPage(1);
    }

    Base.fn.findByCode = function(arr, code){
        return _.find(arr, function(item){
            return item['code']==code;
        })['message'];
    }

    /**
     * 事件绑定
     */
    Base.fn.bindEvents = function () {
        var self = this;
        //查询按钮事件
        form.on('submit(query-trigger)', function (data) {
            self.configs.initFlag = true;
            self.toPage(1);
            return false;
        });

        //保存按钮事件
        form.on('submit(save-trigger)', function (data) {
            var formId = '#' + $(data.form).attr('id');
            switch (formId) {
                case self.elems.addForm :
                    self.add();
                    break;
                case self.elems.updateForm :
                    self.update();
                    break;
            }
            return false;
        });

        //查询按钮事件
        $(document).on('click', '.back-trigger', function (data) {
            layer.close(self.configs.pageIndex);
            return false;
        });

        //翻页快捷键
        //$(document).on('keyup', function (event) {
        //    switch (event.keyCode) {
        //        //右箭头
        //        case 39:
        //            $('a.layui-laypage-next').triggerHandler('click');
        //            break;
        //        //左箭头
        //        case 37:
        //            $('a.layui-laypage-prev').triggerHandler('click');
        //            break;
        //    }
        //    return false;
        //});

        //新增页面打开事件
        $(document).on('click', self.elems.addTrigger, function () {

            self.toAdd({
                template: $(this).attr('template'),
                title: $(this).html(),
                data: {}
            });

            return false;
        });

        //修改页面打开事件
        $(document).on('click', self.elems.updateTrigger, function () {

            self.toUpdate({
                url: $(this).attr('data-href'),
                template: $(this).attr('template'),
                title: $(this).html(),
                data: {}
            });

            return false;
        });

        //详情页面打开事件
        $(document).on('click', self.elems.detailTrigger, function () {

            self.toDetail({
                url: $(this).attr('data-href'),
                template: $(this).attr('template'),
                title: $(this).html(),
                data: {}
            });

            return false;
        });

        //删除按钮事件
        $(document).on('click', self.elems.deleteTrigger, function () {
            self.delete({
                url: $(this).attr('data-href'),
                name: $(this).attr('data-name')
            });
            return false;
        });

        //导入按钮事件
        $(document).on('click', self.elems.importTrigger, function () {
            self.import();
            return false;
        });

        //导出按钮事件
        $(document).on('click', self.elems.exportTrigger, function () {
            self.export();
            return false;
        });

        //选择全部事件
        $(document).on('ifChanged', self.elems.selectedAll, function (event) {
            // var checked = $(self.elems.selectedAll).prop('checked');
            var $input = $('.layui-table tbody tr td').find('input');
            $input.iCheck(event.currentTarget.checked ? 'check' : 'uncheck');
        });
        //列表选中事件
        $(document).on('ifChanged', '.layui-table tbody tr input', function (event) {
            if (event.currentTarget.checked
                && $('.layui-table tbody tr td input:checkbox:checked').length == 10)
                $(self.elems.selectedAll).iCheck('check');
        });
        //列表选中事件
        $(document).on('ifChecked', '.layui-table tbody tr input', function (event) {
            $(this).parents('tr').addClass('layui-table-tr-checked');
        });
        //列表选中事件
        $(document).on('ifUnchecked', '.layui-table tbody tr input', function (event) {
            $(this).parents('tr').removeClass('layui-table-tr-checked');
        });
        $(document).on('click', '.layui-table tbody tr', function (event) {
            var $this = $(this);
            var $input = $this.children('td').eq(0).find('input');
            $input.iCheck('toggle');
        });

        //页面尺寸发生改变事件
        $(window).on('resize', function () {
            self.configs.pageIndex > 0 && layer.full(self.configs.pageIndex);
        });

    }

    /**
     * 更新组件
     */
    Base.fn.render = function () {

        form.render();

        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-grey'
        });

    }

    /**
     * 查询
     */
    Base.fn.query = function () {
        var self = this;
        var $queryForm = $(self.elems.queryForm);
        //获取服务器数据
        self.get($queryForm.attr('action'), $queryForm.serialize())
            .done(function (data) {
                var template = $($(self.elems.queryTrigger).attr('template')).html();
                laytpl(template).render(data, function (html) {
                    $('table>tbody').html(html);
                    //取消全选按钮选中效果
                    $(self.elems.selectedAll).prop('checked', false);
                    //组件渲染
                    self.render();
                });

                //分页插件初始化
                if (self.configs.initFlag && data.pager) {
                    self.intPager(data.pager);
                    self.configs.initFlag = false;
                }

                //取消全选按钮选中效果
                $(self.elems.selectedAll).prop('checked', false);
                self.render();

            });
    }

    //跳转到指定页数数据
    Base.fn.toPage = function (num) {
        var self = this;
        num && $(self.elems.queryForm).find('input[name=pageNumber]').val(num);
        self.query();
    }

    //获取当前页数
    Base.fn.currPage = function () {
        var self = this;
        return $(self.elems.queryForm).find('input[name=pageNumber]').val()
    }

    //刷新当前页面数据
    Base.fn.refresh = function () {
        var self = this;
        self.toPage();
    }

    /**
     * 分页插件
     */
    Base.fn.intPager = function (config) {
        var self = this;
        //page
        pager({
            cont: 'pager',
            pages: config.pageTotal, //总页数
            groups: 5, //连续显示分页数
            jump: function (obj, first) {
                if (!first) {
                    self.toPage(obj.curr)
                }
            }
        });
    }

    /**
     * 全屏打开一个页面
     */
    Base.fn.openPage = function (config) {
        var self = this;
        //页面渲染
        laytpl($(config.template).html()).render(config.data, function (html) {
            self.configs.pageIndex = layer.open({
                id: 'page-content',
                type: 1,
                title: config.title,
                content: html,
                btnAlign: 'l',
                //btn: [self.configs.saveTitle, self.configs.backTitle],
                //yes: config.callback,
                end: function () {
                    self.configs.pageIndex = 0;
                }
            });
            form.render();
            layer.full(self.configs.pageIndex);
        });
    }

    Base.fn.addTimestamp = function (href) {
        var now = new Date().getTime();
        href += ('?timestamp=' + now);
        return href;
    };

    /**
     * 数据添加页面
     */
    Base.fn.toAdd = function (config) {
        var self = this;

        config.data = self.configs.cacheData;

        self.openPage(config);
    }

    /**
     * 数据添加
     */
    Base.fn.add = function () {
        var self = this;
        var $addForm = $(self.elems.addForm);
        self.configs.cacheData = $addForm.serializeJson();
        self.post($addForm.attr('action'), $addForm.serialize())
            .done(function (data) {
                self.ok(data.message);
                layer.close(self.configs.pageIndex);
                self.configs.initFlag = true;
                self.toPage(1);
            });
    }

    /**
     * 数据修改页面
     */
    Base.fn.toUpdate = function (config) {
        var self = this;
        if (config.url && config.url != '') {
            return self.get(config.url, null)
                .done(function (data) {
                    config.data = data.result;
                    self.openPage(config);
                });
        } else {
            self.fail('数据链接地址不能为空');
        }
    }

    /**
     * 数据修改
     */
    Base.fn.update = function () {
        var self = this;
        var $updateForm = $(self.elems.updateForm);
        self.post($updateForm.attr('action'), $updateForm.serialize())
            .done(function (data) {
                self.ok(data.message);
                layer.close(self.configs.pageIndex);
                self.refresh();
            });
    }

    /**
     * 数据详情页面
     */
    Base.fn.toDetail = function (config) {
        var self = this;
        if (config.url && config.url != '') {
            self.get(config.url, null)
                .done(function (data) {
                    config.data = data.result;
                    self.openPage(config);
                });
        } else {
            self.fail('数据链接地址不能为空');
        }
    }

    /**
     * 数据删除
     */
    Base.fn.delete = function (item) {
        var self = this;
        var items = self.getValuesByInputName('ids', '.layui-table tbody');
        if (items.ids.length < 1) {
            self.warn('请选择要删除数据');
            return false;
        }
        player.confirm('确认删除：[ ' + items.names.join('，') + ' ]？', {icon: 7}, function () {
            self.get(item.url, {ids: items.ids.join(',')})
                .done(function (data) {
                    self.ok(data.message);
                    self.refresh();
                });
        });
    }

    /**
     * 数据删除
     */
    Base.fn.getValuesByInputName = function (name, context) {
        var self = this;
        var items = {
            ids: [],
            names: []
        };
        $('input:checkbox[name=' + name + ']:checked:not(disabled)', context || document).each(function (index, item) {
            items.ids.push($(item).val());
            items.names.push($(item).attr('data-name'));
        });
        return items;
    }

    /**
     * 数据导入
     */
    Base.fn.import = function () {
        self.info('执行导入操作');
    }

    /**
     * 数据导出
     */
    Base.fn.export = function () {
        self.info('执行导出操作');
    }

    /**
     * 封装ajax请求
     * @param config
     */
    Base.fn.ajax = function (config) {
        var self = this;

        config = config || {};
        config.timestamp = new Date().getTime();
        return $.ajax({
            url: config.url,
            type: config.type,
            data: config.data,
            dataType: 'json',
            cache: false,
            //请求发送前
            beforeSend: function () {
                self.configs.loadIndex = layer.load(1);
            }
        }).fail(function (err) { //jqXHR, textStatus, errorThrown
            //请求出错
            layer.close(self.configs.loadIndex);
            var msg;
            if (err.status === 500) {
                msg = '系统错误';
            } else if (err.status < 200) {
                msg = '请求失败';
            }
            console.log(err.responseText);
            self.fail(msg);
        }).always(function () {  //请求完成后
            layer.close(self.configs.loadIndex);
        });

    }

    /**
     * 封装Get请求
     * @param url
     * @param data
     * @param callback
     */
    Base.fn.get = function (url, data) {

        var self = this;

        return self.ajax({
            url: url,
            type: 'GET',
            data: data
        });
    }

    /**
     * 封装Post请求
     * @param url
     * @param data
     * @param callback
     */
    Base.fn.post = function (url, data) {

        var self = this;

        return self.ajax({
            url: url,
            type: 'POST',
            data: data
        });
    }

    /**
     * 封装Post请求
     * @param url
     * @param data
     * @param callback
     */
    Base.fn.post = function (url, data) {

        var self = this;

        return self.ajax({
            url: url,
            type: 'POST',
            data: data
        });
    }

    Base.fn.ok = function(message){
        layer.msg(message, {icon: 1, time: 1500});
    }

    Base.fn.fail = function(message){
        layer.msg(message, {icon: 2, time: 500});
    }

    Base.fn.warn = function(message){
        layer.msg(message, {icon: 0, time: 500});
    }

    Base.fn.info = function(message){
        layer.msg(message, {time: 500});
    }

    /**
     * 页面初始化完成执行方法
     */
    Base.fn.ready = function () {

    }

    /**
     * 事件绑定
     */
    Base.fn.events = function () {

    }

    exports('base', Base);
});