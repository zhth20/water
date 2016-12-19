/**
 * Created by Loyal on 2016/12/16.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use(['icheck', 'laypage', 'layer', 'form', 'laydate', 'laytpl'], function () {
    var $ = layui.jquery,
        pager = layui.laypage,
        form = layui.form(),
        laytpl = layui.laytpl,
        layer = layui.layer,
        player = window.layer;

    var Base = function () {
        this.config = {
            queryForm: '#query-form',
            queryTrigger: '#query-trigger',
            addForm: '#add-form',
            addTrigger: '#add-trigger',
            updateForm: '#update-form',
            updateTrigger: '.update-trigger',
            detailForm: '#detail-form',
            detailTrigger: '.detail-trigger',
            deleteTrigger: '.delete-trigger',
            importTrigger: '#import-trigger',
            exportTrigger: '#export-trigger'
        };

        this.saveTitle = '<i class="fa fa-save"></i> 保存';
        this.backTitle = '<i class="fa fa-reply"></i> 返回';
        this.pageIndex = 0;
        this.loadIndex = 0;
        this.initFlag = true;
    }

    Base.fn = Base.prototype;

    /**
     * 初始化操作
     */
    Base.fn.init = function () {
        var self = this;
        self.bindEvens();
        self.toPage(1);
    }

    /**
     * 事件绑定
     */
    Base.fn.bindEvens = function () {
        var self = this;
        //查询按钮事件
        $(document).on('click', self.config.queryTrigger, function () {
            self.query();
            return false;
        });

        //新增页面打开事件
        $(document).on('click', self.config.addTrigger, function () {
            self.openPage({
                url: $(this).attr('href'),
                title: $(this).html(),
                callback: function () {
                    self.add();
                }
            });

            return false;
        });

        //修改页面打开事件
        $(document).on('click', self.config.updateTrigger, function () {
            self.openPage({
                url: $(this).attr('href'),
                title: $(this).html(),
                callback: function () {
                    self.update();
                }
            });

            self.get($(this).attr('data-href'), null, function (data) {
                var template = $(self.config.updateForm).html();
                laytpl(template).render(data.result, function (html) {
                    $(self.config.updateForm).html(html);
                    self.render();
                });
            });
            return false;
        });

        //详情页面打开事件
        $(document).on('click', self.config.detailTrigger, function () {
            self.openPage({
                url: $(this).attr('href'),
                title: $(this).html(),
                data: $(this).attr('data-href'),
                callback: function () {
                }
            });

            self.get($(this).attr('data-href'), null, function (data) {
                var template = $(self.config.detailForm).html();
                laytpl(template).render(data.result, function (html) {
                    $(self.config.detailForm).html(html);
                    self.render();
                });
            });
            return false;
        });

        //删除按钮事件
        $(document).on('click', self.config.deleteTrigger, function () {
            self.delete({
                url: $(this).attr('data-href'),
                name: $(this).attr('data-name')
            });
            return false;
        });

        //导入按钮事件
        $(document).on('click', self.config.importTrigger, function () {
            self.import();
            return false;
        });

        //导出按钮事件
        $(document).on('click', self.config.exportTrigger, function () {
            self.export();
            return false;
        });

        //选择全部事件
        $(document).on('ifChanged', '#selected-all', function (event) {
            var checked = $('#selected-all').prop('checked');
            var $input = $('.layui-table tbody tr td').find('input');
            $input.iCheck(event.currentTarget.checked ? 'check' : 'uncheck');
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
            self.pageIndex > 0 && layer.full(self.pageIndex);
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
        self.get($(self.config.queryForm).attr('action'), $(self.config.queryForm).serialize(), function (data) {
            var template = $('#query-table').html();
            laytpl(template).render(data, function (html) {
                $('table>tbody').html(html);
                self.render();
            });

            if (self.initFlag) {
                self.intPager(data.pager);
                self.initFlag = false;
            }
        });
    }

    Base.fn.toPage = function (num) {
        var self = this;
        $(self.config.queryForm).find('input[name=pageNumber]').val(num);
        $(self.config.queryTrigger).trigger('click');
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
        $.get(self.addTimestamp(config.url), function (data) {
            self.pageIndex = layer.open({
                id: 'page-content',
                type: 1,
                title: config.title,
                content: data,
                btnAlign: 'l',
                btn: [self.saveTitle, self.backTitle],
                yes: config.callback,
                end: function () {
                    self.pageIndex = 0;
                }
            });
            form.render();
            layer.full(self.pageIndex);
        });
    }

    Base.fn.addTimestamp = function (href) {
        var now = new Date().getTime();
        href += ('?timestamp=' + now);
        return href;
    };

    /**
     * 数据添加
     */
    Base.fn.add = function () {
        var self = this;
        var $addForm = $(self.config.addForm);
        self.post($addForm.attr('action'), $addForm.serialize(), function (data) {
            layer.msg(data.message);
            layer.close(self.pageIndex);
            self.initFlag = true;
            self.query();
        });
    }

    /**
     * 数据修改
     */
    Base.fn.update = function () {
        var self = this;
        var $updateForm = $(self.config.updateForm);
        self.post($updateForm.attr('action'), $updateForm.serialize(), function (data) {
            layer.msg(data.message);
            layer.close(self.pageIndex);
            self.query();
        });
    }

    /**
     * 数据删除
     */
    Base.fn.delete = function (item) {
        var self = this;
        player.confirm('确认删除：' + item.name + ' ？', {icon: 7}, function () {
            self.get(item.url, null, function (data) {
                layer.msg(data.message);
                self.query();
            });
        });
    }

    /**
     * 数据导入
     */
    Base.fn.import = function () {
        layer.msg('执行导入操作');
    }

    /**
     * 数据导出
     */
    Base.fn.export = function () {
        layer.msg('执行导出操作');
    }

    /**
     * 封装ajax请求
     * @param config
     */
    Base.fn.ajax = function (config) {
        var self = this;

        config = config || {};

        $.ajax({
            url: config.url,
            type: config.type,
            data: config.data,
            dataType: 'json',
            success: config.callback,
            //请求出错
            error: function () {
                layer.close(self.loadIndex);
                layer.msg('请求失败', {icon: 2});
            },
            //请求发送前
            beforeSend: function () {
                self.loadIndex = layer.load(1);
            },
            //请求完成后
            complete: function () {
                layer.close(self.loadIndex);
            }
        });

    }

    /**
     * 封装Get请求
     * @param url
     * @param data
     * @param callback
     */
    Base.fn.get = function (url, data, callback) {

        var self = this;

        self.ajax({
            url: url,
            type: 'GET',
            data: data,
            callback: callback
        });
    }

    /**
     * 封装Post请求
     * @param url
     * @param data
     * @param callback
     */
    Base.fn.post = function (url, data, callback) {

        var self = this;

        self.ajax({
            url: url,
            type: 'POST',
            data: data,
            callback: callback
        });
    }

    new Base().init();
});