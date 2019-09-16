<template>
  <div class="label-query">
    <!-- 标签查询 -->
    <h2>长沙黄金城中国黄金</h2>

    <div class="main">
      <classNotes title="查询详情"/>   

      <!-- 表单 -->
      <el-form ref="form" :model="form" class="mt18px myStyle" :inline="true" size="medium">
        <el-form-item label="位置">
          <el-select v-model="form.position" placeholder="请选择位置" style="width:180px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="仓库" value="1"></el-option>
            <el-option label="黄金柜" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品种类">
          <el-select v-model="form.productType" placeholder="请选择产品类型" style="width:180px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="手链" value="1"></el-option>
            <el-option label="戒指" value="2"></el-option>
            <el-option label="耳饰" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工艺">
          <el-select v-model="form.art" placeholder="请选择工艺" style="width:180px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="3D" value="1"></el-option>
            <el-option label="999足金" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.storageStartTime" style="width: 230px;"></el-date-picker>
          <span style="color:#474747">~</span>
          <el-time-picker placeholder="结束日期" v-model="form.storageEndTime" style="width: 230px;"></el-time-picker>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="form.barCode" placeholder="请输入条码" style="width:180px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)" size="medium">确认</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%;margin-top:10px;" class="mt30px myStyle"
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'48px',padding:'0 6px'}"
      >
        <el-table-column prop="barCode" label="条码"></el-table-column>
        <el-table-column prop="position" label="位置"> </el-table-column>
        <el-table-column prop="productType" label="产品种类"></el-table-column>
        <el-table-column prop="art" label="工艺"></el-table-column>
        <el-table-column prop="weight" label="重量"> </el-table-column>
        <el-table-column prop="money" label="成本"></el-table-column>
        <el-table-column prop="certificate" label="证书"></el-table-column>
        <el-table-column prop="storageStartTime" label="入库日期"></el-table-column>
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
import classNotes from '@/common/classNotes'
export default {
  name:"labelQuery",
  components:{
    classNotes
  },
  data(){
    return {
      params:{pageNo:1,pageSize:10},
      total:7, 
      form: {
        position: '0',
        productType: '0',
        art: '',
        storageStartTime: '',
        storageEndTime: false,
        barCode: '',
      },
      tableData: [
        {position:"仓库",productType:"戒指",art:"3D",storageStartTime:"2019/09/01",storageEndTime:"2019/09/01",barCode:"1A0001",weight:"1g",money:"300",certificate:"国家XX奖"},
        {position:"仓库",productType:"戒指",art:"999足金",storageStartTime:"2019/09/02",storageEndTime:"2019/09/01",barCode:"1A0002",weight:"500g",money:"1000",certificate:"国家XX奖"},
        {position:"黄金柜",productType:"手链",art:"999足金",storageStartTime:"2019/09/03",storageEndTime:"2019/09/01",barCode:"1A0003",weight:"23g",money:"300",certificate:"国家XX奖"},
        {position:"黄金柜",productType:"戒指",art:"999足金",storageStartTime:"2019/09/01",storageEndTime:"2019/09/01",barCode:"1A0004",weight:"66g",money:"680",certificate:"国家XX奖"},
        {position:"仓库",productType:"手链",art:"999足金",storageStartTime:"2019/09/05",storageEndTime:"2019/09/01",barCode:"1A0001",weight:"99g",money:"1800",certificate:"国家XX奖"},
        {position:"仓库",productType:"戒指",art:"3D",storageStartTime:"2019/09/01",storageEndTime:"2019/09/01",barCode:"1A0001",weight:"1g",money:"300",certificate:""},
        ]
    }
  },
  methods:{
    //更改页码
      handleCurrentChange(val) {
        this.params.pageNo = val;
        this.initData();
      },

      onSubmit(formData){
        console.log(formData)
        this.initData()
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
.mt18px{margin-top:18px;}
.label-query{
  background:#fff;
  padding:36px 84px 20px 40px;
  h2{
    font:700 22px/1 "NotoSansHans-Bold";
    color:#464646;
    margin-bottom:40px;
  }


  .main{
    padding-left:45px;
  }
}
</style>