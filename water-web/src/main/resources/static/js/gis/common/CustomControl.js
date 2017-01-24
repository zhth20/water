layui.define([], function (exports) {
    var $ = layui.jquery;

    var tempLine;
    /**
     * 用户自定义控件
     */
    function CustomControl(self, target) {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.customMap = self;
        this.target = target;
        this.element = document.createElement("div");
        this.cmap = self.map;
        this.data = self.customer.cong.map;

        this.drawingManager = null;

    }
    /**
     * 原型继承BMap.Control
     * @type {BMap.Control}
     */
    CustomControl.prototype = new BMap.Control();
    /**
     * 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
     * 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
     * @param map
     * @returns {Element|*}
     */
    CustomControl.prototype.initialize = function (map) {
        this.map = map;
        this.initViewControl();
        var ele = this.element;
        this.map.getContainer().appendChild(ele);
        this.event();
        return ele;
    }
    CustomControl.prototype.openfunc = function () {
        var self =  this;
        switch(this.target){
            case 'edit':
                $.each(self.customMap.customPipes.pipes, function (i, e) {
                    e.control =  e.control | 0x01;
                });
                break;
            case 'struct':
                $.each(self.customMap.customPipes.pipes, function (i, e) {
                    e.control =  e.control | 0x02;
                    e.setStrokeColor(e.scolor);
                });
                break;
            case 'point':
                $.each(self.customMap.customPipes.pipes, function (i, e) {
                    e.control =  e.control | 0x04;
                });
                break;
            case 'materials':
                if(self.customMap.control.show == (self.customMap.control.show | 0x02))
                    self.setOffset(new BMap.Size($(".pipe-dn").width() + 15, 10));
                else
                    self.setOffset(new BMap.Size(10, 10));
                break;
        }
        this.show();
    }
    CustomControl.prototype.closefunc = function () {
        var self =  this;
        //console.log("open:" + this.show());
        switch(this.target){
            case 'edit':
                $.each(self.customMap.customPipes.pipes, function (i, e) {
                    if(e.control== (e.control | 0x01))
                        e.control =  e.control - 0x01;
                });
                self.drawingManager.close();
                self.drawingManager._drawingTool.hide();
                if(typeof(tempLine) != "undefined") {
                    tempLine.reload();
                }
                break;
            case 'struct':
                $.each(self.customMap.customPipes.struct, function (i, e) {
                    e.setStrokeColor(e.scolor);
                    e.reset();
                });
                $.each(self.customMap.customPipes.pipes, function (i, e) {
                    if(e.control == (e.control | 0x02)){
                        e.control =  e.control - 0x02;
                        e.setStrokeColor(e.color);
                    }
                });

                break;
            case 'point':
                $.each(self.customMap.customPipes.struct, function (i, e) {
                    e.setStrokeColor(e.color);
                });
                self.customMap.customPipes.struct = [];
                $('input.point-coor').attr("value", '');
                $('input.point-polyline').attr("value", '');
                self.customMap.control.btn = false;

                $.each(self.customMap.customPipes.pipes, function (i, e) {
                    if(e.control == (e.control | 0x04)){
                        e.control =  e.control - 0x04;
                        e.setStrokeColor(e.color);
                    }
                });
                break;

        }
        this.hide();
    }
    /**
     * 初始化控制面板
     */
    CustomControl.prototype.initViewControl = function () {
        var self = this;
        var ele = this.element,$panel;
        this.defaultOffset = new BMap.Size(10, 10);
        switch(this.target){
            case 'view':
                this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
                $panel = $('<section class="model-4">'+
                    '<div class="float-btn-group">'+
                    '<button class="btn-float btn-triger pink"><i class="fa fa-cogs"></i></button>'+
                    '<div class="btn-list">'+
                    '<button class="btn-float black btn-pipe-dn"><i class="fa fa-code-fork"></i></button>'+
                    '<button class="btn-float black btn-pipe-m"><i class="fa fa-exclamation-triangle"> </i></button>'+
                    '<button class="btn-float black btn-pipe-area"><i class="fa fa-desktop"></i></button>'+
                    '<button class="btn-float black btn-chart"><i class="fa fa-bar-chart-o"></i></button>'+
                    '<button class="btn-float black btn-radar"><i class="fa fa-eye"></i></button>'+
                    '</div>'+
                    '</div>'+
                    '</section>');
                break;
            case 'dn':
                $panel = $('<div class="pipe-dn">' +
                    '<div class="items">' +
                    '</div>' +
                    '</div>');
                $.each(this.data, function (index, item) {
                    var $input = $('<input id="DN' + item.dn + '" type="checkbox" checked/>');
                    var $label = $('<label for="DN' + item.dn + '"><i class="btn" style="background:' + item.color + ';width:20px;height:15px;margin-top:-5px;margin-right:5px;"></i>DN' + item.dn + '</label>');

                    $('div.items', $panel).append($input, $label);
                });
                var $hdone = $('<h2 class="done" aria-hidden="true">').text('显示口径');
                var $hudone = $('<h2 class="undone" aria-hidden="true">').text('隐藏口径');
                $('div.items', $panel).append($hdone, $hudone);
                break;
            case 'materials':
                $panel = $('<div class="pipe-dn">' +
                    '<div class="items">' +
                    '</div>' +
                    '</div>');

                $.each(self.customMap.customer.cong.materials, function (i, e) {
                    $('div.items', $panel).append($('<input id="materials-' + i +'" type="checkbox" />'), $('<label for="materials-' + i +'">').text(e.name));
                });

                $('div.items', $panel).append($('<input id="materials-v" type="checkbox" />'), $('<label for="materials-v">').text('阀门'));
                var $hdone = $('<h2 class="done" aria-hidden="true">').text('显示类型');
                var $hudone = $('<h2 class="undone" aria-hidden="true">').text('隐藏类型');
                $('div.items', $panel).append($hdone, $hudone);
                break;
            case 'setting':
                this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                var str=[];
                this.data.forEach(function(e){
                    str.push('<div class="col-md-6" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
                        '<label for="field-1" class="col-md-3 control-label" >DN' + e.dn + '</label>'+//style="padding:7px 10px 0px 0px"
                        '<div class="col-md-2" >'+//style="padding-right:5px;padding-left:5px;text-align:right"
                        '<div class="input-group-addon" style="border:1px solid #ebebeb;">'+
                        '<i class="btn color-preview" style="background:' + e.color + ';margin-top:0px;" id="DN' + e.dn + '"></i>'+
                        '</div>'+
                        '</div>'+

                        '<div class="col-sm-7">'+
                        '<div class="input-spinner">'+
                        '<button type="button" class="btn btn-default">-</button>'+
                        '<input type="text" class="form-control size-1" id="DN' + e.dn + '" value="' + e.s + '" data-min="1" data-max="5" />'+
                        '<button type="button" class="btn btn-default">+</button>'+
                        '</div>'+
                        '</div>'+
                        '</div>');
                });

                var panelsys =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-setting" href="#collapseFour">'+
                    '系统显示设置'+
                    '</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="collapseFour" class="panel-collapse collapse in">'+
                    '<div class="panel-body">'+
                    '<form role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+

                    '<div class="col-md-12" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
                    '<label for="field-1" class="col-md-2 control-label" >地图中心</label>'+//style="padding:7px 10px 0px 0px"
                    '<div class="col-sm-4">'+
                    '<input type="text" class="form-control form-center" placeholder=".坐标值" value="' + this.map.getCenter().lng + ',' + this.map.getCenter().lat + '">'+
                    '</div>'+
                    '<label for="field-1" class="col-md-2 control-label" >缩放大小</label>'+//style="padding:7px 10px 0px 0px"
                    '<div class="col-sm-2">'+
                    '<input type="text" class="form-control form-zoom" placeholder=".坐标值" value="' + this.map.getZoom() + '">'+
                    '</div>'+
                    '<button class="btn btn-info form-dn" type="button" style="margin-left:5px">保存修改</button>'+
                    '</div>'+
                    str.join("") +
                    '<button class="btn btn-info form-dn" type="button" style="margin-left:5px">保存修改</button>'+
                    '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                $panel = $('<div class="col-md-4" style="background-color:rgba(255, 255, 255, 0.8);width:620px;padding:0px">'+
                    '<div class="panel-group" id="accordion-setting">'+
                    panelsys +
                    '</div></div>');
                break;
            case 'edit':
                this.editDrawManger();
                this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                var str=[],name = [];
                this.data.forEach(function(e){
                    str.push('<option value="' + e.dn + '">DN' + e.dn + '</option>');
                });
                $.each(self.customMap.customer.cong.materials, function (i, e) {
                    name.push('<option class="dn-material" value="' + (i + 1) + '">' + e.name + '</option>');
                });
                var paneledit =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-test" href="#edit-One">管网数据编辑</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="edit-One" class="panel-collapse collapse in">'+
                    '<div class="panel-body">'+
                    '<form role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">编号</label>'+
                    '<div class="col-md-2">'+
                    '<input type="text" class="form-control edit-id" value="1001">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">口径</label>'+
                    '<div class="col-md-2">'+

                    '<select name="dn-size" class="dn-size" style="display: block; visibility: visible; height: 30px; position: absolute; top: 0px; cursor: pointer; z-index: 999999; padding: 0px;">'+
                    str.join("") +
                    '</select>'+
                    '</div>'+

                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">材质</label>'+
                    '<div class="col-md-2">'+
                    '<select name="dn-material" class="dn-material" style="display: block; visibility: visible; height: 30px; position: absolute; top: 0px; cursor: pointer; z-index: 999999; padding: 0px;">'+
                    name.join("") +
                    '</select>'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">长度</label>'+
                    '<div class="col-md-2">'+
                    '<input type="text" class="form-control edit-m" value="630">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">节点数</label>'+
                    '<div class="col-md-2">'+
                    '<input type="text" class="form-control edit-n" value="2米">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">类型</label>'+
                    '<div class="col-md-3">'+
                    '<input type="text" class="form-control" value="给水管网">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">安装时间</label>'+
                    '<div class="col-md-3">'+
                    '<input type="text" class="form-control" value="2015-06-09">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">节点</label>'+
                    '<div class="col-md-10">'+
                    '<input type="text" class="form-control edit-p" value="110.069257,41.030388;110.069257,41.030388;110.069257,41.030388;110.069257,41.030388">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<button class="btn btn-success edit-new col-sm-offset-1" type="button">新增管段</button>'+
                    '<button class="btn btn-success edit-save col-sm-offset-1" type="button" style="margin-left:10px;">保存修改</button>'+
                    '<button class="btn btn-success btn-del col-sm-offset-1" type="button" style="margin-left:10px;margin-right:10px;">删除</button>'+
                    '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                var panelpolyline =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-test" href="#edit-Two">管网管段合并</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="edit-Two" class="panel-collapse collapse in">'+
                    '<div class="panel-body">'+
                    '<form role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">起始编号</label>'+
                    '<div class="col-md-2">'+
                    '<input type="text" class="form-control input-start" value="1001">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">当前编号</label>'+
                    '<div class="col-md-2">'+
                    '<input type="text" class="form-control input-current" value="1002">'+
                    '</div>'+
                    '<button class="btn btn-info form-polyline" type="button">反向</button>'+
                    '<button class="btn btn-info form-del" type="button" style="margin-left:10px;">删除</button>'+
                    '</div>'+

                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">节点</label>'+
                    '<div class="col-md-10">'+
                    '<input type="text" class="form-control edit-polyline" value="">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<button class="btn btn-success btn-open col-sm-offset-1" type="button">功能开启</button>'+
                    '<button class="btn btn-success btn-reload" type="button" style="margin-left:10px;margin-right:10px;">重新加载</button>'+
                    '<button class="btn btn-success btn-polyline" type="button">保存修改</button>'+
                    '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                var panelpoint =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-test" href="#edit-Three">附属设备编辑（开发中）</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="edit-Three" class="panel-collapse collapse">'+
                    '<div class="panel-body">'+
                    '<form role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">编号</label>'+
                    '<div class="col-md-3">'+
                    '<input type="text" class="form-control point-id" value="1608900001">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">类型</label>'+
                    '<div class="col-md-2">'+
                    '<select name="test" style="display: block; visibility: visible; height: 30px; position: absolute; top: 0px; cursor: pointer; z-index: 999999; padding: 0px;">'+
                    '<option value="1">监测点</option>'+
                    '<option value="2">阀门</option>'+
                    '<option value="3">消防栓</option>'+
                    '<option value="4">表井</option>'+
                    '<option value="5">减压阀</option>'+
                    '</select>'+
                    '</div>'+
                    '<div class="col-md-2">'+
                    '<select name="test" style="display: block; visibility: visible; height: 30px; position: absolute; top: 0px; cursor: pointer; z-index: 999999; padding: 0px;">'+
                    '<option value="1">重庆伟岸</option>'+
                    '<option value="2">南华中天</option>'+
                    '<option value="3">重庆智能</option>'+
                    '<option value="4">川仪</option>'+
                    '<option value="5">重庆水务</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">坐标</label>'+
                    '<div class="col-md-10">'+
                    '<input type="text" class="form-control edit-p" value="110.069257,41.030388;">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<button class="btn btn-success btn-edit col-sm-offset-1" type="button">保存修改</button>'+
                    '<button class="btn btn-success btn-del col-sm-offset-1" type="button" style="margin-left:10px;margin-right:10px;">删除</button>'+
                    '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                var panelmap =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-test" href="#edit-four">'+
                    'CAD数据导入'+
                    '</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="edit-four" class="panel-collapse collapse in">'+
                    '<div class="panel-body">'+
                    '<form id="cad-upload" role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px;">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">地图</label>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control form-center" placeholder=".坐标值" value="' + this.map.getCenter().lng + ',' + this.map.getCenter().lat+'-' + this.map.getZoom() + '">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">选择CAD</label>'+
                    '<div class="col-sm-4">'+
                    '<input type="file" class="form-control" name="cadFile" id="field-file" placeholder="Placeholder">' +
                    '</div>'+
                    '<button class="btn btn-info form-cad" type="button">提交文件</button>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">A点坐标</label>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control input-a" placeholder=".坐标值" value="4338.376835284901,2772.021694284196">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">地图坐标</label>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control input-1" placeholder=".坐标值" value="106.471204,29.572366">'+
                    '</div>'+
                    '<button class="btn btn-info form-a" type="button">点击获取</button>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">B点坐标</label>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control input-b" placeholder=".坐标值" value="5059.970544071644,2458.164297962243">'+
                    '</div>'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">地图坐标</label>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control input-2" placeholder=".坐标值" value="106.478764,29.569535">'+
                    '</div>'+
                    '<button class="btn btn-info form-b" type="button">点击获取</button>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px;">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">地图名称</label>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control input-3" placeholder=".名称">'+
                    '</div>'+
                    '<button class="btn btn-success btn-save" type="button" >保存修改</button>'+
                    '</div>'+
                    '</form>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                $panel = $('<div class="col-md-4" style="background-color:rgba(255, 255, 255, 0.8);width:620px;padding:0px">' +
                    '<div class="panel-group" id="accordion-test" style="margin-bottom: 0px;">' +
                    paneledit  + panelmap +
                    '</div></div>');
                break;
            case 'struct':
                this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                var panelpolyline =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-struct" href="#struct-one">管网结构设置</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="struct-one" class="panel-collapse collapse in">'+
                    '<div class="panel-body">'+
                    '<form role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">设置管段</label>'+
                    '<div class="col-md-10">'+
                    '<input type="text" class="form-control edit-polyline" value="">'+
                    '</div>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<button class="btn btn-success struct-reset col-sm-offset-1" type="button">重新加载</button>'+
                    '<button class="btn btn-success struct-save" type="button" style="margin-left:10px;">保存修改</button>'
                '</div>'+
                '</form>'+
                '</div>'+
                '</div>'+
                '</div>';
                $panel = $('<div class="col-md-4" style="background-color:rgba(255, 255, 255, 0.8);width:620px;padding:0px">' +
                    '<div class="panel-group" id="accordion-struct" style="margin-bottom: 0px;">' +
                    panelpolyline +
                    '</div></div>');
                break;
            case 'point':
                this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
                var panelpoly =
                    '<div class="panel panel-default">'+
                    '<div class="panel-heading">'+
                    '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion-point" href="#point-one">管网附属设备设置</a>'+
                    '</h4>'+
                    '</div>'+
                    '<div id="point-one" class="panel-collapse collapse in">'+
                    '<div class="panel-body">'+
                    '<form role="form" class="form-horizontal form-groups-bordered">'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">选择管段</label>'+
                    '<div class="col-md-2">'+
                    '<input type="text" class="form-control point-polyline" value="">'+
                    '</div>'+
                    '<div class="col-md-4">'+
                    '<input type="text" class="form-control point-coor" value="">'+
                    '</div>'+
                    '<div class="col-md-2">'+
                    '<select name="coordinate" class="point-coordinate" style="display: block; visibility: visible; height: 30px; position: absolute; top: 0px; cursor: pointer; z-index: 999999; padding: 0px;">'+
                    '<option value="0">阀门</option>'+
                    '<option value="1">监测点</option>'+
                    '</select>'+
                    '</div>'+

                    '<button class="btn btn-success point-add col-sm-offset-1" type="button">点击设置</button>'+
                    '</div>'+
                    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
                    '<button class="btn btn-success point-reset col-sm-offset-1" type="button">重新加载</button>'+
                    '<button class="btn btn-success point-save" type="button" style="margin-left:10px;">保存修改</button>'
                '</div>'+
                '</form>'+
                '</div>'+
                '</div>'+
                '</div>';
                $panel = $('<div class="col-md-4" style="background-color:rgba(255, 255, 255, 0.8);width:620px;padding:0px">' +
                    '<div class="panel-group" id="accordion-point" style="margin-bottom: 0px;">' +
                    panelpoly +
                    '</div></div>');
                break;

            case 'pipe-area':
                $panel = $('<div class="pipe-dn">' +
                    '<div class="items">' +
                    '</div>' +
                    '</div>');
                $.each(this.data.area, function (index, item) {
                    var $input = $('<input id="area-' + item.id + '" type="checkbox"/>');
                    var $label = $('<label for="area-' + item.id + '">').text(item.name);

                    $('div.items', $panel).append($input, $label);
                });
                var $hdone = $('<h2 class="done" aria-hidden="true">').text('显示区域');
                var $hudone = $('<h2 class="undone" aria-hidden="true">').text('隐藏区域');
                $('div.items', $panel).append($hdone, $hudone);
                break;
        }
        $(ele).append($panel);
    }
    /**
     * 事件绑定
     */
    CustomControl.prototype.event = function () {
        var self = this;
        var ele = this.element;
        switch(this.target){
            case 'view':
                $('.btn-triger').click(function () {
                    $(this).closest('.float-btn-group').toggleClass('open');
                });
                //var custMap = self.cmap;
                $('.btn-pipe-dn').click(function () {
                    self.render(0x01);
                });
                $('.btn-pipe-m').click(function () {
                    self.render(0x02);
                });
                $('.btn-pipe-area').click(function () {
                    self.render(0x03);
                });

                $('.btn-chart').click(function () {
                    self.renderChart(0x01);
                });

                $('.btn-radar').click(function () {
                    self.renderChart(0x02);
                });
                break;
            case 'dn':
                $(ele).on('click', 'div.items > label', function () {
                    //console.log($(this).text() + "," + $(this).prev().prop('checked'));
                    var pipes = _.where(self.customMap.customPipes.pipes, {dn: $(this).prev().attr('id')});
                    if($(this).prev().prop('checked') == false){
                        $.each(pipes, function (i, e) {
                            e.show();
                        });
                    }
                    else{
                        $.each(pipes, function (i, e) {
                            e.hide();
                        });
                    }


                });
                break;
            case 'materials':
                $(ele).on('click', 'div.items > label', function () {
                    //console.log($(this).text() + "," + $(this).prev().prop('checked'));
                    var index = $(this).text();
                    switch(index){
                        case '阀门':
                            var bool = $(this).prev().prop('checked');
                            $.each(self.customMap.marker.valve, function (i, e) {
                                if(bool == false){
                                    if(e.open){
                                        e.show();
                                    }
                                }
                                else{
                                    if(e.open && e.flag == 1){
                                        e.hide();
                                    }
                                }
                            });
                            break;
                        default:
                            arryObject = _.where(self.customMap.customPipes.pipes, {material: index});
                            if($(this).prev().prop('checked') == false){
                                $.each(arryObject, function (i, e) {
                                    e.show();
                                });
                            }
                            else{
                                $.each(arryObject, function (i, e) {
                                    e.hide();
                                });
                            }
                            break;
                    }
					/*
					 var index = parseInt($(this).prev().attr('id').replace('materials-','')),arryObject;
					 switch(index){
					 case 0:
					 case 1:
					 case 2:
					 arryObject = _.where(self.customMap.customPipes.pipes, {material: $(this).text()});
					 if($(this).prev().prop('checked') == false){
					 $.each(arryObject, function (i, e) {
					 e.show();
					 });
					 }
					 else{
					 $.each(arryObject, function (i, e) {
					 e.hide();
					 });
					 }
					 break;
					 case 3:
					 var bool = $(this).prev().prop('checked');
					 $.each(self.customMap.marker.valve, function (i, e) {
					 if(bool == false){
					 if(e.open){
					 e.show();
					 }
					 }
					 else{
					 if(e.open && e.flag == 1){
					 e.hide();
					 }
					 }
					 });
					 break;
					 }*/

                });
                break;
            case 'setting':
                $('.color-preview').colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css('background-color', '#'+hex);
                        $(el).colpickHide();
                        //console.log($(el).attr('id'));
                        var pipes = _.where(self.customMap.customPipes.pipes, {dn: $(el).attr('id')});
                        $.each(pipes, function (i, e) {
                            e.setStrokeColor('#'+hex); ;
                        });

                        var cong = _.where(self.customMap.customer.cong.map, {dn: parseInt($(el).attr('id').replace("DN",""))});
                        $.each(cong, function (i, e) {
                            e.color = '#'+hex;
                        });
                        //console.log(self.customMap.customer.cong.map);
                    }

                });
                $(".input-spinner").each(function(i, el)
                {
                    var $this = $(el),
                        $minus = $this.find('button:first'),
                        $plus = $this.find('button:last'),
                        $input = $this.find('input'),

                        minus_step = attrDefault($minus, 'step', -1),
                        plus_step = attrDefault($minus, 'step', 1),

                        min = attrDefault($input, 'min', null),
                        max = attrDefault($input, 'max', null);


                    $this.find('button').on('click', function(ev)
                    {
                        ev.preventDefault();

                        var $this = $(this),
                            val = $input.val(),
                            step = attrDefault($this, 'step', $this[0] == $minus[0] ? -1 : 1);

                        if( ! step.toString().match(/^[0-9-\.]+$/))
                        {
                            step = $this[0] == $minus[0] ? -1 : 1;
                        }

                        if( ! val.toString().match(/^[0-9-\.]+$/))
                        {
                            val = 0;
                        }

                        $input.val( parseFloat(val) + step ).trigger('keyup');
                        console.log($input.attr('id') + ' ' + $input.val());
                        var pipes = _.where(self.customMap.customPipes.pipes, {dn: $input.attr('id') });
                        $.each(pipes, function (i, e) {
                            e.strokeWeight = $input.val();
                            e.setStrokeWeight($input.val());
                            e.eventBind();
                        });

                        var cong = _.where(self.customMap.customer.cong.map, {dn: parseInt($input.attr('id').replace("DN",""))});
                        $.each(cong, function (i, e) {
                            e.s = $input.val();
                        });
                        console.log(self.customMap.customer.cong.map);
                    });

                    $input.keyup(function()
                    {
                        if(min != null && parseFloat($input.val()) < min)
                        {
                            $input.val(min);
                        }
                        else

                        if(max != null && parseFloat($input.val()) > max)
                        {
                            $input.val(max);
                        }
                    });

                });
                self.customMap.map.addEventListener('dragend', function (e) {
                    $('input.form-center').attr("value", e.target.getCenter().lng + ',' + e.target.getCenter().lat);
                });
                self.customMap.map.addEventListener('zoomend', function (e) {
                    $('input.form-zoom').attr("value", e.target.getZoom());
                });//zoomend
                break;
            case 'edit':
                //$.each(self.customMap.customPipes.pipes, function (i, e) {
                // e.eventReBind();
                // });
                $('.edit-new').click(function () {
                    if(self.drawingManager._drawingTool.isVisible()){
                        self.drawingManager.close();
                        self.drawingManager._drawingTool.hide();
                    }
                    else
                        self.drawingManager._drawingTool.show();
                });
                $('.edit-save').click(function () {
                    var cong = _.where(self.customMap.customer.cong.map, {dn: parseInt($(".dn-size").val())});
                    console.log(cong.length);
                    tempLine.setStrokeWeight(cong[0].s);
                    tempLine.strokeWeight = cong[0].s;
                    tempLine.setStrokeColor(cong[0].color);
                    tempLine.dn = 'DN' + $(".dn-size").val();
                    tempLine.eventBind();

                    tempLine.reload();
                    if(self.customMap.customer.person == 0){
                        CustomAlert('#modal-1','对不起，您暂时无权修改数据');
                    }
                    else
                        editAjax('/gis/map/sql.do',
                            {type:0,
                                id:$("input.edit-id").val(),//编号
                                m:$("input.edit-m").val(),
                                d:$("select.dn-size").val(),
                                t:$("select.dn-material").val(),
                                p:$("input.edit-p").val(),
                                map:self.customMap.customer.id});

                });
                $('.btn-save').click(function () {
                    if(self.customMap.customer.person == 0){
                        CustomAlert('#modal-1','对不起，您暂时无权修改数据');
                    }
                });
				/*
				 $.each(pipes, function (i, e) {
				 e.strokeWeight = $input.val();
				 e.setStrokeWeight($input.val());
				 e.eventBind();
				 });

				 var cong = _.where(self.customMap.customer.cong.map, {dn: parseInt($input.attr('id').replace("DN",""))});
				 $.each(cong, function (i, e) {
				 e.s = $input.val();
				 });*/

                break;
            case 'struct':
                $('.struct-reset').click(function () {
                    $.each(self.customMap.customPipes.struct, function (i, e) {
                        e.setStrokeColor(e.scolor);
                        e.reset();
                    });
                });
                $('.struct-save').click(function () {
                    if(self.customMap.customPipes.struct.length > 1){
                        if(self.customMap.customer.person == 0){
                            CustomAlert('#modal-1','对不起，您暂时无权修改数据');
                        }
                        else
                            editAjax('/gis/map/struct.do',
                                {type:0,map:self.customMap.customer.id,lines:self.customMap.customPipes.struct.getString()});

                        $.each(self.customMap.customPipes.struct, function (i, e) {
                            e.setStrokeColor(e.color);
                            e.scolor = e.color;
                        });
                        self.customMap.customPipes.struct = [];
                        $('input.edit-polyline').attr("value",self.customMap.customPipes.struct.getString());
                    }
                    else{
                        CustomAlert('#modal-1','请选择相关联的管段');
                    }

                });
                break;
            case 'point':
                $('.point-add').click(function () {
                    self.customMap.control.btn = true;
                });
                $('.point-reset').click(function () {
                    $.each(self.customMap.customPipes.struct, function (i, e) {
                        e.setStrokeColor(e.color);
                    });
                    self.customMap.customPipes.struct = [];
                    $('input.point-coor').attr("value", '');
                    $('input.point-polyline').attr("value", '');
                    self.customMap.control.btn = false;
                });
                $('.point-save').click(function () {
                    if(self.customMap.customer.person == 0){
                        CustomAlert('#modal-1','对不起，您暂时无权修改数据');
                    }
                    editAjax('/gis/map/struct.do',
                        {type:2,map:self.customMap.customer.id,lines:self.customMap.customPipes.struct.getString(),p:$("input.point-coor").val()});

                    $.each(self.customMap.customPipes.struct, function (i, e) {
                        e.setStrokeColor(e.color);
                    });
                    self.customMap.customPipes.struct = [];
                    $('input.point-coor').attr("value", '');
                    $('input.point-polyline').attr("value", '');
                    self.customMap.control.btn = false;
                });
                self.customMap.map.addEventListener('click', function (e) {
                    console.log(self.customMap.control.show);
                    if(self.customMap.control.show == (self.customMap.control.show | 0x40)){
                        if(self.customMap.control.btn){
                            self.customMap.control.btn = false;
                            $('input.point-coor').attr("value", e.point.lng + ',' + e.point.lat);


                            var pointMaker = new CustomMarker(self.customMap.marker,e.point,parseInt($(".point-coordinate").val()),0);

                            pointMaker.enableDragging();
                            pointMaker.addEventListener('dragend', function (o) {
                                //alert('OK');
                                console.log(o.target.getPosition());
                                $('input.point-coor').attr("value", o.point.lng + ',' + o.point.lat);
                            });
                            e.target.addOverlay(pointMaker);
                        }

                    }
                    console.log(e.target);
                });
                break;
            case 'pipe-m':
                $(ele).on('click', 'div.items > label', function () {
                    //console.log($(this).text() + "," + $(this).prev().prop('checked'));
                    var arryObject;
                    switch($(this).text()){
                        case '监测点':
                            arryObject = _.where(self.cmap.makers.markers, {type: 0});
                            break;
                        case '阀门':
                            arryObject = _.where(self.cmap.makers.markers, {type: 1});
                            break;
                        case '消防栓':
                            arryObject = _.where(self.cmap.makers.markers, {type: 2});
                            break;
                        case '水流方向':
                            arryObject = self.cmap.makers.arrows;
                            break;
                        default:
                            arryObject = _.where(self.cmap.customPipes.pipes, {material: $(this).text()});
                            break;
                    }
                    if($(this).prev().prop('checked') == false){
                        $.each(arryObject, function (i, e) {
                            e.show();
                        });
                    }
                    else{
                        $.each(arryObject, function (i, e) {
                            e.hide();
                        });
                    }
					/*
					 if($(this).text()==='监测点'){
					 console.log($(this).text());
					 if($(this).prev().prop('checked') == false){
					 $.each(self.cmap.makers.markers, function (i, e) {
					 e.show();
					 });
					 }
					 else{
					 $.each(self.cmap.makers.markers, function (i, e) {
					 e.hide();
					 });
					 }
					 }
					 else{
					 console.log($(this).text() + " !=");
					 var pipes = _.where(self.cmap.customPipes.pipes, {material: $(this).text()});
					 if($(this).prev().prop('checked') == false){
					 $.each(pipes, function (i, e) {
					 e.show();
					 });
					 }
					 else{
					 $.each(pipes, function (i, e) {
					 e.hide();
					 });
					 }
					 }*/

                });
                break;
            case 'pipe-area':
                $(ele).on('click', 'div.items > label', function () {

                    var areas = _.where(self.cmap.customPipes.area, {name: $(this).text()});
                    if($(this).prev().prop('checked') == false){
                        $.each(areas, function (i, e) {
                            e.show();
                        });
                    }
                    else{
                        $.each(areas, function (i, e) {
                            e.hide();
                        });
                    }
                });
                break;
        }

    }

    CustomControl.prototype.editDrawManger = function () {
        var self = this.customMap;
        var styleOptions = {
            strokeColor:"red",    //边线颜色。
            fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 2,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.7,	   //边线透明度，取值范围0 - 1。
            fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }

        this.drawingManager = new BMapLib.DrawingManager(self.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_LEFT, //位置
                offset: new BMap.Size($(".col-md-4").width() + 15, 10), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        this.drawingManager.addEventListener('overlaycomplete', function (o) {
            console.log(self);
            if(o.overlay instanceof BMap.Marker){
                console.log('editComplete');
                o.overlay.addEventListener('click', function(e){
                    console.log('click');
                    CustomAlert('#modal-1',e.target.getPosition().lng + ",\"y\":" + e.target.getPosition().lat);
                });
                o.overlay.enableDragging();
            }
            else if(o.overlay instanceof BMap.Polyline){
                o.overlay.id = 0;
                var pipe = new CustomPipe(self.customPipes,o.overlay.getPath(), {
                    strokeColor: "red",
                    strokeWeight: 2,
                    strokeOpacity: 0.9
                });
                //初始化管网数据
                pipe.id = 0;
                pipe.material = "--";//_.findWhere(data.materials, {id: item.material}).name;
                pipe.dn = 'DN--';
                pipe.color = "red";
                pipe.points = o.overlay.getPath();
                pipe.time ='2016-09-19';
                pipe.control = 1;
                pipe.index = self.customPipes.pipes.length - 1;

                self.map.removeOverlay(o.overlay);
                self.map.addOverlay(pipe);
                self.customPipes.pipes.push(pipe);
                pipe.addEventListener('rightclick', function(e){
                    self.map.removeOverlay(e.target);
                });
            }
            else{

                o.overlay.addEventListener('click', function(e){
                    var points = "";
                    e.target.getPath().forEach(function(e){
                        points += "new BMap.Point(" + e.lng + "," + e.lat  + "),";
                    });
                    CustomAlert('#modal-1',points);

                });

            }

            o.overlay.addEventListener('rightclick', function(e){
                self.map.removeOverlay(e.target);
            });
        });
        //drawingManager._close();
        //self.map.removeOverlay(drawingManager._drawingTool );
        this.drawingManager._drawingTool.hide();
    }

    CustomControl.prototype.render = function (id) {
        var self = this.cmap;
        var num = 0;
        var offset = 0x01<<(id-1);
        if((self.con_index & offset) == offset){
            self.control[id].hide();
            self.con_index -= self.con_index & offset;
        }
        else{
            self.con_index = self.con_index | offset;
            self.control[id].show();
        }
        for(var i=1;i<self.control.length;i++){
            offset = 0x01<<(i-1);
            if((self.con_index & offset) == offset){
                self.control[i].setOffset(new BMap.Size(185*(num++) + 10, 10));
            }
        }
    }

    CustomControl.prototype.renderChart = function (id) {
        var self = this.cmap;
        var num = 0;
        var offset = 0x01<<(id-1);
        //console.log(offset);
        if(self.edit){
            self.edit = !self.edit;
            self.customedit.hide();
        }
        if((self.chart_index & offset) == offset){
            self.customPipes.charts[id-1].hide();
            self.chart_index -= self.chart_index & offset;
            //console.log(self.con_index + ", ," + id);
        }
        else{
            self.chart_index = self.chart_index | offset;
            self.customPipes.charts[id-1].show();
            //console.log(self.con_index + ",=," + id);
        }

        for(var i=0;i<self.customPipes.charts.length - 1;i++){
            offset = 0x01<<(i);
            console.log(self.chart_index + " : " + offset);
            if((self.chart_index & offset) == offset){

                self.customPipes.charts[i].setOffset(new BMap.Size(10, 10 + 300*(num++)));
            }
        }

        if((self.chart_index & 0x02) == 0x02){
            self.customPipes.charts[2].show();
            if((self.chart_index & 0x01) == 0x01){
                self.customPipes.charts[i].setOffset(new BMap.Size(410,310));
            }
            else{
                self.customPipes.charts[i].setOffset(new BMap.Size(410,10));
            }
        }
        else{
            self.customPipes.charts[2].hide();
        }

    }
    CustomControl.prototype.renderEdit = function () {
        var self = this.cmap;
        self.edit = !self.edit;
        if(self.edit){
            self.customPipes.charts[0].hide();
            self.customPipes.charts[1].hide();
            self.customPipes.charts[2].hide();
            self.customPipes.charts[1].setOffset(new BMap.Size(10,10));
            self.customPipes.charts[2].setOffset(new BMap.Size(410,10));
            self.customedit.show();
        }
        else
            self.customedit.hide();
    }
    exports('CustomControl', CustomControl);
});