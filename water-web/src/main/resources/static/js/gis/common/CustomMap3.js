/**
 * CustomMap构造方法
 * @param id
 * @constructor
 */
function CustomMap(id,b,tag) {
    this.map = new BMap.Map(id);//在百度地图容器中创建一个地图
    this.customer = customer;
    this.control;//控制面板
    this.infomation;//信息面板
    this.customPipes;//管段
    this.points;//附属设备
    
    //this.initData(this.initialize);
    this.createMap();
    this.initialize();
};
/**
 * 初始化百度地图
 * @param point 显示中心坐标
 * @param zoom  地图大小
 */
CustomMap.prototype.createMap = function () {
    this.map.centerAndZoom(new BMap.Point(this.customer.cong.center.x, this.customer.cong.center.y), this.customer.cong.zoom);//设定地图的中心点和坐标并将地图显示在地图容器中
    this.map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    this.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    this.map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    this.map.enableKeyboard();//启用键盘上下左右键移动地图
    var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
    this.map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
    this.map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    //var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
    //this.map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    //var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    //this.map.addControl(ctrl_sca);
}

CustomMap.prototype.constructor = CustomMap;
CustomMap.prototype.initData = function (callback) {
	var self = this;
    var url = $('#ctx').val() + '/resources/data/CustomMap.json';
    $.post(url, {}, function (data) {
        callback.call(self, data);
    });
}
CustomMap.prototype.initialize = function () {
	this.control = new MapControl(this.map,this.customer);
	//创建地图显示控件
	/*
	if(this.edit){
		this.createMap(new BMap.Point(106.470333,29.57471),data.zoom);
		this.draw(data);
	}
	else{
		this.createMap(new BMap.Point(data.point.x, data.point.y),data.zoom);
		this.createControl(data);
		//显示内容
		this.customPipes = new CustomPipes(data,this.map);
		this.makers = new CustomMarkers(this.map);
		this.initArea();
		this.updateMarkers();
	}*/
	
};

/**
 * 创建地图控件：管段口径、管材、显示面板
 * @param data 参数
 */
CustomMap.prototype.createControl = function (data) {
	var self = this;
	self.control.push(new CustomControl(this,data, 'view'));
	self.control.push(new CustomControl(this,data, 'pipe-dn'));
	self.control.push(new CustomControl(this,data, 'pipe-m'));
	self.control.push(new CustomControl(this,data, 'pipe-area'));
	//self.control[0].hide();
	$.each(self.control, function (index, e) {
		self.map.addControl(e);
		//if(index != self.con_index){
			self.control[index].hide();
		//}
		//console.log("createControl:" + index + " " + e);
	});
	
}
CustomMap.prototype.draw = function (data) {
	this.customedit = new CustomEdit(this,null,this.edit_tag);
	this.map.addControl(this.customedit);
}
CustomMap.prototype.updateMarkers = function () {
	var self = this;
	var myDate = new Date();
	
	//this.customPipes.charts.update();
    var f = Math.random() * 0.20;
    var r = Math.random() * 0.20;//).toFixed(2);
    
    self.ftotal += f;
    self.rtotal += r;
    
    var data = {
        time: myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes()  + ':' +  myDate.getSeconds()  + ' ' +  myDate.getMilliseconds(),
        flow: (Math.random() * 0.20).toFixed(2),
        press: Math.random().toFixed(2)
    };
    
  
    var ctx = $('#marker-1412900001');
    
    ctx.empty();
	$('<div class="arrow"></div><h3 class="popover-title time">时间：' + data.time + '</h3>' +
    //'<div class="popover-content flow">流量：+0.85 m³，-0.15 m³</div>' +
    '<div class="popover-content press">正向：' + self.ftotal.toFixed(2) +' m³ ，' + f.toFixed(2) + ' m³<br/>' +
    '反向：' + self.rtotal.toFixed(2) + ' m³ ，' + r.toFixed(2) + ' m³<br/>' +
    '压力 / 瞬时：' + (Math.random() * 0.50).toFixed(2) + ' MPa / ' +(Math.random() * 3).toFixed(2) +' m³/h<br/>'+
    '</div>').appendTo(ctx);
    
	
	if($('#arrow-1412900001').attr("direction") == 'true' && f>r){
 	   $('#arrow-1412900001').attr("direction", false); 
 	   var d = $('#arrow-1412900001').attr("value") + 180;
 	   $('#arrow-1412900001').css("transform","rotate("+ d +"deg)");
    }
	else if($('#arrow-1412900001').attr("direction") == 'false' && f<r){
		$('#arrow-1412900001').attr("direction", true); 
	 	   var d = $('#arrow-1412900001').attr("value") - 180;
	 	   $('#arrow-1412900001').css("transform","rotate("+ d +"deg)");
	}
	
    //console.log("render:" + " " + data.time);
    setTimeout('cmap.updateMarkers()',5*1000);
}
CustomMap.prototype.initArea = function () {
	var area = [new BMap.Point(110.052387,41.022459),new BMap.Point(110.062654,41.02185),new BMap.Point(110.068875,41.024503),new BMap.Point(110.070537,41.029136),new BMap.Point(110.068583,41.032102),new BMap.Point(110.066706,41.031871),new BMap.Point(110.05881,41.026918)];
   
	this.polygon = new BMap.Polygon(area, { fillColor:"#96D3FD", strokeColor:"#85B4D5",fillOpacity: 0.2, strokeWeight:5, strokeOpacity:0.4,strokeStyle:"dashed"});
	this.map.addOverlay(this.polygon);
	if(valve != 5){
		this.polygon.hide();
	}
	
	var sContent = '<div class="tile-stats tile-white-green" style="border:none;padding:0px">' +
						'<div class="icon">' +
						'<i class="entypo-paper-plane"></i>' +
						'</div>' +
						'<div class="num" style="font-size: 32px;">漏损：30%</div>' +
						'<h3>县镇新区</h3>' +
						'<p>居民用户：3000户，企业：120户</p>' +
	               '</div>';
	var infoWindow = new BMap.InfoWindow(sContent); 
	var self = this;
	this.polygon.addEventListener("click", function(e){          
		self.map.openInfoWindow(infoWindow,e.point); //开启信息窗口
	});
}
CustomMap.prototype.updateArea = function () {
	if(valve == 5)
		this.polygon.show();
	else
		this.polygon.hide();
}

/**
 * 初始化地图组件
 * @param data
 */
CustomMap.prototype.init = function (data) {

	this.initArea();
    //创建管网
    this.createPipes(data.pipes);
    //创建水流方向
    //this.createArrows();
    //创建标记
    //this.createMarkers();
    this.makers = new CustomMarkers(this.map);
    //创建控制器
    this.createZoomControl(data);
    //创建管道信息面板
    this.createPipePanel(data);
    this.pipe = false;
    this.other = false;

};
