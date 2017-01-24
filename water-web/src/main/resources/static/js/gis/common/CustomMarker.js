layui.define([], function (exports) {
    var $ = layui.jquery;
    /**
     * 自定义Marker
     * @param point
     * @constructor
     */
    function CustomMarker(fa,p,i,id) {
        this.father = fa;
        this.id = id;
        this.label;
        var markerIcon;
        switch(i){
            case 0://阀门
                this.onSize = new BMap.Size(0, -24);
                this.offSize = new BMap.Size(-24, -24);
                this.open = true;
                this.flag = 0;
                markerIcon = new BMap.Icon("resources/assets/images/iconmaker.png", new BMap.Size(24, 24), {
                    anchor: new BMap.Size(12, 12), // 指定定位位置
                    imageOffset: this.onSize // 设置图片偏移
                });
                break;
            case 1://监测点
                markerIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                    anchor: new BMap.Size(10, 25),
                    imageOffset: new BMap.Size(0,-11*25)
                });
                break;
            case 2://消防栓
                markerIcon = new BMap.Icon("resources/assets/images/iconmaker.png", new BMap.Size(24, 24), {
                    anchor: new BMap.Size(12, 24), // 指定定位位置
                    imageOffset: new BMap.Size(0, 0) // 设置图片偏移
                });
                break;
        }
        this.type = i;
        console.log("CustomMarker:" + i);
        BMap.Marker.call(this, p,{icon:markerIcon});
        this.showLabel = false;
        this.init();

    }
    CustomMarker.prototype = Object.create(BMap.Marker.prototype);
    CustomMarker.prototype.constructor = CustomMarker;
    CustomMarker.prototype.init = function () {
        var self = this;
        var labelDiv;
        switch(self.type){
            case 1:
                labelDiv = '<div id="marker" class="popover fade top in popover-primary" style="display: block; top: -38.5px;left: -73px;width:220px;">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title time">时间：2016-06-13 15:20:21 124</h3>' +
                    //'<div class="popover-content flow">流量：+0.85 m³，-0.15 m³</div>' +
                    '<div class="popover-content press">正向：0.0 m³ ，0.0 m³<br/>' +
                    '反向：3.4687 m³ ，0.0 m³<br/>' +
                    '压力 / 瞬时：0.6 MPa / 3.62 m³/h<br/>'+
                    '</div>';
                this.label = new BMap.Label(labelDiv, {offset: new BMap.Size(-28, -65)});
                break;
            case 0:
                labelDiv = '<div class="popover fade top in popover-primary" style="display: block; top: 0px;width:150px;">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title time">阀门编号：' + self.id + '</h3>' +
                    //'<div class="popover-content press" id="valve" >蝶阀 ，DN200，打开' +
                    '</div>';
                this.label = new BMap.Label(labelDiv, {offset: new BMap.Size(-63, -38)});
                break;
            case 2:
                labelDiv = '<div id="fire" class="popover fade top in popover-secondary" style="display: block; top: -38.5px;width:150px;">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title time"></h3>';
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
    CustomMarker.prototype.render = function () {
        var icon = this.getIcon();
        //icon.imageOffset.equals(this.onSize)
        if(this.open)
            icon.setImageOffset(this.offSize) ;
        else
            icon.setImageOffset(this.onSize) ;
        this.open = !this.open;
        this.setIcon(icon);
        if($('.pipe-close').attr('value') == 0)
            this.father.render();
    }
    CustomMarker.prototype.eventBind = function () {
        var self = this;
        switch(self.type){
            case 0:
                this.addEventListener('click', function (e) {
                    //self.showLabel = !self.showLabel;
					/*
					 var icon = e.target.getIcon();
					 var size = new BMap.Size(-39, -39);
					 if(icon.imageOffset.equals(size)){
					 $('#valve-' + e.target.type).text("蝶阀 ，DN200，打开");
					 icon.setImageOffset(new BMap.Size(0, -39)) ;

					 }
					 else{
					 $('#valve-' + e.target.type).text("蝶阀 ，DN200，关闭");
					 icon.setImageOffset(size) ;

					 }
					 //console.log("valve:" + valve);
					 e.target.setIcon(icon); */
                    console.log("valve New");
                    e.target.render();
                    if($('.mouse-type').attr('value') == 1){
                        var str = $('.pipe-close').attr('list');
                        if(str.length > 0 ){
                            $('.pipe-close').attr('list',str + ',' + e.target.id);
                        }
                        else
                            $('.pipe-close').attr('list',e.target.id);
                        if(e.target.open)
                            e.target.hide();

                        self.father.customMap.customPipes.pipeinfo.queryClosePoint();
                    }

                    //setTimeout('cmap.updateArea()',200);
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
    exports('marker', CustomMarker);
});