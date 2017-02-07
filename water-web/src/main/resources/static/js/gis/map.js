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

layui.use(['CustomMap', 'element', 'upload','form','laydate'], function () {
    var element = layui.element();
    var form = layui.form();
    layui.upload({
        url: '/upload',
        unwrap: false, //其实就是不向你的input包裹upload组件的ui元素
        success: function (res, input) {
        }
    });
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
});