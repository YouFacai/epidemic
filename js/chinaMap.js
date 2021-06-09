var ROOT_PATH = "./public/chinaMap.json";
// 固定步骤
var myChart = echarts.init(CMap);
var option;
//显示一个内置的加载动画
myChart.showLoading();

function render() {
    return new Promise((resovle) => {
        $.get(ROOT_PATH, function (usaJson) {
            //隐藏一个内置的加载动画
            myChart.hideLoading();
            //算是注册一下地图  此处要和下面series.map值相同
            echarts.registerMap('china', usaJson, {});
            option = {
                title: {
                    text: '中国疫情情况图',
                    left: 'center',
                    top: "20%",
                },
                //提示框组件 鼠标放上去的提示框
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                        var value = (params.value + '').split('.');
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                        return params.seriesName + '<br/>' + params.name + ': ' + value;
                    }
                },
                //图例
                visualMap: {
                    pieces: [
                        { min: 40 },
                        { min: 20, max: 40 },
                        { min: 10, max: 20 },
                        { min: 5, max: 10 },
                        { min: 1, max: 5 },
                        { max: 0 },
                    ],
                    hoverLink: true,
                    bottom: "10%"
                },
                //内容主体
                series: [
                    {
                        name: 'china',
                        //类型是map
                        type: 'map',
                        // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        roam: true,
                        map: 'china',
                        //地图上每个区域的设置
                        label: {
                            show: true,
                        },
                        align: 'center',
                        //获得焦点时的样式设置
                        emphasis: {
                            itemStyle: {
                                areaColor: 'red'
                            }
                        },
                        zoom: 1.2,
                        top: 195,
                        //根据这个数据进行渲染
                        data: []
                    }
                ]
            };
            resovle();
            myChart.setOption(option);
        });
    })
}

// 请求疫情数据
axios.get('./public/zhongguo.json').then((res) => {
    render().then(() => {
        let renderData = res.data.data.areaTree.filter((item) => {
            return item.name == '中国';
        })
        renderData = renderData[0].children.map((item) => {
            return {
                name: item.name,
                value: item.total.confirm - item.total.heal - item.total.dead || 0,
                locationId: item.id
            }
        })
        option.series[0].data = renderData;
        //重新渲染上去
        myChart.setOption(option);
    });
})

option && myChart.setOption(option);