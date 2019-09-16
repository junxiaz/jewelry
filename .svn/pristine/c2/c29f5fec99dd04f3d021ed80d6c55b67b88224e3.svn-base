<template>
  <div class="stock themeBg">
    <!-- 实时库存 -->
    <h2>长沙黄金城中国黄金</h2>
    
    <div class="main">
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

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="myStyle" 
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'48px'}"
      >
        <el-table-column prop="productName" label="品名"></el-table-column>
        <el-table-column prop="store" label="应存"> </el-table-column>
        <el-table-column prop="storage" label="入库"></el-table-column>
        <el-table-column prop="place" label="出库"></el-table-column>
        <el-table-column prop="balance" label="结余"></el-table-column>
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
  name:"stock",
  data() {
      return {
        params:{pageNo:1,pageSize:10},
        total:7, 
        form:{
          dateTime:"2019-07-01",
          region: '0'
        },
        tableData: [
          {productName:"黄金项链手链",store:"21",storage:50,place:33,balance:15},
          {productName:"黄金戒指",store:"32",storage:50,place:33,balance:15},
          {productName:"黄金耳饰",store:"45",storage:50,place:33,balance:15},
          {productName:"黄金手镯",store:"666",storage:50,place:33,balance:15},
          {productName:"2D铺货",store:"4545",storage:50,place:33,balance:15},
          {productName:"916",store:"65",storage:50,place:33,balance:15},
          {productName:"戒指",store:"50",storage:50,place:33,balance:15},
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
.stock{
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