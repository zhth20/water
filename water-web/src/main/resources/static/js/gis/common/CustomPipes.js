layui.define([], function (exports) {
    var $ = layui.jquery;

    /**
     * CustomPipe 管段类
     * points 组成点
     * opt    线段属性参数
     */
    function CustomPipe(ob, points, opt) {
        this.father = ob;
        this.lock = false;
        this.strokeWeight = opt.strokeWeight,
            BMap.Polyline.call(this, points, opt);
        this.control = 0;
        this.scolor = '#84878a';
        this.eventBind();
    }
    CustomPipe.prototype = Object.create(BMap.Polyline.prototype);
    CustomPipe.prototype.constructor = CustomPipe;
    CustomPipe.prototype.focusIn = function () {
        this.setStrokeWeight(10);//this.getStrokeWeight() + 5
    }
    CustomPipe.prototype.focusOut = function () {
        this.setStrokeWeight(this.strokeWeight);//this.getStrokeWeight() - 5
    }
    CustomPipe.prototype.eventBind = function () {
        var self = this;
        var fun = self.event;
        /*
         this.addEventListener('mouseover', function (e) {
         //if (self.lock) return false;
         self.focusIn();
         //alert(self.pipes.pipeinfo);
         self.pipes.render(e.target);
         //self.render(e.target.data);
         });

         this.addEventListener('mouseout', function () {
         if (self.lock) return false;
         self.focusOut();
         });*/

        this.addEventListener('click', fun);
        this.addEventListener('mouseover', fun);
        this.addEventListener('mouseout', fun);


    }
    CustomPipe.prototype.reload = function () {
        var self = this;
        self.disableEditing();

        if (self.father.lineMarker.length > 0) {
            self.father.lineMarker.forEach(function (e) {
                self.map.removeOverlay(e);
            });
            self.father.lineMarker = [];
        }
    }
    CustomPipe.prototype.event = function (e) {
        var self = e.target;
        switch (self.control) {
            case 0://默认
                switch (e.type) {
                    case 'onclick':
                        self.lock = !self.lock;
                        //console.log('event ' + e.target.id);
                        if ($('.mouse-type').attr('value') == 1) {
                            self.father.pipeinfo.render(e.target);
                            $('.pipe-close').attr('list', '');
                        }
                        var pipeLength = 0;
                        $.each(self.father.pipes, function (i, e) {
                            if (e.lock) {
                                pipeLength += e.meter;
                            }
                        });
                        $('.select-length').text(pipeLength);

                        break;
                    case 'onmouseover':
                        self.focusIn();
                        if ($('.mouse-type').attr('value') == 0) {
                            self.father.pipeinfo.render(e.target);
                        }
                        break;
                    case 'onmouseout':
                        if (self.lock) return false;
                        self.focusOut();
                        break;
                }
                break;
            case 0x01://编辑
                switch (e.type) {
                    case 'onclick':
                        tempLine = self;
                        if (self.father.line != null) {
                            //self.father.line.setStrokeColor('red');
                            self.father.line.disableEditing();
                        }
                        self.father.line = self;
                        self.enableEditing();
                        //self.setStrokeColor('#308430');
                        var _p = self.getPath();
                        if (self.father.lineMarker.length > 0) {
                            self.father.lineMarker.forEach(function (e) {
                                self.map.removeOverlay(e);
                            });
                            self.father.lineMarker = [];
                        }
                        _p.forEach(function (t) {
                            var marker = new BMap.Marker(t);// 创建标注
                            self.father.lineMarker.push(marker);
                            marker.addEventListener("click", function (e) {
                                self.map.removeOverlay(e.target);
                                self.setPath(self.removepoint(_p, e.target.getPosition()));
                                self.resetLineInfo();
                            });
                            self.map.addOverlay(marker);
                        });
                        //self.editLineInfo(self.id);
                        self.resetLineInfo();
                        break;
                }
                break;
            case 0x02:
            case 0x03:
                switch (e.type) {
                    case 'onclick':
                        if (self.getStrokeColor() == 'red') {
                            if (self.father.struct.del(self)) {
                                self.setStrokeColor(self.scolor);
                                $('input.edit-polyline').attr("value", self.father.struct.getString());
                            }
                        }
                        else {
                            console.log(self.getStrokeColor() + ',' + self.scolor);
                            if (self.scolor == self.color && self.father.struct.length == 0) {
                                self.doAjax('/gis/map/struct.do', {
                                    map: self.father.customer.id,
                                    lines: self.id,
                                    type: 0
                                }, self.doLine);
                            }
                            else {
                                self.father.struct.push(self);
                                self.setStrokeColor('red');
                                $('input.edit-polyline').attr("value", self.father.struct.getString());
                            }
                        }
                        break;
                }
                break;
            case 0x04:
                switch (e.type) {
                    case 'onclick':
                        if (self.getStrokeColor() == 'red') {
                            if (self.father.struct.del(self)) {
                                self.setStrokeColor(self.scolor);
                                $('input.point-polyline').attr("value", self.father.struct.getString());
                            }
                        }
                        else {
                            switch (self.father.struct.length) {
                                case 0:
                                    self.father.struct.push(self);
                                    self.setStrokeColor('red');
                                    $('input.point-polyline').attr("value", self.father.struct.getString());
                                    break;
                                case 1:
                                    self.doAjax('/gis/map/struct.do', {
                                        map: self.father.customer.id,
                                        lines: self.father.struct.getString() + ',' + self.id,
                                        type: 1
                                    }, self.doStruct);
                                    break;
                                default:
                                    CustomAlert('#modal-1', '附属设备只能选择安装在两个管段之间');
                                    break;
                            }

                        }
                        break;
                }
                break;
        }
    }
    CustomPipe.prototype.doAjax = function (url, data, callback) {
        var self = this;
        $.ajax({
            url: $('#ctx').val() + url,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            success: function (data) {
                //CustomAlert('#modal-1',data.msg);
                callback.call(self, data);
            }
        });
    }
    CustomPipe.prototype.doLine = function (data) {
        var self = this;
        self.father.struct.push(self);
        self.setStrokeColor('red');
        $.each(self.father.pipes, function (i, e) {
            var line = _.findWhere(data.lines, {id: e.id});
            if (line != undefined) {
                self.father.struct.push(e);
                e.setStrokeColor('red');
            }
        });
        $('input.edit-polyline').attr("value", self.father.struct.getString());
    }
    CustomPipe.prototype.doStruct = function (data) {
        var self = this;
        //self.father.struct.push(self);
        //self.setStrokeColor('red');
        if (data.struct.length == 0)
            CustomAlert('#modal-1', '请选择连接的管段');
        else {
            var id;
            if (self.father.struct[0].id == data.struct[0].lineA)
                id = data.struct[0].lineB;
            else
                id = data.struct[0].lineA;
            var line = _.findWhere(self.father.pipes, {id: id});

            if (line != undefined) {
                self.father.struct.push(line);
                line.setStrokeColor('red');
                $('input.point-polyline').attr("value", self.father.struct.getString());
            }
        }
        //(isNaN(data.struct))
    }

    CustomPipe.prototype.reset = function () {
        switch (this.control) {
            case 0:
            case 0x01:
                break;
            case 0x02:
            case 0x03:
                this.father.struct = [];
                $('input.edit-polyline').attr("value", this.father.struct.getString());
                console.log(this.control);
                break;
        }
    }
    CustomPipe.prototype.resetLineInfo = function () {
        var self = this;
        var points = self.getPath(), lengths = 0, str = [];
        for (var i = 0; i < points.length; i++) {
            str.push('{"y":' + points[i].lat + ',"x":' + points[i].lng + '}');
            if (i > 0) {
                lengths += parseInt(this.map.getDistance(points[i - 1], points[i]));
            }
        }
        $('input.edit-id').attr("value", self.id);
        $('input.edit-m').attr("value", lengths);
        $('input.edit-n').attr("value", 10);
        $('input.edit-p').attr("value", str.join(","));
    }
    CustomPipe.prototype.removepoint = function (o, p) {
        var _o = o;
        for (var i = 0; i < o.length; i++) {
            if (o[i].lng === p.lng) {
                _o.remove(i);
                return _o;
            }
        }
        return _o;
    }
    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i];
            }
        }
        this.length -= 1;
    }


    function CustomArea(e) {
        var points = [];
        $.each(e.points, function (i, p) {
            points.push(new BMap.Point(p.lat, p.lng));
        });
        BMap.Polygon.call(this, points, {
            fillColor: e.fillColor,
            strokeColor: e.strokeColor,
            fillOpacity: 0.2,
            strokeWeight: 5,
            strokeOpacity: 0.8,
            strokeStyle: "dashed"
        });
        //this.eventBind();
        this.name = e.name;
    }
    CustomArea.prototype = Object.create(BMap.Polygon.prototype);
    CustomArea.prototype.constructor = CustomArea;

    function CustomPipeInfo(self) {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
        this.defaultOffset = new BMap.Size(60, 10);
        this.father = self;
        this.map = self.map;
        //this.materials = target.materials;
        //this.types = target.types;
        this.element = document.createElement("div");
        this.pipe = null;
        this.lock = false;
    }
    CustomPipeInfo.prototype = new BMap.Control();

    CustomPipeInfo.prototype.initialize = function () {
        var self = this;
        //self.map = map;
        // 创建一个DOM元素
        var ele = self.element;
        var html1 = '<div class="col-sm-12">' +
            '<div class="tile-progress tile-primary">' +
            '<div class="tile-header" style="padding:15px 15px 8px 15px">' +
            '<h3 class="info-type">DN200,球铁,<a href="#sample-modal" data-toggle="modal" data-target="#sample-modal-dialog-1">详细</a></h3>' +

            '<div class="info-detail">埋深：<span class="info-deep">2米</span><br>' +
            '管道长度：<span class="pipe-length">0</span> 米<br>' +
            '铺设时间：<span class="info-time"></span></div>' +
            '</div>' +
            '<div class="tile-footer" style="text-align:left;padding:3px 15px 15px 15px;">' +
            '<span><a class="mouse-type" value="0" style="color:#ffffff;font-size: 16px;">跟随</a>   <a class="pipe-close" value="0" list="" style="color:#ffffff;font-size: 16px;display:none">维修</a><br/>' +
            '选中线段长度：<span class="select-length">0</span> 米</span>' +
            '</div>' +
            '</div>' +
            '</div>';
        // 添加文字说明
        var html = '<div class="popover fade top in popover-primary pipe-control">' +
            '<h3 class="popover-title">管道详情（DN200 141200009）<a class="pull-right close" title="关闭" href="javascript:;"><i class="glyphicon glyphicon-remove"></i></a><a class="pull-right unlock" title="取消锁定" href="javascript:;"><i class="glyphicon glyphicon-pushpin"></i></a>&emsp;</h3>' +
            '<div class="popover-content">' +
            '材质：<input name="material"><br>' +
            '口径：<input name="type"><br>' +
            '颜色：<input name="color"><br>' +
            '时间：<input name="time"><br>' +
            '&emsp;点：<input name="points"><br>' +
            //'<button class="btn btn-blue pull-right save-pipe">保存</button><br><br>' +
            '</div>' +
            '</div>';

        $(ele).attr('id', 'pipe-control');
        $(ele).append(html1);

        //默认隐藏
        //$(ele).hide();
        // 添加DOM元素到地图中
        this.map.getContainer().appendChild(ele);

        $('.mouse-type').click(function () {
            console.log($('.mouse-type').attr('value'));
            if ($('.mouse-type').attr('value') == 0) {
                $('.mouse-type').attr('value', 1);
                $('.mouse-type').text('点击');
                $('.pipe-close').show();
            }
            else {
                self.reset();
            }
        });
        $('.pipe-close').click(function () {
            //console.log( $('.pipe-close').attr('value'));
            self.queryClosePoint();
        });
        // 将DOM元素返回
        return ele;
    };
    CustomPipeInfo.prototype.reset = function () {
        var self = this;
        $('.pipe-close').attr('list', '');
        $('.mouse-type').attr('value', 0);
        $('.mouse-type').text('跟随');
        $('.pipe-close').hide();
        $.each(self.father.marker.valve, function (i, e) {
            if (!e.open && e.flag == 1) {
                e.render();
                e.hide();
            }
        });
        $.each(self.father.customPipes.pipes, function (i, e) {
            e.setStrokeColor(e.color);
        });
    }
    CustomPipeInfo.prototype.queryClosePoint = function () {
        var self = this;
        if ($('.pipe-close').attr('value') > 0) {
            var closed = [];
            //console.log(self.father);
            $.each(self.father.marker.valve, function (i, e) {
                if (!e.open && e.flag == 1) {
                    e.render();
                    e.hide();
                }
            });//closed.join(',')
            self.doAjax('/gis/map/actionStruct.do', {
                map: self.father.customer.id,
                lines: $('.pipe-close').attr('value'),
                valve: $('.pipe-close').attr('list'),
                type: 2
            }, self.doLine);
        }
    }
    CustomPipeInfo.prototype.render = function (e) {
        //alert("OK");
        var self = this;
        var ele = self.element;
        $('.info-type', $(ele))
            .text(e.material + ',' + e.dn + ",");

        $info = $('<a href="#sample-modal" data-toggle="modal" data-target="#sample-modal-dialog-1">详细</a>');

        $('.info-type', $(ele)).append($info);

        $('.info-color', $(ele)).text(e.color);
        $('.info-time', $(ele)).text(e.time);
        $('.info-points', $(ele)).text(e.points.length);

        $('.pipe-length').text(e.meter);

        if ($('.mouse-type').attr('value') == 1) {
            $('.pipe-close').attr('value', e.id);
        }
        else {
            $('.pipe-close').attr('value', 0);
        }
        self.show();
    }
    CustomPipeInfo.prototype.doAjax = function (url, data, callback) {
        var self = this;
        $.ajax({
            url: $('#ctx').val() + url,
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            success: function (data) {
                //CustomAlert('#modal-1',data.msg);
                callback.call(self, data);
            }
        });
    }
    CustomPipeInfo.prototype.doLine = function (data) {
        var self = this, arr = data.valve.split(";");
        $.each(arr, function (i, str) {
            var temp, bool;
            if (i == 0) {
                $.each(self.father.marker.valve, function (i, e) {
                    temp = ',' + str + ',';
                    bool = temp.indexOf(',' + e.id + ',');
                    //console.log(data.valve + " " + bool)
                    if (bool > -1 && e.open) {
                        e.render();
                        e.show();
                    }
                });
            }
            else {
                $.each(self.father.customPipes.pipes, function (i, e) {
                    temp = ',' + str + ',';
                    bool = temp.indexOf(',' + e.id + ',');
                    //console.log(data.valve + " " + bool)
                    if (bool > -1) {
                        e.setStrokeColor('red');
                    }
                    else
                        e.setStrokeColor(e.color);
                });
            }

        });

    }

    /**
     * CustomPipes 管网类
     * data        管网数据
     */
    function CustomPipes(data, self) {

        this.map = self.map;
        this.customer = self.customer;
        this.data = data;
        this.father = self;
        this.pipes = [];
        this.area = [];
        this.charts = [];

        this.lineMarker = [];
        this.line;

        this.area = [];
        this.struct = [];
        this.initialize(this.createPipes);
    }
    CustomPipes.prototype.initialize = function (callback) {
        var self = this;
        //this.initArea();
        //console.log('initialize');
        this.pipeinfo = new CustomPipeInfo(this.father);
        this.map.addControl(this.pipeinfo);

        //this.charts.push(new CustomCharts(this.map,0));
        //this.charts.push(new CustomCharts(this.map,1));
        //this.charts.push(new CustomCharts(this.map,2));
        //this.charts.push(new CustomEdit(this.map,null,'view'));

        //this.map.addControl(this.charts[0]);
        //this.map.addControl(this.charts[1]);
        //this.map.addControl(this.charts[2]);
        //this.map.addControl(this.charts[3]);

        //this.charts[0].hide();
        //this.charts[1].hide();
        //this.charts[2].hide();
        //this.map.addControl(new CustomCharts(this.map,1));
        //this.charts.render();
        //this.pipeinfo.render();
        callback.call(self, self.data);
    };
    CustomPipes.prototype.createPipes = function (data) {
        var self = this;
        //content = editAjax('/gis/map/struct.do',{map:self.customer.id,lines:0});
        //console.log(content);
        $.each(data.data, function (index, item) {
            //console.log(index + "," + item);
            var line = _.findWhere(self.customer.cong.map, {dn: item.dn});
            var points = [];
            $.each(item.points, function (i, e) {
                var point = new BMap.Point(e.x, e.y);
                points.push(point);
            });
            var pipe = new CustomPipe(self, points, {
                strokeColor: line.color,
                strokeWeight: line.s,
                strokeOpacity: 0.9
            });
            //初始化管网数据
            pipe.id = item.id;
            pipe.material = self.customer.cong.materials[item.material - 1].name;//_.findWhere(data.materials, {id: item.material}).name;
            pipe.dn = 'DN' + line.dn;
            if (!item.b)
                pipe.scolor = line.color;
            pipe.color = line.color;
            pipe.points = points;
            pipe.time = '2016-09-19';// item.time;
            pipe.index = index;
            pipe.meter = item.meter;

            self.pipes.push(pipe);
        });
        $.each(this.pipes, function (index, item) {
            self.map.addOverlay(item);
        });
    };

    CustomPipes.prototype.initArea = function () {
        var self = this;
        $.each(this.data.area, function (i, e) {
            /*var points = [];
             new CustomArea(e);
             $.each(e.points, function (num, p) {
             var point = new BMap.Point(p.lat, p.lng);
             points.push(point);
             });
             self.area.push(new BMap.Polygon(points, { fillColor:e.fillColor, strokeColor:e.strokeColor,fillOpacity: 0.2, strokeWeight:5, strokeOpacity:0.8,strokeStyle:"dashed"}));
             */
            self.area.push(new CustomArea(e));
        });
        $.each(this.area, function (i, e) {
            self.map.addOverlay(e);
            e.hide();
        });
    }

    exports('pipes', CustomPipes)
});