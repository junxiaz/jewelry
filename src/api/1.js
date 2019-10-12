
const geoCoordMap = {
    江西: [115.892151, 28.676493],
    河南: [113.665412, 34.757975],
    四川: [104.065735, 30.659462],
    重庆: [106.504962, 29.533155],
    西藏: [91.132212, 29.660361],
    贵州: [106.713478, 26.578343],
    辽宁: [123.429096, 41.796767],
    新疆: [87.617733, 43.792818],
    山东: [117.000923, 36.675807],
    上海: [121.472644, 31.231706],
    澳門: [113.54909, 22.198951],
    山西: [112.549248, 37.857014],
    浙江: [120.153576, 30.287459],
    海南: [110.33119, 20.031971],
    福建: [119.306239, 26.075302],
    青海: [101.778916, 36.623178],
    宁夏: [106.278179, 38.46637],
    湖北: [114.298572, 30.584355],
    甘肃: [103.823557, 36.058039],
    安徽: [117.283042, 31.86119],
    台湾: [121.509062, 25.044332],
    陕西: [108.948024, 34.263161],
    广西: [108.320004, 22.82402],
    天津: [117.190182, 39.125596],
    云南: [102.712251, 25.040609],
    黑龙江: [126.642464, 45.756967],
    广东: [113.280637, 23.125178],
    湖南: [112.982279, 28.19409],
    河北: [114.502461, 38.045474],
    内蒙古: [111.670801, 40.818311],
    吉林: [125.3245, 43.886841],
    江苏: [118.767413, 32.041544],
    北京: [116.405285, 39.904989],
    香港: [114.173355, 22.320048]
};

var data = {
    江西: Math.round(Math.random() * 1000),
    河南: Math.round(Math.random() * 1000),
    四川: Math.round(Math.random() * 1000),
    重庆: Math.round(Math.random() * 1000),
    西藏: Math.round(Math.random() * 1000),
    贵州: Math.round(Math.random() * 1000),
    辽宁: Math.round(Math.random() * 1000),
    新疆: Math.round(Math.random() * 1000),
    山东: Math.round(Math.random() * 1000),
    山西: Math.round(Math.random() * 1000),
    海南: Math.round(Math.random() * 1000),
    福建: Math.round(Math.random() * 1000),
    青海: Math.round(Math.random() * 1000),
    宁夏: Math.round(Math.random() * 1000),
    湖北: Math.round(Math.random() * 1000),
    甘肃: Math.round(Math.random() * 1000),
    安徽: Math.round(Math.random() * 1000),
    陕西: Math.round(Math.random() * 1000),
    广西: Math.round(Math.random() * 1000),
    云南: Math.round(Math.random() * 1000),
    黑龙江: Math.round(Math.random() * 1000),
    湖南: Math.round(Math.random() * 1000),
    河北: Math.round(Math.random() * 1000),
    内蒙古: Math.round(Math.random() * 1000),
    吉林: Math.round(Math.random() * 1000),
    //江苏北京香港上海澳門浙江台湾天津广东 没数据
}

// 保存引导线末端的坐标
var linesEndCoords = {
    山西: [geoCoordMap['山西'][0], geoCoordMap['山西'][1] + 8],
    陕西: [geoCoordMap['陕西'][0], geoCoordMap['陕西'][1] + 16],
    宁夏: [geoCoordMap['宁夏'][0], geoCoordMap['宁夏'][1] + 6],
    甘肃: [geoCoordMap['甘肃'][0], geoCoordMap['甘肃'][1] + 16],
    河北: [geoCoordMap['河北'][0] + 12, geoCoordMap['河北'][1]],
    山东: [geoCoordMap['山东'][0] + 20, geoCoordMap['山东'][1]],
    河南: [geoCoordMap['河南'][0] + 14, geoCoordMap['河南'][1]],
    安徽: [geoCoordMap['安徽'][0] + 20, geoCoordMap['安徽'][1]],
    湖北: [geoCoordMap['湖北'][0] + 14, geoCoordMap['湖北'][1]],
    江西: [geoCoordMap['江西'][0] + 22, geoCoordMap['江西'][1]],
    福建: [geoCoordMap['福建'][0] + 9, geoCoordMap['福建'][1]],
    海南: [geoCoordMap['海南'][0] + 9, geoCoordMap['海南'][1]],
    重庆: [geoCoordMap['重庆'][0] - 27, geoCoordMap['重庆'][1]],
    云南: [geoCoordMap['云南'][0] - 10, geoCoordMap['云南'][1]],
    广西: [geoCoordMap['广西'][0] - 30, geoCoordMap['广西'][1]],
    贵州: [geoCoordMap['贵州'][0], geoCoordMap['贵州'][1] - 10],
    湖南: [geoCoordMap['湖南'][0], geoCoordMap['湖南'][1] - 11],
}

let colorList = [
    "#705fe0",
    "#b6acfe",
    "#a397f2",
    "#7667d8",
    "#b2a6ff",
    "#6050cc"
];

// lines引导线数据和坐标
function dataLines(province, data) {
    var res = [];
    province.forEach(name => {
        res.push({
            name: name,
            value: data[name],
            coords: [
                geoCoordMap[name],
                linesEndCoords[name]
            ],
        })
    })
    return res;
}

// 散点图数据，其中value属性值为地理坐标和value拼接
// function dataScatter(province,data){
//     var res=[];
//     province.forEach(name=>{
//         res.push({
//             name:name,
//             value:[geoCoordMap[name][0],geoCoordMap[name][1],data[name]]
//         })
//     })
//     return res;
// }

option = {
    geo: {
        type: 'map',
        map: 'china',
        label: {
            show: true
        },
        roam: false,
        itemStyle: {
            normal: {
                borderColor: "#fff",
                borderWidth: 2
            },
            emphasis: {
                areaColor: "",
            }
        }
    },
    tooltip: {
        show: true,
        trigger: 'item',
        enterable: true,
        triggerOn: 'mousemove',
        position: 'inside',
        formatter: function (data, ticket, callback) {
            // if (data.name) return;
            // var html = data[0].name + '<br/>';
            // for (var i=0; i<data.length; i++) {
            //     html += data[i].seriesName + " : " + data[i].data + "% <br/>";
            // }
            return "<a href='http://www.baidu.com'>" + data.name + "查看详情</a>";
        }
    },
    series: [{ // 含引导线的省份，用lines实现
        type: 'lines',
        label: {
            show: true,
            backgroundColor: "rgba(95,120,254,0.20)",
            padding: [10, 12],
            lineHeight: 32,
            color: '#5F78FE',
            borderColor: '#5F78FE',
            borderWidth: 1,
            formatter: '{b}\n{c}家门店'
        },
        lineStyle: {
            type: 'solid',
            color: '#5F78FE',
        },
        data: dataLines(['山西', '陕西', '宁夏', '甘肃', '河北', '山东', '河南', '安徽', '湖北', '江西',
            '福建', '海南', '重庆', '云南', '广西', '贵州', '湖南'], data),
    },
    {
        type: "map",
        geoIndex: 0,
        itemStyle: {
            normal: {
                color: function (params) {
                    if (params.dataIndex >= 6) {
                        return colorList[
                            params.dataIndex - 6 * Math.floor(params.dataIndex / 6)
                        ];
                    } else {
                        return colorList[params.dataIndex];
                    }
                }
            }
        },
    }
        // { // 没有引导线的省份，用scatter实现
        //     type: 'scatter',
        //     coordinateSystem:'geo',
        //     // symbolSize:6,
        //     label:{
        //       show:true,
        //     //   position:'bottom',
        //       formatter:'{b}',
        //     },
        //     itemStyle:{
        //         color:'#00f',
        //     },
        //     data:dataScatter(['山西','黑龙江','吉林','辽宁','内蒙古','四川','青海','新疆','西藏'],data),
        // }
    ]
}
