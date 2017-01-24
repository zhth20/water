/**
 * 
 */
function CustomDebug(map) {
    // 默认停靠位置和偏移量
	
    this.map = map;
    /*
    this.polygonPoints = [
         new BMap.Point(110.026138,41.035163),
         new BMap.Point(110.031708,41.036388),
         new BMap.Point(110.039793,41.035218),
         new BMap.Point(110.046548,41.032742),
         new BMap.Point(110.048991,41.029014),
         new BMap.Point(110.043494,41.026374),
         new BMap.Point(110.042056,41.023408),
         new BMap.Point(110.034187,41.021612),
         new BMap.Point(110.024198,41.021503),
         new BMap.Point(110.020892,41.027408),
         new BMap.Point(110.021431,41.03168),
         
         new BMap.Point(110.027899,41.032823),
         new BMap.Point(110.035193,41.033313),
         new BMap.Point(110.027037,41.029395),
         new BMap.Point(110.035229,41.028769),
         new BMap.Point(110.03045,41.025367),
         new BMap.Point(110.035804,41.02436),
         new BMap.Point(110.040332,41.027055),
         new BMap.Point(110.042092,41.031354)
         ];
    */
    this.firePoints=[new BMap.Point(110.065538,41.045828),new BMap.Point(110.069616,41.045774),new BMap.Point(110.070065,41.044686),new BMap.Point(110.06746,41.044223),new BMap.Point(110.065143,41.041829),new BMap.Point(110.074737,41.043475),new BMap.Point(110.072239,41.037857),new BMap.Point(110.071467,41.04153),new BMap.Point(110.076156,41.036891),new BMap.Point(110.069814,41.036755),new BMap.Point(110.068305,41.035422),new BMap.Point(110.064137,41.033422),new BMap.Point(110.065197,41.039421),new BMap.Point(110.077414,41.038877)];
    this.valvePoints=[new BMap.Point(110.0536,41.020663),new BMap.Point(110.066284,41.016526),new BMap.Point(110.052917,41.014022)];
    this.polygonPoints = [new BMap.Point(110.053671,41.020717),new BMap.Point(110.063104,41.021248),new BMap.Point(110.066302,41.016417),new BMap.Point(110.052899,41.013859),new BMap.Point(110.052917,41.013899)];
    this.polygon = [];
    this.initialize();
    this.draw();
}
CustomDebug.prototype.initialize = function () {
	var sef = this;
	var styleOptions = {
	    strokeColor:"red",    //边线颜色。
	    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
	    strokeWeight: 3,       //边线的宽度，以像素为单位。
	    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
	    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
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
	drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
	
	
	
}
CustomDebug.prototype.overlaycomplete = function (o) {
	if(o.overlay instanceof BMap.Marker){
		o.overlay.addEventListener('click', function(e){
			alert("new BMap.Point(" +e.target.getPosition().lng + "," + e.target.getPosition().lat  + ")");
		});
	}
	else{
		o.overlay.addEventListener('click', function(e){
			var points = "";
			e.target.getPath().forEach(function(e){
				points += "new BMap.Point(" + e.lng + "," + e.lat  + "),";
			});
			
			alert(points);
			
		});
	}
}
CustomDebug.prototype.draw = function () {
	var sef = this;
	//new BMap.Point(110.061352,41.046427),new BMap.Point(110.065933,41.048263),new BMap.Point(110.071341,41.047474),new BMap.Point(110.076659,41.046359),new BMap.Point(110.080522,41.039122),new BMap.Point(110.083827,41.032265),new BMap.Point(110.061765,41.031408),new BMap.Point(110.059879,41.03534),new BMap.Point(110.058459,41.040863)
	//new BMap.Point(110.061747,41.031408),new BMap.Point(110.083845,41.032265),new BMap.Point(110.084474,41.025939),new BMap.Point(110.07206,41.00426),new BMap.Point(110.055531,41.003117),new BMap.Point(110.038571,41.005785),new BMap.Point(110.041374,41.023367)
	var polygon = new BMap.Polygon(this.graham(), { fillColor:"#8AF9F0", strokeColor:"#60BCB4",fillOpacity: 0.4, strokeWeight:5, strokeOpacity:0.5,strokeStyle:"dashed"}); 
	this.map.addOverlay(polygon);
	
	var markerIcon = new BMap.Icon("resources/assets/images/markers.png", new BMap.Size(23, 25), {  
	    offset: new BMap.Size(10, 25), // 指定定位位置  
	    imageOffset: new BMap.Size(0, 0 - 9 * 25) // 设置图片偏移  
	});  
	
	this.firePoints.forEach(function(e){
		 var marker = new BMap.Marker(e,{icon:markerIcon});
		 marker.addEventListener('click', function(e){
				alert(e.target.getPosition().lng + "," + e.target.getPosition().lat);
			});
		 sef.map.addOverlay(marker);
	});
	
	markerIcon.setImageOffset(new BMap.Size(0, 0 - 8 * 25)) ;
	this.valvePoints.forEach(function(e){
		 var marker = new BMap.Marker(e,{icon:markerIcon});
		 marker.addEventListener('click', function(e){
				alert(e.target.getPosition().lng + "," + e.target.getPosition().lat);
			});
		 sef.map.addOverlay(marker);
	});
	this.polygonPoints.forEach(function(e){
		 var marker = new BMap.Marker(e);
		 marker.addEventListener('click', function(e){
				alert(e.target.getPosition().lng + "," + e.target.getPosition().lat);
			});
		 //sef.map.addOverlay(marker);
	});
	
	
	
}
CustomDebug.prototype.graham = function () {
	return getGrahampoints(this.polygonPoints);
}
function getDistance(a,b){
	return Math.sqrt((a.lng - b.lng)*(a.lng - b.lng) - (a.lat - b.lat)*(a.lat - b.lat));
}
function getMultiply(b,c,a){
	return (b.lng - a.lng)*(c.lat - a.lat) - (c.lng - a.lng)*(b.lat - a.lat);
}
function getGrahampoints(points){
	
	var temp,polygon=[],i=0,i=0,k=0,top=2;
	
	for(i=0;i<points.length;i++){
		if((points[i].lat <= points[k].lat)&&(points[i].lng < points[k].lng))
			k=i;
	}
	
	temp=points[0];
	points[0]=points[k];
	points[k]=temp;
	
	for(i=1;i<points.length-1;i++){
		k=i;
		for(j=i+1;j<points.length;j++){
			if((getMultiply(points[j],points[k],points[0])>0)||((getMultiply(points[j],points[k],points[0])==0)&&(getDistance(points[0],points[j])>getDistance(points[0],points[k]))))
				k=j;
		}
		temp=points[i];
		points[i]=points[k];
		points[k]=temp;
	}
	
	polygon.push(points[0]);
	console.log(points[0].lng + "," + points[0].lat);
	polygon.push(points[1]);
	console.log(points[1].lng + "," + points[1].lat);
	polygon.push(points[2]);
	console.log(points[2].lng + "," + points[2].lat);
	
	for(i=3;i<points.length;i++){
		while(getMultiply(points[i],polygon[top],polygon[top-1])>=0)
			top--;
		
		polygon[++top]=points[i];
	}
	while(polygon.length > top+1)
		polygon.pop();
	
	return polygon;
}
/*new BMap.Point(110.02718,41.041938),new BMap.Point(110.027144,41.039272),new BMap.Point(110.025276,41.037204)
new BMap.Point(110.029399,41.039109),new BMap.Point(110.031555,41.041163)
new BMap.Point(110.032157,41.038768),new BMap.Point(110.034358,41.040653)
new BMap.Point(110.027216,41.039299),new BMap.Point(110.030845,41.038972),new BMap.Point(110.028941,41.036551)
new BMap.Point(110.030845,41.038966),new BMap.Point(110.034798,41.03834),new BMap.Point(110.034798,41.03834)
new BMap.Point(110.032004,41.036),new BMap.Point(110.033424,41.038558),
new BMap.Point(110.02524,41.037231),new BMap.Point(110.032013,41.035986),new BMap.Point(110.033361,41.035395)
new BMap.Point(110.026686,41.036959),new BMap.Point(110.02559,41.035075),new BMap.Point(110.02559,41.035075),
new BMap.Point(110.030756,41.036211),new BMap.Point(110.029938,41.034388),
new BMap.Point(110.026686,41.036959),new BMap.Point(110.02559,41.035075),new BMap.Point(110.02559,41.035075)
new BMap.Point(110.031578,41.034116),new BMap.Point(110.029961,41.031354),
*/

function CustomArea(map) {
	this.map = map;
	this.linePoints=[
		{points:[new BMap.Point(110.02718,41.041938),new BMap.Point(110.027144,41.039272),new BMap.Point(110.025276,41.037204)],
		 id:1,arry:[4,7],rang:[4,7]},   
		{points:[new BMap.Point(110.029399,41.039109),new BMap.Point(110.031555,41.041163)],
		 id:2,arry:[],rang:[4]}, 
		{points:[new BMap.Point(110.032157,41.038768),new BMap.Point(110.034358,41.040653)],
		 id:3,arry:[],rang:[5]}, 
		{points:[new BMap.Point(110.027216,41.039299),new BMap.Point(110.030845,41.038972),new BMap.Point(110.028941,41.036551)],
		 id:4,arry:[1,7],rang:[1,2,5,7]}, 
		{points:[new BMap.Point(110.030845,41.038966),new BMap.Point(110.034798,41.03834),new BMap.Point(110.034798,41.03834)],
		 id:5,arry:[],rang:[4,3,6]}, 
		{points:[new BMap.Point(110.032004,41.036),new BMap.Point(110.033424,41.038558)],
		 id:6,arry:[7],rang:[5,7]}, 
		{points:[new BMap.Point(110.02524,41.037231),new BMap.Point(110.032013,41.035986),new BMap.Point(110.033361,41.035395)],
		 id:7,arry:[4,6],rang:[1,4,6,9,10]}, 
		{points:[new BMap.Point(110.02559,41.035075),new BMap.Point(110.031578,41.034116)],
		 id:8,arry:[],rang:[9,10,11]}, 
		{points:[new BMap.Point(110.030756,41.036211),new BMap.Point(110.029938,41.034388)],
		 id:9,arry:[],rang:[7,8]}, 
		{points:[new BMap.Point(110.026686,41.036959),new BMap.Point(110.02559,41.035075),new BMap.Point(110.02559,41.035075)],
		 id:10,arry:[],rang:[7,8]}, 
		{points:[new BMap.Point(110.031578,41.034116),new BMap.Point(110.029961,41.031354)],
		 id:11,arry:[],rang:[8]}//, 
		//{points:[new BMap.Point(110.02559,41.035075),new BMap.Point(110.031578,41.034116)],
	    // id:12,arry:[1,2,3],rang:[2]}
	];
	this.flag = true;
	this.pipes = [];
	this.arr=[];
	this.disable=[1,11];
	this.initialize();
}
CustomArea.prototype.initialize = function () {
	var sef = this;
	this.polygonPoints = [];
	this.linePoints.forEach(function(e){
		
		var polyline = new CustomPipe(e.points,e.id,e.rang,e.arry);
		var label = new BMap.Label(e.id,{offset:new BMap.Size(20,-10)});
		//polyline.setLabel(label);
		var marker = new BMap.Marker(e.points[0]);  // 创建标注
		marker.setLabel(label);
		//sef.map.addOverlay(marker);    
		sef.map.addOverlay(polyline);
		sef.pipes.push(polyline);
	});
	
	sef.callback(sef.pipes[3]);
	var str="";
	sef.arr.forEach(function(e){
		sef.polygonPoints = sef.polygonPoints.concat(sef.linePoints[e-1].points);
		console.log(e+","+sef.linePoints[e-1].points);
	})
	//alert(str);
	//console.log(o.id + ":");fillColor:"#FBB68D", strokeColor:"#D7824E"
	var polygon = new BMap.Polygon(getGrahampoints(sef.polygonPoints), { fillColor:"#FBB68D", strokeColor:"#D7824E",fillOpacity: 0.4, strokeWeight:5, strokeOpacity:0.5,strokeStyle:"dashed"}); 
	this.map.addOverlay(polygon);
	
	

}
CustomArea.prototype.callback = function (o) {
	var sef = this;
	//alert(o.id);
	var ob = o;
	//alert(ob.arry);
	//console.log(o.id + ":");
	o.rang.forEach(function(e){
		//alert(e);
		//console.log("    " + e);
		if(e == 3)
			console.log("    " + e);
		if((!ob.arry || ob.arry.length == 0 || (ob.arry.length > 0 && ob.arry.indexOf(e) < 0 )) && sef.arr.indexOf(e) < 0){
			
			sef.arr.push(e);
			sef.callback(sef.pipes[e-1]);
		}
	});
}
var pipe_opt = {
    strokeColor: "#60BCB4",
    strokeWeight: 5,
    strokeOpacity: 0.9
};
function CustomPipe(points, id,rang,arry) {
	this.id = id;
	this.rang=rang;
	this.arry = arry;
    BMap.Polyline.call(this, points, pipe_opt);
}
CustomPipe.prototype = Object.create(BMap.Polyline.prototype);
CustomPipe.prototype.constructor = CustomPipe;
