<template>
  <div class="container">
    <!-- 图表 -->
    <div id="mapContainer" style="min-width:1200px; height:636px"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// require("echarts/map/js/china");
require("echarts/map/js/province/hunan");

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    drawMap() {
      let myChart = echarts.init(document.getElementById("mapContainer"));
      let option = null;

      const geoCoordMap = {
        长沙市: [112.9812698,	28.20082474],
        岳阳市: [113.0980682,	29.37461853],
        湘潭市: [112.9150238,	27.87335014],
        张家界市: [110.4814835,	29.13187981],
        常德市: [111.6876297,	29.03820992],
        益阳市: [112.3340683,	28.60197067],
        湘西土家族苗族自治州: [109.7389287, 28.31173554],
        怀化市: [109.9542313, 27.54740715],
        娄底市: [111.9938965, 27.74133492],
        邵阳市: [111.4773789,	27.25023651],
        衡阳市: [112.5993576,	26.90055466],
        永州市: [111.6121979,	26.2112999],
        郴州市: [113.0286484,	25.80229187],
        株洲市: [113.1520615,	27.85422325]
      }

      let data = {
        长沙市: Math.round(Math.random() * 1000),
        岳阳市: Math.round(Math.random() * 1000),
        湘潭市: Math.round(Math.random() * 1000),
        张家界市: Math.round(Math.random() * 1000),
        常德市: Math.round(Math.random() * 1000),
        益阳市: Math.round(Math.random() * 1000),
        湘西土家族苗族自治州: Math.round(Math.random() * 1000),
        怀化市: Math.round(Math.random() * 1000),
        娄底市: Math.round(Math.random() * 1000),
        邵阳市: Math.round(Math.random() * 1000),
        衡阳市: Math.round(Math.random() * 1000),
        永州市: Math.round(Math.random() * 1000),
        郴州市: Math.round(Math.random() * 1000),
        株洲市: Math.round(Math.random() * 1000)
      }

      // 保存引导线末端的坐标
      let linesEndCoords = {
        长沙市: [geoCoordMap["长沙市"][0]+ 2.6, geoCoordMap["长沙市"][1]],
        岳阳市: [geoCoordMap["岳阳市"][0] + 2.5, geoCoordMap["岳阳市"][1] + 0.5],
        湘潭市: [geoCoordMap["湘潭市"][0] + 2.7, geoCoordMap["湘潭市"][1] - 0.4],
        张家界市: [geoCoordMap["张家界市"][0] - 3, geoCoordMap["张家界市"][1] + 0.6],
        常德市: [geoCoordMap["常德市"][0] - 4, geoCoordMap["常德市"][1]],
        益阳市: [geoCoordMap["益阳市"][0] + 3.3, geoCoordMap["益阳市"][1] + 0.4],
        湘西土家族苗族自治州: [geoCoordMap["湘西土家族苗族自治州"][0] - 2, geoCoordMap["湘西土家族苗族自治州"][1]],
        怀化市: [geoCoordMap["怀化市"][0] - 3, geoCoordMap["怀化市"][1]],
        娄底市: [geoCoordMap["娄底市"][0] - 5, geoCoordMap["娄底市"][1] - 1],
        邵阳市: [geoCoordMap["邵阳市"][0] - 4, geoCoordMap["邵阳市"][1] - 1.3],
        衡阳市: [geoCoordMap["衡阳市"][0] + 3, geoCoordMap["衡阳市"][1] - 1],
        永州市: [geoCoordMap["永州市"][0] - 4.2, geoCoordMap["永州市"][1] - 1],
        郴州市: [geoCoordMap["郴州市"][0] + 2.6, geoCoordMap["郴州市"][1] - 0.7],
        株洲市: [geoCoordMap["株洲市"][0] + 2.4, geoCoordMap["株洲市"][1] - 1.2],
      };

      const colorList = ["#D1AA67", "#b6acfe", "#a397f2", "#7667d8", "#b2a6ff", "#6050cc"];

      //查看详情
      function handleClick() {
        // this.$router.push('/home/stock/' + id)
        this.$router.push('/home/stock')
      }

      // lines引导线数据和坐标
      function dataLines(city, data) {
        var res = [];
        city.forEach(name => {
          res.push({
            name: name,
            value: data[name],
            coords: [geoCoordMap[name], linesEndCoords[name]]
          });
        });
        return res;
      }

      option = {
        geo: {
          type: "map",
          map: "湖南",
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
              areaColor: ""
            }
          }
        },
        tooltip: {
          show: true,
          trigger: "item",
          enterable: true,
          triggerOn: "click",
          position: "inside",
          formatter: (data, ticket, callback) => {
            this.$router.push('/home/stock?id=' + data.value);
            // return (
            //   `<a javascript="this.handleClick()">${data.name}查看详情</a>`
            // );
          }
        },
        series: [
          {
            // 含引导线的省份，用lines实现
            type: "lines",
            symbol: 'circle',
            symbolSize: ['8', '8'],
            label: {
              show: true,
              backgroundColor: "rgba(95,120,254,.20)",
              padding: [5, 12],
              lineHeight: 22,
              color: "#5F78FE",
              borderColor: "#5F78FE",
              borderWidth: 1,
              // formatter: "{b}\n{c}家门店"
              formatter: function(params) {
                return (
                  "{fline|" +
                  params.data.name +
                  "}\n" +
                  params.data.value +
                  "家门店  {tline|查看详情}"
                );
              },
              rich: {
                  fline: {
                    align: 'center'
                  },
                  tline: {
                    fontWeight: 600
                  }
                }
            },
            lineStyle: {
              type: "solid",
              color: "#5F78FE",
              opacity: 1,
              width: 2
            },
            data: dataLines(['长沙市', '岳阳市', '湘潭市', '张家界市', '常德市', '益阳市', '湘西土家族苗族自治州', '怀化市', '娄底市', '邵阳市', '衡阳市', '永州市', '郴州市', '株洲市'],data)
          },
          {
            type: "map",
            geoIndex: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  if (params.dataIndex >= 6) {
                    return colorList[
                      params.dataIndex - 6 * Math.floor(params.dataIndex / 6)
                    ];
                  } else {
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          }
        ]
      };

      myChart.setOption(option);
    },
    drawMap2() {
      let myChart = echarts.init(document.getElementById("mapContainer"));
      let colorList = [
        "#D1AA67",
        "#b6acfe",
        "#a397f2",
        "#7667d8",
        "#b2a6ff",
        "#6050cc"
      ];
      let option = null;
      let hunanDatas = [
        { name: "张家界市", value: 10 },
        { name: "常德市", value: 22 },
        { name: "长沙市", value: 27 },
        { name: "岳阳市", value: 4 },
        { name: "益阳市", value: 9 },
        { name: "湘西土家族苗族自治州", value: 5 },
        { name: "怀化市", value: 22 },
        { name: "娄底市", value: 1 },
        { name: "湘潭市", value: 25 },
        { name: "邵阳市", value: 15 },
        { name: "衡阳市", value: 18 },
        { name: "永州市", value: 9 },
        { name: "郴州市", value: 1 },
        { name: "株洲市", value: 14 }
      ];
      var geoCoordMap = {
        长沙市: [113.0823, 28.2568],
        长沙市: [113.0823, 28.2568],
        长沙市: [113.0823, 28.2568],
        长沙市: [113.0823, 28.2568]
      };
      let convertData = function(data, type) {
        /*type:1 地图参数；type:2数据参数*/
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
        // console.log(res);
        return res;
      };

      // tooltip: {
      //   show: true,
      //   formatter: "{b}<br />{c}家门店"
      // },
      option = {
        geo: {
          show: true,
          map: "湖南",
          zoom: 1, //默认显示级别
          scaleLimit: {
            min: 0,
            max: 3
          }, //缩放级别
          label: {
            show: true,
            // color: "#ffffff",
            emphasis: {
              color: "#fff",
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: function(params) {
                if (params.dataIndex >= 6) {
                  return colorList[
                    params.dataIndex - 6 * Math.floor(params.dataIndex / 6)
                  ];
                } else {
                  return colorList[params.dataIndex];
                }
              },
              borderColor: "#fff",
              borderWidth: 2
            },
            emphasis: {
              areaColor: "#01fea8"
            }
          }
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            z: 1,
            data: [],
            symbolSize: 14,
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  console.log(params);
                  return (
                    "{fline|客户：" +
                    params.data.name +
                    "  " +
                    params.data.name +
                    "}\n{tline|" +
                    params.data.value +
                    "}"
                  );
                },
                position: "top",
                backgroundColor: "rgba(254,174,33,.8)",
                padding: [0, 0],
                borderRadius: 3,
                lineHeight: 32,
                color: "#f7fafb",
                rich: {
                  fline: {
                    padding: [0, 10, 10, 10],
                    color: "#ffffff"
                  },
                  tline: {
                    padding: [10, 10, 0, 10],
                    color: "#ffff00"
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              color: "#feae21"
            }
          },
          // 地图
          {
            name: "hunan",
            type: "map",
            map: "湖南",
            geoIndex: 0,
            z: 0,
            // type: "effectScatter",
            // coordinateSystem: "geo",
            // zlevel: 0,
            itemStyle: {
              normal: {
                color: function(params) {
                  if (params.dataIndex >= 6) {
                    return colorList[
                      params.dataIndex - 6 * Math.floor(params.dataIndex / 6)
                    ];
                  } else {
                    return colorList[params.dataIndex];
                  }
                },
                borderColor: "#fff",
                borderWidth: 2
              }
            },
            data: convertData(hunanDatas, 1)
          }
        ]
      };

      option.series[0].data = option.series[1].data.sort(function(a, b) {
        return b.value - a.value;
      });
      myChart.setOption(option, true);
    },
    drawMap1() {
      var coldCar = [
        {
          name: "车辆1",
          value: [107.615944, 27.479744, 2]
        },
        {
          name: "车辆2",
          value: [108.296644, 27.676476, 2]
        }
      ];
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("mapContainer"));
      var option = {
        tooltip: {
          show: true,
          trigger: "item",
          triggerOn: "click",
          formatter: "名称:{b}<br />坐标:{c}"
        },
        series: [
          {
            name: "冷链运输车分布",
            type: "effectScatter", //配置显示方式为用户自定义
            coordinateSystem: "geo",
            itemStyle: {
              normal: {
                color: "#46bee9"
              }
            },
            renderItem: function(params, api) {
              //具体实现自定义图标的方法
              return {
                type: "image",
                style: {
                  image: "汽车.png",
                  x: api.coord([
                    coldCar[params.dataIndex].value[0],
                    coldCar[params.dataIndex].value[1]
                  ])[0],
                  y: api.coord([
                    coldCar[params.dataIndex].value[0],
                    coldCar[params.dataIndex].value[1]
                  ])[1]
                }
              };
            },
            data: coldCar
          }
        ],
        legend: {
          type: "plain",
          show: true,
          orient: "vertical",
          top: "middle",
          left: "left",
          data: [
            {
              name: "冷链运输车分布",
              icon: "circle",
              textStyle: {
                color: "#a9d6fa"
              }
            }
          ]
        },
        geo: {
          //引入贵州省的地图
          map: "贵州",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          zoom: 1,
          itemStyle: {
            normal: {
              borderColor: "#387ba7",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 10,
              shadowOffsetX: 10
            },
            emphasis: {
              areaColor: "#b3f3f3"
            }
          },
          regions: [
            //对不同的区块进行着色
            {
              name: "毕节市",
              itemStyle: {
                normal: {
                  areaColor: "#2b97df"
                }
              }
            },
            {
              name: "遵义市",
              itemStyle: {
                normal: {
                  areaColor: "#a9d6fd"
                }
              }
            },
            {
              name: "铜仁市",
              itemStyle: {
                normal: {
                  areaColor: "#3497df"
                }
              }
            },
            {
              name: "贵阳市",
              itemStyle: {
                normal: {
                  areaColor: "#0d4369"
                }
              }
            },
            {
              name: "安顺市",
              itemStyle: {
                normal: {
                  areaColor: "#005c9b"
                }
              }
            },
            {
              name: "黔西南布依族苗族自治州",
              itemStyle: {
                normal: {
                  areaColor: "#a9d6fd"
                }
              }
            },
            {
              name: "六盘水市",
              itemStyle: {
                normal: {
                  areaColor: "#0d4369"
                }
              }
            },
            {
              name: "黔东南苗族侗族自治州",
              itemStyle: {
                normal: {
                  areaColor: "#005c9b"
                }
              }
            },
            {
              name: "黔南布依族苗族自治州",
              itemStyle: {
                normal: {
                  areaColor: "#2b97df"
                }
              }
            }
          ]
        }
      };
      myChart.setOption(option);
    },
    //查看详情
    handleClick() {
      console.log('1')
      this.$router.push('/home/stock')
    },
  },
  mounted() {
    this.drawMap();
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  text-align: center;
  // padding: 30px 40px 20px;
  background: #fff;
  .pagination {
    padding-top: 15px;
  }
}
</style>