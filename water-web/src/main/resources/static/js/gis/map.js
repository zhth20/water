/**
 * Created by Loyal on 2016/12/29.
 */
layui.config({
    base: '/static/js/common/'
});

layui.use('layer', function () {
    var map = new BMap.Map('map-content');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);//设定地图的中心点和坐标并将地图显示在地图容器中
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
    var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
    map.addControl(ctrl_nav);
});