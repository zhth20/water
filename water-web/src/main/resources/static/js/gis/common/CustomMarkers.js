layui.define([], function (exports) {
    var $ = layui.jquery;

    function CustomArrow(arrow,id) {
        this._point = new BMap.Point(arrow.point.lat, arrow.point.lng);
        this._rotate = arrow.rotate;
        this._div = $('<div>').addClass('water-arrow')[0];
        this._div.setAttribute("id", "arrow-" + id);
        this._div.setAttribute("value", arrow.rotate);
        this._div.setAttribute("direction", true);
    }
    var valve = 0;
    /**
     * 原型继承BMap.Overlay
     * @type {BMap.Overlay}
     */
    CustomArrow.prototype = new BMap.Overlay();
    /**
     * CustomArrow实现Overlay的initialize方法(在创建Arrow对象的时候调用)
     * @param map
     * @returns {*}
     */
    CustomArrow.prototype.initialize = function (map) {
        this._map = map;

        this._div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        this._div.style.transform = "rotate(" + this._rotate + "deg)";

        map.getPanes().markerPane.appendChild(this._div);
        return this._div;
    };
    /**
     * CustomArrow实现Overlay的draw方法
     */
    CustomArrow.prototype.draw = function () {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x + "px";
        this._div.style.top = pixel.y + "px";
        this.addEventListener('mouseover', function (e) {
            //if (self.lock) return false;
            // alert('ok');
        });
    };
    /**
     * CustomArrow事件绑定
     * @param event
     * @param fun
     */
    CustomArrow.prototype.addEventListener = function (event, fun) {
        var self = this;
        this._div['on' + event] = function () {
            this.target = self;
            fun(this);
        };
    }

    /**
     * 自定义Marker
     * @param point
     * @constructor
     */
    function CustomMarker(e) {

        var markerIcon;

        switch(e.type){
            case 0://监测点
                markerIcon = new BMap.Icon("resources/assets/images/markers.png", new BMap.Size(23, 25), {
                    anchor: new BMap.Size(10, 25), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0 - 11 * 25) // 设置图片偏移
                });
                break;
            case 1://阀门
                markerIcon = new BMap.Icon("resources/assets/images/iconmaker.png", new BMap.Size(52, 60), {
                    anchor: new BMap.Size(26, 60), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0) // 设置图片偏移
                });
                break;
            case 2://消防栓
                markerIcon = new BMap.Icon("resources/assets/images/iconmaker.png", new BMap.Size(52, 60), {
                    anchor: new BMap.Size(26, 60), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0 - 60) // 设置图片偏移
                });
                break;
        }
        this.type = e.type;
        console.log("CustomMarker:" +e.type);
        BMap.Marker.call(this, new BMap.Point(e.point.lat, e.point.lng),{icon:markerIcon});
        this.e = e;
        this.showLabel = false;
        this.init();

    }
    CustomMarker.prototype = Object.create(BMap.Marker.prototype);
    CustomMarker.prototype.constructor = CustomMarker;
    CustomMarker.prototype.init = function () {
        var self = this;
        var labelDiv;

        switch(self.e.type){
            case 0:
                labelDiv = '<div id="marker-' + self.e.id + '" class="popover fade top in popover-primary" style="display: block; top: -38.5px;left: -73px;width:220px;">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title time">时间：2016-06-13 15:20:21 124</h3>' +
                    //'<div class="popover-content flow">流量：+0.85 m³，-0.15 m³</div>' +
                    '<div class="popover-content press">正向：0.0 m³ ，0.0 m³<br/>' +
                    '反向：3.4687 m³ ，0.0 m³<br/>' +
                    '压力 / 瞬时：0.6 MPa / 3.62 m³/h<br/>'+
                    '</div>';
                this.label = new BMap.Label(labelDiv, {offset: new BMap.Size(-28, -65)});
                break;
            case 1:
                labelDiv = '<div class="popover fade top in popover-primary" style="display: block; top: -38.5px;width:150px;">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title time">' + self.e.address + '</h3>' +
                    '<div class="popover-content press" id="valve-' + self.e.id +'" >蝶阀 ，DN200，打开' +
                    '</div>';
                this.label = new BMap.Label(labelDiv, {offset: new BMap.Size(-50, -35)});
                break;
            case 2:
                labelDiv = '<div id="fire-' + self.e.id + '" class="popover fade top in popover-secondary" style="display: block; top: -38.5px;width:150px;">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title time">' + self.e.address + '</h3>';
                this.label = new BMap.Label(labelDiv, {offset: new BMap.Size(-50, 0)});
                break;
        }


        this.element = $(labelDiv);

        this.label.addEventListener("click", function(e){
            //plat.map.removeOverlay(e.target);
            self.showLabel =  false ;
            e.target.hide();
        });
        this.label.hide();

        this.setLabel(this.label);
        this.eventBind();
    }
    CustomMarker.prototype.eventBind = function () {
        var self = this;
        switch(self.e.type){
            case 1:
                this.addEventListener('click', function (e) {
                    //self.showLabel = !self.showLabel;
                    var icon = e.target.getIcon();
                    var size = new BMap.Size(-52, 0);


                    if(icon.imageOffset.equals(size)){
                        $('#valve-' + e.target.e.id).text("蝶阀 ，DN200，打开");
                        icon.setImageOffset(new BMap.Size(0, 0)) ;
                        valve --;
                    }
                    else{
                        $('#valve-' + e.target.e.id).text("蝶阀 ，DN200，关闭");
                        icon.setImageOffset(size) ;
                        valve ++;
                    }

                    console.log("valve:" + valve);
                    e.target.setIcon(icon);
                    setTimeout('cmap.updateArea()',200);
                });
                this.addEventListener('mouseover', function (e) {
                    e.target.getLabel().show();
                });
                this.addEventListener("mouseout", function(e){
                    //if(!self.showLabel)
                    e.target.getLabel().hide();
                });
                break;
            default:
                this.addEventListener('click', function (e) {
                    self.showLabel = !self.showLabel;
                });
                this.addEventListener('mouseover', function (e) {
                    e.target.getLabel().show();
                });
                this.addEventListener("mouseout", function(e){
                    if(!self.showLabel)
                        e.target.getLabel().hide();
                });
                break;
        }

    }


	/*
	 * 处理所有Marker的类
	 */
    function CustomMarkers(map) {
        this.map = map;
        this.markers = [];
        this.arrows = [];
        this.valve = 0;
        this.initData();
    };
    CustomMarkers.prototype.initData = function () {
        var self = this;

        var url = $('#ctx').val() + '/resources/data/CustomMarker.json';
        $.post(url, {}, function (data) {
            $.each(data.markers, function (index, item) {
                var marker = new CustomMarker(item);
                //绑定markers到对应的pipe
                self.markers.push(marker);
                self.map.addOverlay(marker);
                if(item.type == 2){
                    marker.hide();
                }
                if (item.arrow) {
                    var arrow = new CustomArrow(item.arrow,item.id);
                    self.arrows.push(arrow);
                    self.map.addOverlay(arrow);
                    //var d = $('#arrow-1412900001').attr("value");
                }

            });
        });
        //this.markers = markers;
        //this.map.addOverlay(markers[0]);
        //self.markers[0].render();
    }
    CustomMarkers.prototype.update = function () {

        //获取该区域表具信息，然后根据当前id修改标签
		/*
		 $.ajax({
		 type : "POST",
		 url : "MerterInfoServlet?type=2&id=" + user.id,
		 dataType: 'json',
		 async : false,
		 contentType: "application/json",
		 success:function(data){
		 data.meter.forEach(function(e){

		 $("#" + e.id).empty();
		 $("<p style=\"margin: 0;\">正向：" + e.ft + " m³ ，" + e.ff + " m³<br/>" +
		 "反向：" + e.rt + " m³ ，" + e.rf + " m³<br/>" +
		 "压力 / 瞬时：" + e.p/100+ " MPa / " + e.ins.toFixed(2) + " m³/h<br/>"+
		 "采集时间：" + e.ctime + "</p>").appendTo($("#" + e.id));

		 });

		 },
		 error:function(resMsg){
		 var msg;
		 alert(resMsg);
		 //alert(resMsg);
		 }
		 });*/
        //setTimeout('plat.updateMaker()',2*60*1000);设置数据刷新时间

        if($('#arrow-1412900001').attr("direction") == 'true' ){
            $('#arrow-1412900001').attr("direction", false);
            var d = $('#arrow-1412900001').attr("value") + 180;
            $('#arrow-1412900001').css("transform","rotate("+ d +"deg)");
        }
    }

    exports('CustomMarkers', CustomMarkers)
});
