<template>
  <div class="statistics">
    <!-- 实时统计 -->
    
    <h2>长沙黄金城中国黄金</h2>

    <!-- 数量统计 -->
    <el-row class="count" type="flex" justify="space-between">
      <el-col :span="4" :class="'style'+index" align="left" v-for="(item,index) in numList" :key="index">
        <h5>{{item.title}}</h5>
        <p><span>{{item.number}}</span> 件
          <img :src="imgUrl" @click="updata(item.number)" alt="修改"></img>
        </p>
        <p>
          <span>{{item.money | numberStyle(",")}}</span> 元
          <img :src="imgUrl" @click="updata(item.money)" alt="修改"></img>
        </p>
      </el-col>

    </el-row>

    <div class="tableMain">
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="myStyle"
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'48px',padding:'0 6px'}"
      >
        <el-table-column prop="position" label="位置"></el-table-column>
        <el-table-column prop="jewelryNum" label="珠宝数量"> </el-table-column>
        <el-table-column prop="cost" label="成本"></el-table-column>
        <el-table-column prop="status" label="设备状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">无</span>
            <span v-else-if="scope.row.status == 1">正常</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row style="margin-top:15px;">
        <el-col :span="12" :offset="12" align="right">
          <el-pagination background layout="total,prev, pager, next" class="myStyle"
            @current-change="handleCurrentChange"
            :page-size="params.pageSize" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    

  </div>
</template>

<script>
export default {
  name:"statistics",
  data(){
    return{  
      params:{pageNo:1,pageSize:10},
      total:5,    
      imgUrl:"../../../static/images/edit_icon.png",
      numList:[
        {title:"珠宝总数",number:"1100",money:"11000000"},
        {title:"预警线",number:"80000",money:"+30000"},
        {title:"在库珠宝",number:"100",money:"1000000"},
        {title:"在柜珠宝",number:"1000",money:"1000000"},
        {title:"当天销售",number:"100",money:"100000"},
      ],
      tableData: [
        {position: '仓库一',jewelryNum: '1000',cost:"100000",status: 0},
        {position: '黄金柜1',jewelryNum: '400',cost:"400000",status: 1},
        {position: '黄金柜2',jewelryNum: '900',cost:"9800000",status: 1},
        {position: '黄金柜3',jewelryNum: '900',cost:"98000",status: 0},
        {position: '黄金柜4',jewelryNum: '500',cost:"59000",status: 0},
      ]
    }
  },
  filters:{
    numberStyle(number,str){
      return (number).toString().replace(/\B(?=(\d{4})+(?!\d))/g, str);
    }
  },
  methods:{
    //更改页码
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.initData();
    },
    updata(){
      this.$message({
          showClose: true,
          message: '此功能暂未开发，敬请期待',
          type: 'warning'
        });
    },

     // 初始化数据
    initData(){
      // this.axios.post('/api/process/listProcess',this.params)
      // .then(res => {
      //   if( res.data.code == "0000"){
      //     this.loading = false;
      //     this.tableData = res.data.list;
      //     this.tableData.map((item,index)=>{
      //       var pageData = res.data.page;
      //       this.tableData[index].number = (pageData.pageNo-1)*pageData.pageSize + index +1;          
      //     });
      //     this.total = res.data.page.totalRecord;
      //   }
      // })  
      // .catch(err =>{
      //   this.loading = true;
      //   this.$message.error('服务器响应失败');
      //   console.log(err);
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.statistics{
  background:#fff;
  padding-bottom:40px;
  h2{    
    padding:36px 40px 0;    
    font:700 22px/1 "NotoSansHans-Bold";
    color:#464646;
  }

  .count{
    display: flex;
    border-bottom:1px solid #DEDEDE;
    margin-top:45px;
    margin-bottom:40px;
    padding:0 0 36px 40px;
    >.el-col{
      border-right:1px solid #DEDEDE;
      font:16px/1 "NotoSansHans-Medium";
      h5{color:#646464;}
      span{font-size:32px;word-wrap : break-word;}
      p{
        cursor: pointer;
        img{
          display: none;
          vertical-align: bottom;
        }
      }
      p:hover img{display: inline-block;}
      p:nth-child(2){margin:27px 0 17px 0;}
    }
    .style0{color:#373A5B}
    .style1{color:#00AAEA;}
    .style2{color:#7C51C8;}
    .style3{color:#E2A700;}
    .style4{color:#FE7355;border:0;}
  }

  .tableMain{
    margin:40px 160px 0 100px;
  }
}
</style>