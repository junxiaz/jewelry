<template>
  <div class="label-query">
    <!-- 标签查询 -->
    <h2>长沙黄金城中国黄金</h2>

    <div class="main">
      <classNotes title="查询详情"/>   

      <!-- 表单 -->
      <el-form ref="form" :inline="true" :model="params" class="mt18px myStyle" size="medium">
        <el-form-item label="位置">
          <el-select v-model="params.position" placeholder="请选择位置" style="width:180px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="仓库" value="1"></el-option>
            <el-option label="黄金柜" value="2"></el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="产品种类">
          <el-select v-model="params.productType" placeholder="请选择产品类型" style="width:180px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="手链" value="1"></el-option>
            <el-option label="戒指" value="2"></el-option>
            <el-option label="耳饰" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工艺">
          <el-select v-model="params.art" placeholder="请选择工艺" style="width:180px;">
            <el-option label="全部" value="0"></el-option>
            <el-option label="3D" value="1"></el-option>
            <el-option label="999足金" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="params.barCode" placeholder="请输入条码" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker type="date" placeholder="开始日期" v-model="params.storageStartTime" style="width: 230px;"></el-date-picker>
          <span style="color:#474747">~</span>
          <el-time-picker placeholder="结束日期" v-model="params.storageEndTime" style="width: 230px;"></el-time-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(params)" size="medium">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%;margin-top:10px;" class="mt30px myStyle"
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'48px',padding:'0 6px'}"
      >
        <el-table-column prop="barcode" label="barCode"></el-table-column>
        <el-table-column prop="certificate" label="certificate"> </el-table-column>
        <el-table-column prop="cost" label="cost"></el-table-column>
        <el-table-column prop="counterCode" label="counterCode"></el-table-column>
        <el-table-column prop="goldenWeight" label="goldenWeight"></el-table-column>
        <el-table-column prop="libraryAge" label="libraryAge"></el-table-column>
        <el-table-column prop="productCode" label="productCode"></el-table-column>
        <el-table-column prop="shopCode" label="shopCode"></el-table-column>
        <el-table-column prop="status" label="status"></el-table-column>
        <el-table-column prop="tagEpc" label="tagEpc"></el-table-column>
        <el-table-column prop="tagTid" label="tagTid"></el-table-column>
        <el-table-column prop="warehouseCode" label="warehouseCode"></el-table-column>
        <el-table-column prop="weight" label="weight"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row style="margin-top:15px;">
        <el-col :span="12" :offset="12" align="right">
          <el-pagination background class="myStyle"
            layout="total,prev, pager, next" 
            @current-change="handleCurrentChange"
            :page-size="params.pageSize"  :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import classNotes from '@/common/classNotes'
import { mapState } from "vuex";
import { reqLabelInfo } from "@/api";
export default {
  name:"labelQuery",
  components:{
    classNotes
  },
  data(){
    return {
      params:{
        pageNo: 1,
        pageSize: 10,
        token: this.$store.state.token,
        userCode: this.$store.state.userCode,
        city: '',
        position: '0',
        productType: '0',
        art: '',
        storageStartTime: '',
        storageEndTime: false,
        barCode: '',
      },
      total: 0,
      tableData: []
    }
  },
  methods: {
    //页码
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.initEasyTable();
    },
    //查询
    onSubmit(formData) {
      this.initEasyTable();
    },
    //初始化数据
    async initEasyTable(){
      const {params} = this
      const result = await reqLabelInfo(params)
      if(result.code === '0000') {
        this.tableData = result.datas.records
        this.total = result.datas.total
      }
    }
  },
  created(){
    this.initEasyTable();
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