/**
 * Created by Loyal on 2016/12/29.
 */
layui.config({
    base: '/static/js/common/',
}).extend({ //设定组件别名
    CustomMap: '../gis/common/CustomMap', //如果test.js是在根目录，也可以不用设定别名
    CustomControl: '../gis/common/CustomControl', //如果test.js是在根目录，也可以不用设定别名
    CustomMarkers: '../gis/common/CustomMarkers', //如果test.js是在根目录，也可以不用设定别名
});

layui.use(['CustomMap', 'element',
    'upload', 'form', 'laydate',
    'layer', 'base'], function () {
    var element = layui.element();
    var form = layui.form();
    var layer = layui.layer;
    var $ = layui.jquery;
    var Line = layui.base;
    Line.fn.initMap = function () {
        var customer = {
            "id": 1,
            "name": "重庆大学",
            "address": "重庆市沙坪坝区沙正街174号，A区节能办",
            "tel": "0123456789",
            "cong": {
                "center": {"y": "29.564212", "x": "106.561764"},
                "zoom": 13,
                "map": [{"s": 3, "color": "#2A8ABC", "dn": 50}, {"s": 3, "color": "#009999", "dn": 65}, {
                    "s": 3,
                    "color": "#385AD3",
                    "dn": 80
                }, {"s": 3, "color": "#3894E4", "dn": 100}, {"s": 3, "color": "#F7883A", "dn": 125}, {
                    "s": 3,
                    "color": "#114A67",
                    "dn": 150
                }, {"s": 3, "color": "#437469", "dn": 200}, {"s": 3, "color": "#7384DA", "dn": 250}, {
                    "s": 3,
                    "color": "#308430",
                    "dn": 300
                }, {"s": 3, "color": "#69D02A", "dn": 350}]
            }
        };
        var Bmap = layui.CustomMap;
        var map = new Bmap('map-content', customer);
        $('#add-point-a').on('click', function(){

        });
        $('#add-point-b').on('click', function(){

        });
    }

    Line.fn.initUpload = function () {
        layui.upload({
            url: '/upload',
            type: 'file',
            before: function (input) {
                layer.load(1);
                $('input[name=fileName]').val(null);
            },
            success: function (res, input) {
                layer.closeAll();
                layer.msg(res.message, {icon: 1, time: 2000});
                $('input[name=fileName]').val(res.result);
            }
        });
    }

    /**
     * 导入新增，解析
     */
    Line.fn.add = function () {
        var self = this;
        var $addForm = $(self.elems.addForm);
        self.configs.cacheData = $addForm.serializeJson();
        self.post($addForm.attr('action'), $addForm.serialize())
            .done(function (data) {
                self.ok(data.message);
                layer.close(self.configs.pageIndex);
                self.configs.initFlag = true;
                //返回的解析结果
                console.log(data.result);
            });
    }

    Line.fn.ready = function () {
        this.initMap();
        this.initUpload();
    }

    new Line();
});

function EditCad() {
	this.initialize();
	this.result = data.result;//Line.fn.add种的data.result
	this.data = [];
}

EditCad.prototype.initialize = function () {
	this.fa = $("input.input-a").val();
	this.ma = $("input.input-map-a").val();
	this.fb = $("input.input-b").val();
	this.mb = $("input.input-map-b").val();
	
	this.d = $("input.input-d").val();
	this.h = $("input.input-h").val();
	
	setX((fixB.getX()-fixA.getX())/(simpleB.getX()-simpleA.getX()));
	setY((fixB.getY()-fixA.getY())/(simpleB.getY()-simpleA.getY()));
	
}
EditCad.prototype.render = function () {
	this.initialize();
	result.forEach(function(e){  
		map.setX(ma.x + (e.x - fa.x)/x);
		map.setY(ma.y + (e.y - fa.y)/y);
		data.push(new BMap.Point(e.x,e.y));
	});
}

