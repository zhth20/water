/**
 *
 myChart.setOption({
    series: [{
        data: data
    }]
});

 */

layui.define(function (exports) {

    function CustomCharts(self, type) {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.type = type;
        switch (type) {
            case 0:
                this.defaultOffset = new BMap.Size(10, 10);
                break;
            case 1:
                this.chartData = new ChartData();
                this.echarts = [];
                this.defaultOffset = new BMap.Size(10, 10);
                break;
            case 2:
                this.defaultOffset = new BMap.Size(410, 310);
                break;
        }

        this.map = self.map;
        this.customMap = self;
        //this.materials = target.materials;
        //this.types = target.types;
        this.element = document.createElement("div");
        this.pipe = null;
        this.lock = false;

        this.myChart = null;
    }

    CustomCharts.prototype = new BMap.Control();

    CustomCharts.prototype.initialize = function () {
        var self = this, ele = self.element, html, width, height;

        switch (self.type) {
            case 0:
                width = $("#MapContent").width() / 2;
                height = $("#MapContent").height() / 2;
                html = '<div id="line-chart-demo-' + self.type + '" class="morrischart" style="height: ' + height + 'px;width:' + width + 'px;"></div>';
                break;
            case 1:
                width = $("#MapContent").width() * 2 / 3;
                height = $("#MapContent").height() * 3 / 5;
                html = '<div class="morrischart" style="height: ' + height + 'px;width:' + width + 'px;">' +
                    '<div id="line-chart-demo-' + self.type + '-1" class="morrischart" style="width: 100%; height: 60%; float: left"></div>' +
                    '<div id="line-chart-demo-' + self.type + '-2" class="morrischart" style="width: 30%; height: 39%; float: left"></div>' +
                    '<div id="line-chart-demo-' + self.type + '-3" class="morrischart" style="width: 30%; height: 39%; float: left"></div>' +
                    '<div id="line-chart-demo-' + self.type + '-4" class="morrischart" style="width: 40%; height: 39%; float: right"></div>' +
                    '</div>';
                break;
        }
        console.log(width + ',' + height);


        $(ele).attr('id', 'pipe-control');
        $(ele).attr('style', 'background-color:rgba(255, 255, 255, 0.9)');
        $(ele).append(html);

        //默认隐藏
        //$(ele).hide();
        // 添加DOM元素到地图中
        this.map.getContainer().appendChild(ele);
        // 将DOM元素返回
        this.render();
        return ele;
    };
    CustomCharts.prototype.openfunc = function () {
        this.show();
        if (this.type == 1) {
            this.chartData = new ChartData();
            this.ajaxSeries();
        }

    }
    CustomCharts.prototype.closefunc = function () {
        this.hide();
    }
    CustomCharts.prototype.DrawMapLine = function (e) {
        var self = this.customMap, xAxis = [], seriesx = [], seriesy = [];
        $.each(self.customer.cong.map, function (i, l) {
            xAxis.push('DN' + l.dn);
            seriesx.push(0);
        });
        //self.customMap.customPipes.pipes
        //console.log(self.pipes);
        $.each(self.customPipes.pipes, function (x, l) {
            var index = -1;
            //console.log(x + ',' + l);
            for (var i = 0; i < xAxis.length; i++) {
                if (l.dn == xAxis[i]) {
                    index = i;
                    break;
                }
            }
            if (index > 0) {
                seriesx[index] += l.meter;
            }
        });
        console.log(seriesx);
        $.each(seriesx, function (i, m) {
            seriesy.push(m * ((Math.random() * 10 + 5).toFixed(0) - 0));
        });
        console.log(seriesy);
        var option = {
            title: {
                text: '管网数据统计',
                subtext: '管网总长度：' + eval(seriesx.join('+')) + ' 米，管网总造价：' + eval(seriesy.join('+')) + ' 元',
                x: 'center'
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['长度', '造价'],
                x: 'left'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: xAxis
            },
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '米',
                    boundaryGap: [0, 0.1]
                },
                {
                    type: 'value',
                    scale: true,
                    name: '元',
                    boundaryGap: [0, 0.1]
                }
            ],
            series: [
                {
                    name: '造价',
                    type: 'bar',
                    // xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: seriesy
                },
                {
                    name: '长度',
                    type: 'line',
                    smooth: true,
                    data: seriesx
                }
            ]
        };

        e.setOption(option);
        /*
         e.setOption({
         xAxis:{
         data: ['DN50', 'DN65','DN80','DN100','DN125']
         },
         series: [{
         data: [100,123,200,210,190]
         },{
         data: [500,2320,2453,5555,3211]
         }]
         });*/
    }
    CustomCharts.prototype.DrawEChartRader = function (e) {
        var option = {
            title: {
                text: '压力监测（MPa）',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: 'bottom',
                data: ['最小压力', '最大压力', '实际压力']
            },
            polar: [
                {
                    indicator: [
                        {text: '监测点一', max: 0.8},
                        {text: '监测点二', max: 0.7},
                        {text: '监测点三', max: 0.9},
                        {text: '监测点四', max: 0.75},
                        {text: '监测点五', max: 0.6},
                        {text: '监测点六', max: 0.8}
                    ]
                }
            ],
            calculable: true,
            series: [
                {
                    name: '压力监测',
                    type: 'radar',
                    data: [
                        {
                            value: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                            name: '最小压力'
                        },
                        {
                            value: [0.8, 0.7, 0.9, 0.75, 0.6, 0.8],
                            name: '最大压力'
                        },
                        {
                            value: [0.6, 0.7, 0.8, 0.7, 0.6, 0.4],
                            name: '实际压力'
                        }
                    ]
                }
            ]
        };
        e.setOption(option);

        var timeTicket;
        clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            //lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
            //lastData = lastData.toFixed(1) - 0;
            //axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
            var data = [
                {
                    value: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
                    name: '最小压力'
                },
                {
                    value: [0.8, 0.7, 0.9, 0.75, 0.6, 0.8],
                    name: '最大压力'
                },
                {
                    value: [Math.floor(Math.random() * (31) + 50) / 100, Math.floor(Math.random() * (21) + 50) / 100, Math.floor(Math.random() * (41) + 50) / 100, Math.floor(Math.random() * (31) + 45) / 100, Math.floor(Math.random() * (25) + 40) / 100, Math.floor(Math.random() * (41) + 40) / 100],
                    name: '实际压力'
                }
            ];
            // 动态数据接口 addData
            e.setOption({
                series: [{
                    data: data
                }]
            });
        }, 2100);
    }
    CustomCharts.prototype.DrawEChartArea = function (e) {
        var option = {
            title: {
                text: '分区漏损分析情况',
                subtext: '数据纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} m³ ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: '漏损比例',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['50%', '60%'],
                    roseType: 'area',
                    x: '50%',               // for funnel
                    max: 40,                // for funnel
                    sort: 'ascending',     // for funnel
                    data: [
                        {value: 10, name: '分区一'},
                        {value: 5, name: '分区二'},
                        {value: 15, name: '分区三'},
                        {value: 25, name: '分区四'},
                        {value: 20, name: '分区五'},
                        {value: 35, name: '分区六'},
                        {value: 30, name: '分区七'},
                        {value: 40, name: '分区八'}
                    ]
                }
            ]
        };
        e.setOption(option);

        var timeTicket;
        clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            //lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
            //lastData = lastData.toFixed(1) - 0;
            //axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
            var data = [
                {value: Math.floor(Math.random() * (41) + 5), name: '分区一'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区二'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区三'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区四'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区五'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区六'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区七'},
                {value: Math.floor(Math.random() * (41) + 5), name: '分区八'}
            ];
            // 动态数据接口 addData
            e.setOption({
                series: [{
                    data: data
                }]
            });
        }, 5000);
    }
    CustomCharts.prototype.initEChartPoint = function () {
        var self = this;
        $.each(self.echarts, function (i, e) {
            var option;
            switch (i) {
                case 0:
                    option = {
                        title: {
                            text: '演示表号：1412900001',
                            subtext: '数据显示时间',
                            x: 'center'
                        },
                        grid: [{x: '7%', width: '86%'}],
                        //{x: '7%', y: '20%', width: '38%', height: '38%'},01:25:15 258
                        tooltip: {
                            trigger: 'axis',
                            position: function (pt) {
                                return [pt[0], '2%'];
                            }
                        },
                        legend: {
                            data: ['正向流量', '反向流量', '压力'],
                            x: 'left'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: false},
                                dataZoom: {yAxisIndex: 'none'},
                                dataView: {show: false, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                mybefore: {
                                    show: true,
                                    title: '前一天',
                                    icon: 'path://M627 992q0 -13 -10 -23l-393 -393l393 -393q10 -10 10 -23t-10 -23l-50 -50q-10 -10 -23 -10t-23 10l-466 466q-10 10 -10 23t10 23l466 466q10 10 23 10t23 -10l50 -50q10 -10 10 -23z',
                                    onclick: function () {
                                        //self.time = new Date(self.time.getTime() - (24 * 60 * 60 * 1000));
                                        //self.chartData = new ChartData();
                                        //self.ajaxSeries(getStringDate(self.time),getStringDate(new Date(self.time.getTime() + (24 * 60 * 60 * 1000))));
                                        //$('.morrischart').attr('style','height: '+ $("#MapContent").height() + 'px;width:' + $("#MapContent").width() +'px;');
                                        //$('#line-chart-demo-1-1').attr('style','height: '+ $("#MapContent").height()*2/3 + 'px;width:' + $("#MapContent").width() +'px;');
                                        CustomAlert('#modal-1', '对不起、您的选择暂无数据');
                                        //html = '<div class="morrischart" style="height: '+ $("#MapContent").height() + 'px;width:' + $("#MapContent").width() +'px;">' +
                                    }
                                },
                                myafter: {
                                    show: true,
                                    title: '后一天',
                                    icon: 'path://M595 576q0 -13 -10 -23l-466 -466q-10 -10 -23 -10t-23 10l-50 50q-10 10 -10 23t10 23l393 393l-393 393q-10 10 -10 23t10 23l50 50q10 10 23 10t23 -10l466 -466q10 -10 10 -23z',
                                    onclick: function () {
                                        CustomAlert('#modal-1', '对不起、您的选择暂无数据');
                                        //window.clearInterval(self.f);
                                        //self.time = new Date(self.time.getTime() + (24 * 60 * 60 * 1000));
                                        //self.chartData = new ChartData();
                                        //self.ajaxSeries(getStringDate(self.time),getStringDate(new Date(self.time.getTime() + (24 * 60 * 60 * 1000))));
                                    }
                                },
                                saveAsImage: {show: true}
                            }
                        },
                        //calculable : true,
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: []
                            }
                        ],
                        yAxis: [
                            {
                                name: '流量(m³)',
                                type: 'value'
                            },
                            {
                                name: '压力(MPa)',
                                type: 'value'

                            }
                        ],
                        dataZoom: [{
                            type: 'inside',
                            start: 0,
                            end: 100
                        }, {
                            start: 0,
                            end: 10,
                            //handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            //handleSize: '80%',
                            handleStyle: {
                                color: '#fff',
                                shadowBlur: 3,
                                shadowColor: 'rgba(0, 0, 0, 0.6)',
                                shadowOffsetX: 2,
                                shadowOffsetY: 2
                            }
                        }],
                        series: [
                            {
                                name: '正向流量',
                                type: 'line',
                                smooth: true,
                                itemStyle: {
                                    normal: {
                                        color: '#8299A9'
                                    }
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                },
                                data: []

                            },
                            {
                                name: '反向流量',
                                type: 'line',
                                smooth: true,
                                itemStyle: {
                                    normal: {
                                        color: '#303641'
                                    }
                                },
                                data: []
                            },
                            {
                                name: '压力',
                                type: 'line',
                                smooth: true,
                                yAxisIndex: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#A34777'
                                    }
                                },
                                data: []
                            }
                        ]
                    };
                    break;
                case 1:
                    option = {
                        title: {
                            text: '数据异常统计',
                            subtext: '数据丢失统计'
                        },
                        grid: {
                            left: '3%',
                            right: '7%',
                            bottom: '3%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0,
                            formatter: function (params) {
                                return params.seriesName + ' : ' + params.value + '<br />' + params.name;
                            },
                            axisPointer: {
                                show: true,
                                type: 'cross',
                                lineStyle: {
                                    type: 'dashed',
                                    width: 1
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataZoom: {},
                                brush: {
                                    type: ['rect', 'polygon', 'clear']
                                }
                            }
                        },

                        //calculable : true,
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: []
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '丢点个数',
                                type: 'scatter',
                                markArea: {
                                    silent: true,
                                    itemStyle: {
                                        normal: {
                                            color: 'transparent',
                                            borderWidth: 1,
                                            borderType: 'dashed'
                                        }
                                    },
                                    data: [[{
                                        name: '丢点个数分布区间',
                                        yAxis: 'min'
                                    }, {
                                        yAxis: 'max'
                                    }]]
                                },
                                data: []

                            }
                        ]
                    };
                    break;
                case 2:
                    option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} m³({d}%)"
                        },
                        legend: {
                            y: 'bottom',
                            x: 'center'
                        },
                        series: [
                            {
                                name: '漏损分析',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: [0, '50%'],

                                label: {
                                    normal: {
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: [
                                    {value: 4, name: '漏损'},
                                    {value: 4, name: '流量'}
                                ]
                            },
                            {
                                name: '3小时用量',
                                type: 'pie',
                                radius: ['60%', '80%'],
                                data: [
                                    {value: 2, name: '00:00-3:00'},
                                    {value: 2, name: '3:00-6:00'},
                                    {value: 2, name: '6:00-9:00'},
                                    {value: 2, name: '9:00-12:00'},
                                    {value: 2, name: '12:00-15:00'},
                                    {value: 2, name: '15:00-18:00'},
                                    {value: 2, name: '18:00-21:00'},
                                    {value: 2, name: '21:00-00:00'}
                                ]
                            }
                        ]
                    };
                    break;
                case 3:
                    option = {
                        title: {
                            text: '压力、流量分布',
                            subtext: '数据时间：2016-08-18'
                        },
                        grid: {
                            left: '3%',
                            right: '7%',
                            bottom: '3%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0,
                            formatter: function (params) {
                                if (params.value.length > 1) {
                                    return params.seriesName + ' :' + params.value[0] + 'm³ ' + params.value[1] + 'Mpa ';
                                }
                                else {
                                    var u = 'm³ ';
                                    if (params.name == '压力平均值')
                                        u = 'Mpa ';
                                    return params.seriesName + params.name + ' : ' + params.value + u;
                                }
                            },
                            axisPointer: {
                                show: true,
                                type: 'cross',
                                lineStyle: {
                                    type: 'dashed',
                                    width: 1
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataZoom: {},
                                brush: {
                                    type: ['rect', 'polygon', 'clear']
                                }
                            }
                        },
                        brush: {},
                        legend: {
                            data: ['正向', '反向'],
                            left: 'center'
                        },
                        xAxis: [
                            {
                                type: 'value',
                                scale: true,
                                splitLine: {
                                    show: false
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                scale: true,
                                splitLine: {
                                    show: false
                                }
                            }
                        ],
                        series: [
                            {
                                name: '正向',
                                type: 'scatter',
                                data: [],
                                markArea: {
                                    silent: true,
                                    itemStyle: {
                                        normal: {
                                            color: 'transparent',
                                            borderWidth: 1,
                                            borderType: 'dashed'
                                        }
                                    },
                                    data: [[{
                                        name: '正向流量分布区间',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]]
                                },
                                markLine: {
                                    lineStyle: {
                                        normal: {
                                            type: 'solid'
                                        }
                                    },
                                    data: [
                                        {type: 'average', name: '流量平均值', valueIndex: 0},
                                        {type: 'average', name: '压力平均值', valueIndex: 1}
                                    ]
                                }
                            },
                            {
                                name: '反向',
                                type: 'scatter',
                                data: [],
                                markArea: {
                                    silent: true,
                                    itemStyle: {
                                        normal: {
                                            color: 'transparent',
                                            borderWidth: 1,
                                            borderType: 'dashed'
                                        }
                                    },
                                    data: [[{
                                        name: '反向流量分布区间',
                                        xAxis: 'min',
                                        yAxis: 'min'
                                    }, {
                                        xAxis: 'max',
                                        yAxis: 'max'
                                    }]]
                                },
                                markLine: {
                                    lineStyle: {
                                        normal: {
                                            type: 'solid'
                                        }
                                    },
                                    data: [
                                        {type: 'average', name: '流量平均值', valueIndex: 0},
                                        {type: 'average', name: '压力平均值', valueIndex: 1}
                                    ]
                                }
                            }
                        ]
                    };
                    break;
            }
            e.setOption(option);
        });
    }
    CustomCharts.prototype.showLoading = function (b) {
        if (b) {
            for (var i = 0; i < this.echarts.length; i++) {
                this.echarts[i].showLoading({
                    text: '数据加载中',
                    color: '#c23531',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.8)',
                    zlevel: 0
                });
            }
        }
        else {
            for (var i = 0; i < this.echarts.length; i++) {
                this.echarts[i].hideLoading();
            }
        }
    }
    CustomCharts.prototype.doAjax = function (t) {
        var self = t;
        $.each(self.echarts, function (i, e) {
            switch (i) {
                case 0:
                    e.setOption({
                        title: {subtext: '数据更新时间：' + self.chartData.ctime[self.chartData.ctime.length - 1]},
                        xAxis: [{data: self.chartData.ctime}],
                        series: [{
                            data: self.chartData.ff,
                            markArea: {
                                silent: true,
                                data: [[{
                                    xAxis: strA
                                }, {
                                    xAxis: strB
                                }]]
                            }
                        }, {data: self.chartData.rf}, {data: self.chartData.p}]
                    });
                    break;
                case 10:
                    e.setOption({
                        series: [{
                            data: {
                                value: self.chartData.ff[self.chartData.ff.length - 1] - self.chartData.rf[self.chartData.rf.length - 1],
                                name: 'm³'
                            }
                        },
                            {
                                data: {
                                    value: self.chartData.ff[self.chartData.ff.length - 1],
                                    name: 'm³'
                                }
                            }, {data: {value: self.chartData.rf[self.chartData.rf.length - 1], name: 'm³'}},
                            {data: {value: self.chartData.p[self.chartData.p.length - 1], name: 'MPa'}}]
                    });
                    data:[{value: 0.5, name: 'm³'}]
                    break;
                case 1:
                    e.setOption({
                        xAxis: [{data: self.chartData.ctime}],
                        series: [{data: self.chartData.points.num}]
                    });
                    break;
                case 2:
                    var d4 = [], d2 = [];
                    for (var x = 0; x < self.chartData.tflow.length; x++) {
                        d2.push({value: self.chartData.tflow[x], name: x * 3 + ':00-' + (x * 3 + 3) + ':00'});
                    }
                    e.setOption({
                        series: [{
                            data: [{value: self.chartData.nwr.nwr, name: '漏损'}, {
                                value: self.chartData.nwr.flow,
                                name: '流量'
                            }]
                        }, {data: d2}]
                    });
                    break;
                case 3:
                    e.setOption({
                        series: [{data: self.chartData.flow[0]}, {data: self.chartData.flow[1]}]
                    });
                    break;
            }
        });
    }
    CustomCharts.prototype.ajaxSeries = function () {
        var self = this;
        var date = new Date();
        var dateMid = date.getTime() + (24 * 60 * 60 * 1000);
        //this.showLoading(true);
        self.showLoading(true);
        //getStringDate(date),end:getStringDate(new Date(dateMid))
        $.post('resources/data/demo.json', {}, function (data) {
            //self.showLoading(false);
            self.showLoading(false);
            //console.log(self.chartData.tflow.length);
            data.normal.forEach(function (e) {
                var any = [], flowf = [], flowr = [], h = 0, m = 0, id = 0, hid = 0;
                self.chartData.ctime.push(e.collecttime);
                self.chartData.ff.push(e.fperiodflow);
                self.chartData.ft.push(e.ftotalflow);
                self.chartData.rf.push(e.rperiodflow);
                self.chartData.rt.push(e.rtotalflow);
                self.chartData.p.push(e.pressvalue);
                self.chartData.instflow.push(e.instflow);
                h = parseInt(e.h);
                hid = Math.floor(h / 3);
                m = parseInt(e.m);
                id = Math.floor(h * 30 + m / 2);

                if (self.chartData.id.length > 0) {
                    var count = id - self.chartData.id[self.chartData.id.length - 1];
                    if (count > 1)
                        self.chartData.points.num.push(count - 2);
                    else
                        self.chartData.points.num.push(count - 1);
                }
                else {
                    //if(id > 0){
                    self.chartData.points.num.push(id);
                    //self.chartData.points.time.push(e.collecttime);
                    //console.log(id);
                }

                if (e.instflow >= 0) {
                    any.push(e.instflow);
                    any.push(e.pressvalue);
                    self.chartData.data[0].push(any);
                }
                else {
                    any.push(-e.instflow);
                    any.push(e.pressvalue);
                    self.chartData.data[1].push(any);
                }

                self.chartData.id.push(id);
                //
                //self.chartData.tflow[Math.floor(h/3)][Math.floor((h%4)/2)].push(e.fperiodflow - e.rperiodflow);
                //self.chartData.id = Math.floor(h*30 + m/2);

                if (self.chartData.flowdata.fstart + self.chartData.flowdata.rstart == 0) {
                    self.chartData.flowdata.fstart = e.ftotalflow;
                    self.chartData.flowdata.rstart = e.rtotalflow;
                }

                if (hid != self.chartData.flowdata.id) {
                    var flow = (self.chartData.flowdata.fend - self.chartData.flowdata.fstart) - (self.chartData.flowdata.rend - self.chartData.flowdata.rstart);
                    if (self.chartData.flowdata.id == 0)
                        flow += self.chartData.ff[0] - self.chartData.rf[0];
                    flow = Math.round(flow * 1000) / 1000;

                    self.chartData.tflow.push(flow);
                    self.chartData.flowdata.fstart = self.chartData.flowdata.fend;
                    self.chartData.flowdata.rstart = self.chartData.flowdata.rend;
                    self.chartData.flowdata.id = hid;
                }
                self.chartData.flowdata.fend = e.ftotalflow;
                self.chartData.flowdata.rend = e.rtotalflow;

                //压力、流量关系数据初始化
                if (e.fperiodflow > 0) {
                    flowf.push(e.fperiodflow);
                    flowf.push(e.pressvalue);
                    self.chartData.flow[0].push(flowf);
                }
                if (e.rperiodflow) {
                    flowr.push(e.rperiodflow);
                    flowr.push(e.pressvalue);
                    self.chartData.flow[1].push(flowr);
                }

            });
            if (self.chartData.flowdata.id == self.chartData.tflow.length) {
                var flow = Math.round(((self.chartData.flowdata.fend - self.chartData.flowdata.fstart) - (self.chartData.flowdata.rend - self.chartData.flowdata.rstart)) * 1000) / 1000
                self.chartData.tflow.push(flow);
            }
            console.log('inited 0');
            self.chartData.nwr = printData(self.chartData);
            //self.setChartData(self);
            console.log('inited 1');
            self.doAjax(self);
        });
    }
    CustomCharts.prototype.render = function () {
        //alert("OK");
        var draw = this.DrawEChart;
        //console.log("render:" + this.type);
        var self = this;
        //this.echarts.push(echarts.init(document.getElementById('line-chart-demo')));
        switch (self.type) {
            case 0:
                self.DrawMapLine(echarts.init(document.getElementById('line-chart-demo-' + self.type)));
                break;
            case 1:
                //DrawEChartPoint
                self.echarts.push(echarts.init(document.getElementById('line-chart-demo-' + self.type + '-1')));
                self.echarts.push(echarts.init(document.getElementById('line-chart-demo-' + self.type + '-2')));
                self.echarts.push(echarts.init(document.getElementById('line-chart-demo-' + self.type + '-3')));
                self.echarts.push(echarts.init(document.getElementById('line-chart-demo-' + self.type + '-4')));
                self.initEChartPoint();
                break;
            case 2:
                self.DrawEChartArea(echarts.init(document.getElementById('line-chart-demo-' + self.type)));
                break;
        }
    }
    function ChartData() {
        this.id = [];
        this.ctime = [];
        this.ff = [];
        this.ft = [];

        this.rf = [];
        this.rt = [];
        this.p = [];
        this.instflow = [];
        this.data = [[], []];
        this.flow = [[], []];
        this.tflow = [];
        this.flowdata = new FlowData();
        function FlowData() {
            this.fstart = 0;
            this.rstart = 0;
            this.fend = 0;
            this.rend = 0;
            this.id = 0;
        }

        this.nwr;
        this.points = new Points();
        function Points() {
            this.num = [];
            this.time = [];
        }
    }

    function MeterNWR() {
        this.max = 0;
        this.min = 0;
        this.nwr = 0;
        this.flow = 0;
    }

    var strA, strB;

    function printData(o) {
        var arr = [], size = o.ff.length;
        if (o.ff.length > 240)
            arr = o.ff.slice(0, 240);
        else
            arr = o.ff;
        var m = Math.min.apply(Math, arr);
        //console.log(m);
        var a = -1, b = 0;
        var min = 0;
        max = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > m * 1.30) {
                if (i - b > 3 && a != -1) {
                    if (max - min < b - a) {
                        min = a;
                        max = b;
                    }
                    a = -1;
                }
            }
            else {
                b = i;
                if (a == -1)
                    a = i;
                if (b >= arr.length - 1) {
                    if (max - min < b - a) {
                        min = a;
                        max = b;
                    }
                }
            }

        }
        strA = o.ctime[min];
        strB = o.ctime[max];

        var nwr = new MeterNWR();
        nwr.min = min;
        nwr.max = max;
        nwr.nwr = o.ft[max] - o.ft[min] - (o.rt[max] - o.rt[min]) + o.ff[min];
        nwr.nwr = nwr.nwr / ((o.id[max] - o.id[min]) / o.id[size - 1]);
        nwr.flow = o.ft[size - 1] - o.ft[0] - (o.rt[size - 1] - o.rt[0]) + o.ff[0] - nwr.nwr;

        nwr.nwr = Math.round(nwr.nwr * 1000) / 1000;
        nwr.flow = Math.round(nwr.flow * 1000) / 1000;
        return nwr;
    }

    exports('charts', CustomCharts);
});