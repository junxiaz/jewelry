<template>
  <div class="container">
    <!-- 图表 -->
    <div id="mapContainer" style="width:1200px; height:636px"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/map/js/province/hunan");

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    drawMap() {
      let myChart = echarts.init(document.getElementById("mapContainer"));

      myChart.setOption({
        visualMap: {
            min: 0,
            max: 30,
            inRange: {
                color: ['#b6acfe', '#b2a6ff', '#a397f2', '#7667d8', '#705fe0', '#6050cc']
            },
            itemWidth: 10,
        },
        series: [
          {
            name: "hunan",
            type: "map",
            mapType: "湖南",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                textStyle: {
                  color: "#fff"
                }
              }
            }
          }
        ],
        data: [
          {name: '张家界', value: 10},
          {name: '常德市', value: 22},
          {name: '长沙市', value: },
          {name: '', value: },
          {name: '', value: },
          {name: '', value: },
          {name: '', value: },
          {name: '', value: },
          {name: '', value: },
          {name: '', value: },
          {name: '', value: },
        ]
      });
    }
  },
  mounted() {
    this.drawMap();
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20px;
  padding: 30px 40px 20px;
  background: #fff;
  .pagination {
    padding-top: 15px;
  }
}
</style>