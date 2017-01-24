var customEdit,currLine=null;//临时类，currLine当前编辑线段
/**
 * 用户自定义控件
 */

function CustomEdit(self, data, target) {
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.data = data;
    this.target = target;
    this.element = document.createElement("div");
    this.cmap = self;
    this.type = 0;
    this.icon = [];
    this.icon.push(new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0)
    }));
    this.icon.push(new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, -25)
    }));
    this.marker = [];
    
    this.polyline = [];
    this.maker_p = [];
    this.startP;
    this.lineM;
    this.lineInfo = [];
    
    this.flag = false;
    this.newpolyline;
    this.lines = [];
    
    this.currLine;
}
/**
 * 原型继承BMap.Control
 * @type {BMap.Control}
 */
CustomEdit.prototype = new BMap.Control();
/**
 * 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
 * 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
 * @param map
 * @returns {Element|*}
 */
CustomEdit.prototype.initialize = function () {
	var color;
    this.map = this.cmap.map;
    if(this.target == 'edit'){
    	$.ajax({
	        url: $('#ctx').val() + '/gis/map/color.do',
	        type: 'POST',
	        cache: false,
	        async:false,
	        dataType: 'json',
	        success: function (data) {
	        	color = data.type;
	        }
	    });
    }
    this.color = color;
    this.initViewControl();
    var ele = this.element;
    this.map.getContainer().appendChild(ele);
    switch (this.target) {
	    case 'new':
	    	this.eventCreat();
	    	break;
	    default:
	    	this.editInitialize();
	    	this.editDrawManger();
	    	break;
    }
    
    return ele;
}
/**
 * 初始化控制面板
 */
CustomEdit.prototype.initViewControl = function () {
    var ele = this.element, $panel;
    this.defaultOffset = new BMap.Size(10, 10);
    switch (this.target) {
        case 'new':
            //地图设置，CAD导入控制面板
            var panelmap = 
            	'<div class="panel panel-default">'+
					'<div class="panel-heading">'+
						'<h4 class="panel-title">'+
							'<a data-toggle="collapse" data-parent="#accordion-test" href="#collapseOne">'+
							'CAD数据导入'+
							'</a>'+
						'</h4>'+
					'</div>'+
					'<div id="collapseOne" class="panel-collapse collapse in">'+
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
                panelmap +
                '</div></div>');
            break;
        case 'edit':
        	var paneledit = 
        		'<div class="panel panel-default">'+
					'<div class="panel-heading">'+
						'<h4 class="panel-title">'+
						'<a data-toggle="collapse" data-parent="#accordion-test" href="#collapseOne">管网数据编辑</a>'+
						'</h4>'+
					'</div>'+
				'<div id="collapseOne" class="panel-collapse collapse in">'+
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
					'<option value="100">DN100</option>'+
					'<option value="150">DN150</option>'+
					'<option value="200">DN200</option>'+
					'<option value="250">DN250</option>'+
					'<option value="300">DN300</option>'+
					'</select>'+
					'</div>'+
					
					'<label for="field-1" class="col-sm-1 control-label" style="text-align:right;padding:7px 0px 0px 0px">材质</label>'+
					'<div class="col-md-2">'+
					'<select name="dn-material" class="dn-material" style="display: block; visibility: visible; height: 30px; position: absolute; top: 0px; cursor: pointer; z-index: 999999; padding: 0px;">'+
					'<option class="dn-material" value="1">钢管</option>'+
					'<option class="dn-material" value="2">PE</option>'+
					'<option class="dn-material" value="3">水泥管</option>'+
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
					'<button class="btn btn-success edit-save col-sm-offset-1" type="button">保存修改</button>'+
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
					'<a data-toggle="collapse" data-parent="#accordion-test" href="#collapseTwo">管网管段合并</a>'+
					'</h4>'+
					'</div>'+
					'<div id="collapseTwo" class="panel-collapse collapse">'+
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
					'<a data-toggle="collapse" data-parent="#accordion-test" href="#collapseThree">附属设备编辑（开发中）</a>'+
					'</h4>'+
				'</div>'+
				'<div id="collapseThree" class="panel-collapse collapse">'+
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
        	var str=[];
        	this.color.forEach(function(e){  
        		str.push('<div class="col-md-3" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
			    	'<label for="field-1" class="col-md-6 control-label" style="padding:7px 10px 0px 0px">' + e.dn + '</label>'+
			    	'<div class="col-md-6" style="padding-right:5px;padding-left:5px;text-align:right">'+
				    	'<div class="input-group-addon" style="border:1px solid #ebebeb;">'+
							'<i class="btn color-preview" style="background:' + e.color + ';margin-top:0px;"></i>'+
						'</div>'+
					'</div>'+
				'</div>');
	    	});
        	
        	var panelsys = 
        		'<div class="panel panel-default">'+
				'<div class="panel-heading">'+
				'<h4 class="panel-title">'+
					'<a data-toggle="collapse" data-parent="#accordion-test" href="#collapseFour">'+
						'系统显示设置'+
					'</a>'+
				'</h4>'+
				'</div>'+
				'<div id="collapseFour" class="panel-collapse collapse">'+
					'<div class="panel-body">'+
						'<form role="form" class="form-horizontal form-groups-bordered">'+
						    '<div class="form-group" style="border-bottom:none;padding-top:0px">'+
							    str.join("") +
								'<button class="btn btn-info form-dn" type="button" style="margin-left:5px">保存修改</button>'+
							'</div>'+
							'<div class="form-group" style="border-bottom:none;padding-top:0px">'+
							    '<div class="col-md-4" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
							    	'<label for="field-1" class="col-md-4 control-label" style="padding:7px 10px 0px 0px">塑料管</label>'+
							    	'<div class="col-md-8" style="padding-right:5px;padding-left:5px;text-align:right">'+
										'<div class="input-group">'+
											'<input type="text" class="form-control colorpicker" data-format="hex" value="#5a3d3d" style="padding-left: 6px; padding-right: 2px;"/>'+
											
											'<div class="input-group-addon">'+
												'<i class="btn color-preview" style="background:#2A8ABC;margin-top:0px;"></i>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								
								'<div class="col-md-4" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
							    	'<label for="field-1" class="col-md-4 control-label" style="padding:7px 10px 0px 0px">铸铁管</label>'+
							    	'<div class="col-md-8" style="padding-right:5px;padding-left:5px;text-align:right">'+
										'<div class="input-group">'+
											'<input type="text" class="form-control colorpicker" data-format="hex" value="#5a3d3d" style="padding-left: 6px; padding-right: 2px;"/>'+
											
											'<div class="input-group-addon">'+
												'<i class="btn color-preview" style="background:#2A8ABC;margin-top:0px;"></i>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								
								'<div class="col-md-4" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
							    	'<label for="field-1" class="col-md-4 control-label" style="padding:7px 10px 0px 0px">钢管</label>'+
							    	'<div class="col-md-8" style="padding-right:5px;padding-left:5px;text-align:right">'+
										'<div class="input-group">'+
											'<input type="text" class="form-control colorpicker" data-format="hex" value="#5a3d3d" style="padding-left: 6px; padding-right: 2px;"/>'+
											
											'<div class="input-group-addon">'+
												'<i class="btn color-preview" style="background:#2A8ABC;margin-top:0px;"></i>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								
								'<div class="col-md-4" style="padding-bottom:10px;padding-left:5px;text-align:right">'+
							    	'<label for="field-1" class="col-md-4 control-label" style="padding:7px 10px 0px 0px">水泥管</label>'+
							    	'<div class="col-md-8" style="padding-right:5px;padding-left:5px;text-align:right">'+
										'<div class="input-group">'+
											'<input type="text" class="form-control colorpicker" data-format="hex" value="#5a3d3d" style="padding-left: 6px; padding-right: 2px;"/>'+
											
											'<div class="input-group-addon">'+
												'<i class="btn color-preview" style="background:#2A8ABC;margin-top:0px;"></i>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<button class="btn btn-info form-dn" type="button" style="margin-left:5px">保存修改</button>'+
							'</div>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>';
			$panel = $('<div class="col-md-4" style="background-color:rgba(255, 255, 255, 0.8);width:620px;padding:0px">'+
					'<div class="panel-group" id="accordion-test">'+
					   paneledit + panelpolyline + panelpoint + panelsys +
				'</div></div>');
        	break;
    }
    $(ele).append($panel);
    //$(ele).attr('style', 'padding-top:10px');
}
CustomEdit.prototype.eventCreat = function () {
    var self = this;
    $('button.form-a').attr('disabled',"true");
    $('button.form-b').attr('disabled',"true");
    //$('button.btn-save').attr('disabled',"true");
    //地图放大或者移动时候，获取中心点的坐标以及地图的大小
    self.map.addEventListener('dragend', function (e) {
        $('input.form-center').attr("value", e.target.getCenter().lng + ',' + e.target.getCenter().lat + '-' + e.target.getZoom());
    });
    self.map.addEventListener('zoomend', function (e) {
        $('input.form-center').attr("value", e.target.getCenter().lng + ',' + e.target.getCenter().lat + '-' + e.target.getZoom());
    });//zoomend 
    
    this.map.addEventListener('click', function (e) {
        switch (self.type) {
            case 0x01:
            case 0x02:
                if (self.marker[self.type - 1])
                    e.target.removeOverlay(self.marker[self.type - 1]);
                self.marker[self.type - 1] = new BMap.Marker(e.point, {icon: self.icon[self.type - 1]});
                self.marker[self.type - 1].enableDragging();

                $('input.input-' + self.type).attr("value", e.point.lng + ',' + e.point.lat);
                var id = self.type;
                self.marker[self.type - 1].addEventListener('dragend', function (o) {
                    console.log(o.target.getPosition());
                    
                    $('input.input-' + id).attr("value",o.target.getPosition().lng + ',' + o.target.getPosition().lat);
					if($("input.input-1").val() != '' && $("input.input-2").val() != '')
						self.reloadMap(self);
					
                });
                e.target.addOverlay(self.marker[self.type - 1]);
                break;
        }
        self.type = 0x00;
    });


    $("button.form-a").click(function () {
        self.type = 0x01;

    });
    $("button.form-b").click(function () {
        self.type = 0x02;
    });

    $('body').on('click', 'button.form-cad', function () {
        var formData = new FormData($('#cad-upload')[0]);
        $.ajax({
            url: $('#ctx').val() + '/gis/map/upload.do',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function (data) {
                //alert(data);
            	CustomAlert('#modal-1',data);
            	
                $('button.form-a').removeAttr("disabled");
                $('button.form-b').removeAttr("disabled");
            }
        });
    });

    $('body').on('click', 'button.btn-save', function () {
    	
    	$.ajax({
            url: $('#ctx').val() + '/gis/map/json.do',
            type: 'POST',
            data:{save:'ok',name:$("input.input-3").val()},
            cache: false,
            //processData: false,  // 告诉jQuery不要去处理发送的数据
            //contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            dataType: 'json',
            success: function (data) {
            	CustomAlert('#modal-1',data.data);
            }
        });
    	//self.reloadMap(self);
    });
}
CustomEdit.prototype.reloadMap = function (self) {
	var id = 100;
	self.polyline.forEach(function(e){  
		self.map.removeOverlay(e); 
	}); 
	self.polyline = [];
	$('button.btn-save').removeAttr("disabled");
    $.ajax({
        url: $('#ctx').val() + '/gis/map/json.do',
        type: 'POST',
        data:{acad:$("input.input-a").val(),amap:$("input.input-1").val(),bcad:$("input.input-b").val(),bmap:$("input.input-2").val()},
        cache: false,
        //processData: false,  // 告诉jQuery不要去处理发送的数据
        //contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        dataType: 'json',
        success: function (data) {
        	data.data.forEach(function(m){  
	    		var point = [];
	    		m.forEach(function(e){  
	    			point.push(new BMap.Point(e.x,e.y));
	    		});
	    		
	    		var o = new BMap.Polyline(point,{strokeColor:'#308430', strokeWeight:5, strokeOpacity:0.9});
	    		o.id = id++;
	    		self.polyline.push(o);
	    	});
        	
        	self.polyline.forEach(function(e){  
	    		self.map.addOverlay(e); 
	    		//e.addEventListener("click",_callback);
	    	}); 
        }
    });
}

CustomEdit.prototype.editInitialize = function () {
	var self = this;
	self.polyline.forEach(function(e){  
		self.map.removeOverlay(e); 
	}); 
	self.polyline = [];
	customEdit = self;
	var id = 100;
    $.ajax({
        url: $('#ctx').val() + '/gis/map/map.do',
        type: 'POST',
        cache: false,
        dataType: 'json',
        success: function (data) {
        	data.data.forEach(function(m){  
	    		var point = [];
	    		m.points.forEach(function(e){  
	    			point.push(new BMap.Point(e.x,e.y));
	    		});
	    		
	    		var o = new BMap.Polyline(point,{strokeColor:'#308430', strokeWeight:5, strokeOpacity:0.9});
	    		o.id = m.id;
	    		self.polyline.push(o);
	    	});
        	self.polyline.forEach(function(e){  
	    		self.map.addOverlay(e); 
	    		//e.addEventListener("click",self.editCallback);
	    		e.addEventListener("click",function(o){
	    			self.editPolylineToMarker(o.target);
	    		});
	    	}); 
        }
    });
   
    $("button.edit-save").click(function(){
		//currLine.setStrokeColor('red'); 
    	//console.log('OK');
		self.editAjax('/gis/map/sql.do',
				{type:0,
				 id:$("input.edit-id").val(),//编号
				 m:$("input.edit-m").val(),
				 d:$("select.dn-size").val(),
				 t:$("select.dn-material").val(),
				 p:$("input.edit-p").val()});
		//self.editAjax('/gis/map/sql.do',{type:0,id:currLine.id,m:$("input.edit-m").val(),p:self.getLineJson(currLine)});
	});
    $("button.btn-del").click(function(){
    	
    	currLine.disableEditing();
    	self.map.removeOverlay(currLine);
    	if(self.maker_p.length > 0){
			self.maker_p.forEach(function(e){
				self.map.removeOverlay(e);
			});
			self.maker_p = [];
		}
    	self.editAjax('/gis/map/sql.do',{type:0x01,id:$("input.edit-id").val()});
		self.editRest();
	});
    
    $("button.btn-open").click(function(){
		if(self.flag){
			self.map.removeOverlay(self.newpolyline);
			self.lines = [];
			self.newpolyline = null;
			currLine = null;
			$("button.btn-open").text("功能开启");
		}
		else{
			//if("undefined" != typeof currLine)
			if(currLine != null)
				currLine.disableEditing();
			if(self.maker_p.length > 0){
				self.maker_p.forEach(function(e){
					self.map.removeOverlay(e);
				});
				self.maker_p = [];
			}
			self.editRest();
			$("button.btn-open").text("功能关闭");
		}
		self.flag = !self.flag;
	});
    $("button.btn-reload").click(function(){
		self.editNewPolylineReset();
	});
    $("button.btn-polyline").click(function(){
    	var str = [];
    	
    	self.lines.forEach(function(e){
			self.map.removeOverlay(e);
		});
    	
    	self.lines[0].setPath(self.newpolyline.getPath());
    	
    	self.map.removeOverlay(self.newpolyline);
    	
    	self.map.addOverlay(self.lines[0]);
    	self.lines = [];
    	
    	self.newpolyline.getPath().forEach(function(p){  
    		str.push('{"y":' + p.lat + ',"x":' + p.lng + '}');
    	});
    	//id:$("input.edit-id").val()
		self.editAjax('/gis/map/sql.do',{type:0x02,p:str.join(","),line:$("input.edit-polyline").val()});
    	self.newpolyline = null;
	});
    
    $("button.form-polyline").click(function(){
		self.editNewPolylineRender(true);
	});
	$("button.form-del").click(function(){
		self.editNewPolylineRender(false);
	});
	
	
	$('.color-preview').colpick({
		colorScheme:'dark',
		layout:'rgbhex',
		onSubmit:function(hsb,hex,rgb,el) {
			$(el).css('background-color', '#'+hex);
			$(el).colpickHide();
		}

	});
}
CustomEdit.prototype.editCallback = function(e){
	var self = customEdit;
	switch(e.type){
		case 'onmouseover':
			for(var i=0;i<_poly_p.length;i++)
			{
			      if(_poly_p[0] === e.target)
			      {
			    	  _map_p.openInfoWindow(new BMap.InfoWindow("分区基本信息:" + i),e.point); 
			      }
			 }
			break;
		case 'onmouseout':
			//e.target.getLabel().hide();
			break;
		case 'onclick':
			self.editPolylineToMarker(e.target);
			break;
		default:
			break;
	}
}
CustomEdit.prototype.editLineInfo = function(id){
	
	$('input.edit-id').attr("value",id);
	$('input.edit-m').attr("value",this.lineM);
	$('input.edit-n').attr("value",this.num);
	$('input.edit-p').attr("value",this.lineInfo.join(","));
}
CustomEdit.prototype.editPolylineToMarker = function(p){
	var self = this;
	if(self.flag){//开启线段合并功能
		currLine = p;
		//self.currLine = p;
		self.editNewPolyline();
	}
	else{
		if(currLine != null){
			currLine.setStrokeColor('red'); 
			currLine.disableEditing();
		}
		currLine = p;
		//self.currLine = p;
		p.enableEditing();
		p.setStrokeColor('#308430'); 
		var _p=p.getPath();
		if(self.maker_p.length > 0){
			self.maker_p.forEach(function(e){
				self.map.removeOverlay(e);
			});
			self.maker_p = [];
		}
		self.editRest();
		_p.forEach(function(t){  
			var marker = new BMap.Marker(t);// 创建标注
			self.editInfo(t);
			self.maker_p.push(marker);
			marker.addEventListener("click", function(e){     
				self.map.removeOverlay(e.target);
				self.editPolylineReset(p,self.removepoint(_p,e.target.getPosition()));
			});
			self.map.addOverlay(marker);
		});
		self.editLineInfo(p.id);
	}
}
CustomEdit.prototype.editPolylineReset = function(l,p){
	var self = this;
	console.log('editPolylineReset');
	//self.currLine
	//self.map.removeOverlay(l);
	l.setPath(p);
	self.editPolylineToMarker(l);
	//l.removeEventListener("click",self.editCallback);
	//l.addEventListener("click",self.editCallback);
	//self.map.addOverlay(l);
}
CustomEdit.prototype.removepoint = function(o,p){
  var _o = o;
  for(var i=0;i<o.length;i++)
  {
      if(o[i].lng === p.lng)
      {
    	  _o.remove(i);
    	  return _o;
      }
  }
  return _o;
}
 
CustomEdit.prototype.editRest = function(){
	this.startP = null;
	this.lineM = 0;
	this.num = 0;
	this.lineInfo = [];
	
	$('input.edit-id').attr("value",0);
	$('input.edit-m').attr("value",0);
	$('input.edit-n').attr("value",0);
	$('input.edit-p').attr("value",'');
}
CustomEdit.prototype.editInfo = function(p){
	if(this.startP == null)
		this.startP = p;
	else{
		this.lineM += parseInt(this.map.getDistance(this.startP, p));
		this.startP = p ;
	}
	this.num ++;
	
	this.lineInfo.push('{"y":' + p.lat + ',"x":' + p.lng + '}');
}
CustomEdit.prototype.editNewPolyline = function(){
	this.lines.push(currLine);
	var point = [];
	if(this.lines.length == 1){
		$('input.input-start').attr("value",currLine.id);
		point.push.apply(point, currLine.getPath());
		this.newpolyline = new BMap.Polyline(point,{strokeColor:'red', strokeWeight:5, strokeOpacity:0.9});
		this.map.addOverlay(this.newpolyline);
		//this.newpolyline.setStrokeColor('red'); 
	}
	else{
		point.push.apply(point, this.newpolyline.getPath());
		point.push.apply(point, currLine.getPath());
		this.newpolyline.setPath(point);
	}
	
	$('input.input-current').attr("value",currLine.id);
	this.editNewPolylineInfo();
}
CustomEdit.prototype.editNewPolylineInfo = function(){
	var txt = '',str = [];
	this.lines.forEach(function(e){  
		str.push(e.id);
	});
	$('input.edit-polyline').attr("value",str.join(","));
}
CustomEdit.prototype.editNewPolylineRender = function(b){
	var point = [];
	var self = this;
	console.log('editNewPolylineRender:' + this.lines.length);
	point.push.apply(point, this.newpolyline.getPath());
	//this.map.removeOverlay(this.newpolyline);
	if(b){
		var line = this.lines[this.lines.length - 1];
		line.getPath().forEach(function(e){  
			point = self.removepoint(point,e);
		});
		point.push.apply(point, line.getPath().reverse());
	}
	else{
		var temp = this.lines.pop();
		temp.getPath().forEach(function(e){  
			point = self.removepoint(point,e);
		});
		this.editNewPolylineInfo();
	}
	//point.concat(currLine.getPath());
	this.newpolyline.setPath(point);
	
}
CustomEdit.prototype.editNewPolylineDel = function(){
	var point = [];
	var self = this;
	point.push.apply(point, this.newpolyline.getPath());
	this.map.removeOverlay(this.newpolyline);
	var temp = this.lines.pop();
	temp.getPath().forEach(function(e){  
		point = self.removepoint(point,e);
	});
	//point.push.apply(point, currLine.getPath().reverse());
	
	//point.concat(currLine.getPath());
	this.newpolyline = new BMap.Polyline(point,{strokeColor:'red', strokeWeight:5, strokeOpacity:0.9});
	this.map.addOverlay(this.newpolyline);
	
	this.editNewPolylineInfo();
	
}
CustomEdit.prototype.editNewPolylineReset = function(){
	this.lines = [];
	
	this.map.removeOverlay(this.newpolyline);
	this.newpolyline = null;
	$('input.input-start').attr("value",'');
	$('input.input-current').attr("value",'');
	$('input.edit-polyline').attr("value",'');
}

CustomEdit.prototype.editDrawManger = function () {
	var sef = this;
	var styleOptions = {
	    strokeColor:"red",    //边线颜色。
	    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
	    strokeWeight: 5,       //边线的宽度，以像素为单位。
	    strokeOpacity: 0.7,	   //边线透明度，取值范围0 - 1。
	    fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
	    strokeStyle: 'solid' //边线的样式，solid或dashed。
	}
	var drawingManager = new BMapLib.DrawingManager(this.map, {
	    isOpen: false, //是否开启绘制模式
	    enableDrawingTool: true, //是否显示工具栏
	    drawingToolOptions: {
	        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
	        offset: new BMap.Size(5, 5), //偏离值
	    },
	    circleOptions: styleOptions, //圆的样式
	    polylineOptions: styleOptions, //线的样式
	    polygonOptions: styleOptions, //多边形的样式
	    rectangleOptions: styleOptions //矩形的样式
	});  
	 //添加鼠标绘制工具监听事件，用于获取绘制结果
	drawingManager.addEventListener('overlaycomplete', this.editComplete);
	
}
CustomEdit.prototype.editComplete = function (o) {
	var self = customEdit;
	if(o.overlay instanceof BMap.Marker){
		o.overlay.addEventListener('click', function(e){
			CustomAlert('#modal-1',e.target.getPosition().lng + ",\"y\":" + e.target.getPosition().lat);
		});
		o.overlay.enableDragging();
	}
	else if(o.overlay instanceof BMap.Polyline){
		o.overlay.id = 0;
		o.overlay.addEventListener("click",self.editCallback);
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
}
CustomEdit.prototype.editAjax = function (url,data) {
	$.ajax({
	    url: $('#ctx').val() + url,
	    type: 'POST',
	    data:data,
	    cache: false,
	    dataType: 'json',
	    success: function (data) {
	    	//CustomAlert('#modal-1',data.msg);
	    }
	});
}
CustomEdit.prototype.getLineJson = function (l) {
	var str = [];
	var lat=0,lng=0;
	l.getPath().forEach(function(p){  
		if(p.lat != lat || p.lng != lng){
			str.push('{"y":' + p.lat + ',"x":' + p.lng + '}');
			p.lat = lat ;
			p.lng = lng ;
		}
		
	});
	
	return str.join(",");
}