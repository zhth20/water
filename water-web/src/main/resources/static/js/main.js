/**
 * Created by Loyal on 2016/12/16.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use(['icheck', 'laypage', 'layer', 'form', 'laydate'], function () {
    var $ = layui.jquery,
        pager = layui.laypage,
        form = layui.form(),
        layer = layui.layer,
        player = window.layer;

    var Base = function () {
        this.config = {
            queryForm: 'query-form',
            queryTrigger: 'query-trigger',
            addUrl: 'add-url',
            addForm: 'add-form',
            addTrigger: 'add-trigger',
            updateUrl: 'update-url',
            updateForm: 'update-form',
            updateTrigger: 'update-trigger',
            deleteTrigger: 'delete-trigger',
            importTrigger: 'import-trigger',
            exportTrigger: 'export-trigger',
        };
    }
    Base.fn = Base.prototype;

    /**
     * 初始化操作
     */
    Base.fn.init = function () {
        this.bindEvens();
    }

    /**
     * 事件绑定
     */
    Base.fn.bindEvens = function () {
        var self = this;
        //添加按钮事件
        $(document).on('click', self.config.addTrigger, function () {
            self.toAdd();
        });

        //选择全部事件
        $(document).on('ifChanged', '#selected-all', function (event) {
            var checked = $('#selected-all').prop('checked');
            var $input = $('.layui-table tbody tr td').find('input');
            $input.iCheck(event.currentTarget.checked ? 'check' : 'uncheck');
        });

        //列表选中事件
        $(document).on('click', '.layui-table tbody tr', function (event) {
            var $this = $(this);
            var $input = $this.children('td').eq(0).find('input');
            $input.on('ifChecked', function (e) {
                $this.addClass('layui-table-tr-checked');
            });
            $input.on('ifUnchecked', function (e) {
                $this.removeClass('layui-table-tr-checked');
            });
            $input.iCheck('toggle');
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

    }

    /**
     * 分页插件
     */
    Base.fn.intPager = function () {
        //page
        pager({
            cont: 'pager',
            pages: 5, //总页数
            groups: 5, //连续显示分页数
            jump: function (obj, first) {
                //得到了当前页，用于向服务端请求对应数据
                var curr = obj.curr;
                if (!first) {
                    //layer.msg('第 '+ obj.curr +' 页');
                }
            }
        });
    }

    /**
     * 全屏打开一个页面
     */
    Base.fn.openPage = function (url, title, callback) {
        var index = null;
        $.get(url, function (form) {
            index = layer.open({
                type: 1,
                title: title,
                content: form,
                btn: ['保存', '取消'],
                yes: callback
            });

            layer.full(index);
        });

        var win = window.top === window.self ? window : parent.window;
        $(win).on('resize', function () {
            layer.full(index);
        });
    }

    /**
     * 数据添加页面加载
     */
    Base.fn.toAdd = function () {
        var self = this;
        self.openPage(self.config.addUrl, function () {
            self.add();
        });
        //$.get('/pages/account/shopUserAdd.html', null, function (form) {
        //    var index = layer.open({
        //        type: 1,
        //        title: '管理员新增',
        //        content: form,
        //        btn: ['保存', '取消'],
        //        yes: function (index) {
        //            console.log(index);
        //        }
        //    });
        //
        //    layer.full(index);
        //
        //    var win = window.top === window.self ? window : parent.window;
        //    $(win).on('resize', function () {
        //        layer.full(index);
        //    });
        //});
    }

    /**
     * 数据添加
     */
    Base.fn.add = function () {
        layer.msg('执行添加');
    }

    /**
     * 数据更新页面加载
     */
    Base.fn.toUpdate = function () {

    }
    /**
     * 数据更新
     */
    Base.fn.update = function () {

    }

    /**
     * 封装ajax请求
     * @param config
     */
    Base.fn.ajax = function (config) {

        config = config || {};

        var index = null;

        $.ajax({
            url: config.url,
            type: config.type,
            data: config.data,
            dataType: 'json',
            success: config.callback,
            //请求出错
            error: function () {
                layer.msg('请求失败', {icon: 2});
            },
            //请求发送前
            beforeSend: function () {
                index = layer.load();
            },
            //请求完成后
            complete: function () {
                layer.close(index);
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

    $('#search').on('click', function () {
        player.alert('你点击了搜索按钮')
    });

    $('#data-add').on('click', function () {

    });

    $('.data-edit').on('click', function () {
        $.get('/pages/account/shopUserEdit.html', null, function (form) {
            var index = layer.open({
                type: 1,
                title: '管理员修改',
                content: form,
                btn: ['保存', '取消'],
                yes: function (index) {
                    console.log(index);
                }
            });

            layui.layer.full(index);

            var win = window.top === window.self ? window : parent.window;
            $(win).on('resize', function () {
                layer.full(index);
            });
        });
    });

    $('.data-detail').on('click', function () {
        $.get('/pages/account/shopUserDetail.html', null, function (form) {
            var index = layui.layer.open({
                type: 1,
                title: '管理员详情',
                content: form,
                btn: ['保存', '取消'],
                yes: function (index) {
                    console.log(index);
                }
            });

            layui.layer.full(index);

            var win = window.top === window.self ? window : parent.window;
            $(win).on('resize', function () {
                layer.full(index);
            });
        });
    });

    $('.data-delete').on('click', function () {
        player.confirm('确认删除？', {icon: 7});
    });

    $('#import').on('click', function () {
        var that = this;
        var index = layer.tips('只想提示地精准些', that, {tips: [1, 'white']});
        $('#layui-layer' + index).children('div.layui-layer-content').css('color', '#000000');
    });


});