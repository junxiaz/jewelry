<template>
  <div class="inventoryInfo themeBg">
    <!-- 盘点信息 -->
    <h2 class="mb24px">长沙黄金城中国黄金</h2>
    
    <div class="main">
      <!-- 表单 -->
      <el-form ref="form" :model="form" class="formStyle myStyle" :inline="true" size="medium">
        <el-form-item label="日期" prop="dateTime">
          <el-date-picker v-model="form.dateTime" type="date" placeholder="选择日期" style="width:230px"></el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="myStyle"
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'48px',padding:'0 6px'}"
      >
        <el-table-column prop="productName" label="品名"></el-table-column>
        <el-table-column prop="balance" label="上日结余"> </el-table-column>
        <el-table-column prop="cabinet" label="上柜"></el-table-column>
        <el-table-column prop="callOut" label="调出"></el-table-column>
        <el-table-column prop="sell" label="出售"> </el-table-column>
        <el-table-column prop="allBalance" label="结余"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row style="margin-top:15px;">
        <el-col :span="12" :offset="12" align="right">
          <el-pagination background class="myStyle"
            layout="total,prev, pager, next" 
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
  name:"inventoryInfo",
  data() {
      return {
        params:{pageNo:1,pageSize:10},
        total:7, 
        form:{
          dateTime:""
        },
        tableData: [
          {productName:"戒指",store:"50",storage:50,callOut:23,sell:33,allBalance:15},
          {productName:"吊坠",balance:"79",cabinet:45,callOut:23,sell:33,allBalance:6},
          {productName:"手镯",balance:"16",cabinet:16,callOut:23,sell:33,allBalance:16},
          {productName:"手链",balance:"6",cabinet:6,callOut:6,sell:6,allBalance:6},
          {productName:"项链",balance:"23",cabinet:50,callOut:23,sell:33,allBalance:23},
          {productName:"耳钉",balance:"44",cabinet:5,callOut:23,sell:33,allBalance:15},
          {productName:"耳环",balance:"58",cabinet:23,callOut:23,sell:33,allBalance:12},
        ]
      }
    },
    methods:{
    //更改页码
      handleCurrentChange(val) {
        this.params.pageNo = val;
        this.initData();
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
.inventoryInfo{
  h2{
    font:700 22px/1 "NotoSansHans-Bold";
    color:#464646;
  }

  .main{
    .formStyle{
      margin-top:24px;
    }
  }
}
</style>