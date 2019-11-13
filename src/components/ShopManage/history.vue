<template>
  <div class="history themeBg">
    <!-- 历史记录 -->

    <h3 class="mb24px">{{$store.state.shopName}}</h3>

    <!-- 表单 -->
      <el-form ref="form" :model="form" class="formStyle myStyle" :inline="true" size="medium">
        <el-form-item label="日期" prop="dateTime">
          <el-date-picker type="date" placeholder="选择日期" style="width:230px" 
            value-format="yyyy-MM-dd" v-model="form.dateTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="班组">
          <el-select v-model="form.region" placeholder="请选择班组" style="width:230px">
            <el-option label="A班" value="0"></el-option>
            <el-option label="B班" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 图表 -->
      <div style="border:1px solid #ccc">
        <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
      </div>
      
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
// 引入提示框和title组件和颜色标识
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')

export default {
  name:"history",
  data(){
    return {
      params:{},
      form:{
          dateTime:"2019-07-01",
          region: '0'
        },
    }
  },
  methods:{
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        legend:{
          data:['在库珠宝数量','在库珠宝成本','销售数量','销售成本'],
          icon: "circle",  
          orient:'vertical',////设置图例的文字垂直显示
          itemWidth: 8,  // 设置颜色块宽度 
          itemGap:20,////设置图例的间距，类似行高          
          x:'right',//设置图例的位置在右边
          y:'center',//设置图例的位置在垂直居中
          align: 'left',//将文字设置到颜色块的左边          
          right:60,//图例距离图表
          // left:'right',
          textStyle: {
            color:'#474747'
          },
          borderRadius:10
        },          
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        dataset: {
          source:[
            ['category','在库珠宝树量','在库珠宝成本','销售数量','销售成本'],
            ['07-01',7000,9000,4100,5890],
            ['07-02',7000,9000,12000,10300],
            ['07-03',11000,12300,14000,5890],
            ['07-04',7000,9000,4100,5890],
            ['07-05',7000,9000,4100,5890],
            ['07-06',7000,9000,4100,5890],
            ['07-07',7000,9000,4100,5890],
          ]
        },
        xAxis: {type: 'category'}, // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        yAxis: {},
        series: [
          {name:"在库珠宝数量",type:"bar",color:'#FC7C6D'},
          {name:'在库珠宝成本',type:"bar",color:'#BD8AF1'},
          {name:'销售数量',type:"bar",color:'#8590F6'},
          {name:'销售成本',type:"bar",color:'#74C0D6'}
        ]
      });
    },
    getEcharts(){
      
      // this.axios.post('',this.params)
      // .then(res =>{
      //   this.drawLine(res);
      // })
    }
  },
  mounted(){
    // this.getEcharts();
    this.drawLine();
  }
}
</script>

<style scoped lang="scss">
.history{
  h3{
    font:700 22px/1 "NotoSansHans-Bold";
    color:#464646;
    margin-bottom:24px;
  }
}
</style>