/**
 * 用户自定义控件
 */
function MapEdit(self, target) {
    // 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.customMap = self;
    this.target = target;
    this.element = document.createElement("div");
    this.cmap = self.map;
    this.data = self.customer.cong.map;
  
}
/**
 * 原型继承BMap.Control
 * @type {BMap.Control}
 */
MapEdit.prototype = new BMap.Control();
/**
 * 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
 * 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
 * @param map
 * @returns {Element|*}
 */
MapEdit.prototype.initialize = function (map) {
    this.map = map;
    this.initViewControl();
    var ele = this.element;
    this.map.getContainer().appendChild(ele);
    this.event();
    return ele;
}
/**
 * 初始化控制面板
 */
MapEdit.prototype.initViewControl = function () {
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
					'<a data-toggle="collapse" data-parent="#accordion-test" href="#collapseFour">'+
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
					'<div class="panel-group" id="accordion-test">'+
					    panelsys +
				'</div></div>');
	    	break;
	    case 'pipe-m':
	    	$panel = $('<div class="pipe-dn">' +
    			  '<div class="items">' +
    			  '</div>' +
    			'</div>');
	        $.each(this.data.materials, function (index, item) {
	            var $input = $('<input id="materials-' + item.id + '" type="checkbox" checked/>');
	            var $label = $('<label for="materials-' + item.id + '">').text(item.name);
	          
	            $('div.items', $panel).append($input, $label);
	        });
	        $('div.items', $panel).append($('<input id="materials-a" type="checkbox" checked/>'), $('<label for="materials-a">').text('监测点'));
	        $('div.items', $panel).append($('<input id="materials-e" type="checkbox" />'), $('<label for="materials-e">').text('消防栓'));
	        $('div.items', $panel).append($('<input id="materials-b" type="checkbox" checked/>'), $('<label for="materials-b">').text('阀门'));
	        $('div.items', $panel).append($('<input id="materials-c" type="checkbox" checked/>'), $('<label for="materials-c">').text('管道井'));
	        $('div.items', $panel).append($('<input id="materials-d" type="checkbox" checked/>'), $('<label for="materials-d">').text('水流方向'));
	        var $hdone = $('<h2 class="done" aria-hidden="true">').text('显示类型');
	        var $hudone = $('<h2 class="undone" aria-hidden="true">').text('隐藏类型');
	        $('div.items', $panel).append($hdone, $hudone);
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
MapEdit.prototype.event = function () {
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
	    			console.log(self.customMap.customer.cong.map);
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
MapEdit.prototype.render = function (id) {
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

MapEdit.prototype.renderChart = function (id) {
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
MapEdit.prototype.renderEdit = function () {
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
