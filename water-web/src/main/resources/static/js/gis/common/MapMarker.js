function MapMarker(self) {
	this.customMap = self;
	this.points = [];
	this.valve = [];
    this.initData(this.initialize);
};
MapMarker.prototype.constructor = MapMarker;
MapMarker.prototype.initData = function (callback) {
	var self = this;
    $.ajax({
        url: $('#ctx').val() + '/gis/map/actionStruct.do',
        type: 'POST',
        data:{type:0,map:self.customMap.customer.id},
        cache: false,
        dataType: 'json',
        success: function (data) {
            callback.call(self, data);
        }
    });
}
MapMarker.prototype.initialize = function (data) {
	var self = this;
	console.log('initialize ' + data.points.length);
	$.each(data.points, function (i, e) {
		var valveMarker,pointMarker;
        if(e.flag > 0){
        	//console.log(e.points.x + ',' + e.points.y);
        	//112.556277,37.439439
        	valveMarker = new CustomMarker(self,new BMap.Point(e.points.x, e.points.y),0,e.id);
        	valveMarker.flag = e.flag;
        	//valveMarker.id = e.id;
        	if(e.flag == 2)
        		valveMarker.render();
        	else
        		valveMarker.hide();
        	self.valve.push(valveMarker);
        	self.customMap.map.addOverlay(valveMarker);
        	
        }
        
        if(e.b == 1){
        	pointMarker = new CustomMarker(new BMap.Point(e.point.x, e.point.y),1);
        	self.points.push(pointMarker);
        	self.customMap.map.addOverlay(pointMarker);
        }
    });
}
MapMarker.prototype.render = function () {
	var self = this,closed=[];
	$.each(self.valve, function (i, e) {
		if(!e.open)
			closed.push(e.id);
    });
	self.doAjax('/gis/map/actionStruct.do',{map:self.customMap.customer.id,valve:closed.join(','),type:1},self.doRender);
}
MapMarker.prototype.doAjax = function(url,data,callback) {
	var self = this;
	$.ajax({
	    url: $('#ctx').val() + url,
	    type: 'POST',
	    data:data,
	    cache: false,
	    dataType: 'json',
	    success: function (data) {
	    	//CustomAlert('#modal-1',data.msg);
	    	callback.call(self,data);
	    }
	});
}
MapMarker.prototype.doRender = function(data){
	var self = this,points=[];//tArray[k]=new Array()
	$.each(self.customMap.customPipes.pipes, function (n, e) {
		
		var bool = data.valve.indexOf(e.id + '');
		//console.log(data.valve + " " + bool)
		if(bool > -1){
			e.setStrokeColor('red');
		}
		else
			e.setStrokeColor(e.color);
		
    });
	/*
	$.each(self.customMap.customPipes.area, function (i, e) {
		self.customMap.map.removeOverlay(e);
    });
	self.customMap.customPipes.area = [];
	var arr = data.valve.split(";");
	$.each(arr, function (i, e) {
		points[i] = new Array();
	});
	$.each(self.customMap.customPipes.pipes, function (n, e) {
		for(var i=0;i<arr.length;i++ ){
			var bool = arr[i].indexOf(e.id + '');
			//console.log(data.valve + " " + bool)
			if(bool > -1){
				e.setStrokeColor('red');
				points[i].push.apply(points[i], e.getPath());
			}
			else
				e.setStrokeColor(e.color);
		}
		
    });
	$.each(points, function (i, e) {
		if(e.length > 2){
			var polygon = new BMap.Polygon(getGrahampoints(e), { fillColor:"#FBB68D", strokeColor:"#D7824E",fillOpacity: 0.4, strokeWeight:5, strokeOpacity:0.5,strokeStyle:"dashed"}); 
			self.customMap.customPipes.area.push(polygon);
			self.customMap.map.addOverlay(polygon);
		}
	});*/
	//console.log(data);
}