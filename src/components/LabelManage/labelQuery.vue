<template>
  <div class="label-query bt2">
    <!-- 标签查询 -->
    <h2>{{$store.state.shopName}}</h2>

    <div class="main">
      <classNotes title="查询详情"/>   

      <!-- 表单 -->
      <el-form ref="form" :inline="true" :model="params" class="mt18px myStyle" size="medium">
        <el-form-item label="状态">
          <el-select v-model="params.status" placeholder="请选择状态" style="width:180px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="初始化" value="0"></el-option>
            <el-option label="已入库" value="1"></el-option>
            <el-option label="已上柜" value="2"></el-option>
            <el-option label="异常" value="3"></el-option>
            <el-option label="已调出" value="4"></el-option>
            <el-option label="已销售" value="5"></el-option>
            <el-option label="已退货" value="6"></el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="产品名称">
          <el-select v-model="params.productCode" placeholder="请选择产品名称" style="width:180px;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in formList.productOPT" :key="index" :label="item.productName" :value="item.productCode"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="params.barcode" placeholder="请输入条码" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始日期" v-model="params.startTime" style="width: 230px;"></el-date-picker>
          <span style="color:#474747">~</span>
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束日期" v-model="params.endTime" style="width: 230px;"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="onSubmit(params)" size="medium">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%;margin-top:10px;" class="mt30px myStyle"
        :header-cell-style="{background: '#D1AA67',color: '#fff',fontSize: '16px',height:'48px',padding:'0 6px'}"
        :row-style="{background:'#fcfbf7'}"
      >
        <el-table-column prop="brand" label="品牌" show-overflow-tooltip fixed="left" min-width="100"> </el-table-column>
        <el-table-column prop="shopName" label="门店" show-overflow-tooltip min-width="140"></el-table-column>
        <el-table-column prop="barcode" label="射频编码" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="othercode" label="原始编码" show-overflow-tooltip min-width="140"></el-table-column> 
        <el-table-column prop="productName" label="产品名称" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="technology" label="小类" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="weight" label="件重" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="goldenWeight" label="金重" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="salesModel" label="出售方式" min-width="100"></el-table-column>
        <el-table-column prop="cost" label="售价"></el-table-column>
        <el-table-column prop="certificate" label="证书" min-width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="createTime" label="入库时间" min-width="140"></el-table-column>
        <el-table-column prop="tagStatus" label="标签状态" min-width="100"></el-table-column>
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
import { reqLabelInfo, reqProductOPT } from "@/api";
export default {
  name:"labelQuery",
  components:{
    classNotes
  },
  data(){
    return {
      params:{
        pageNum: 1,
        pageSize: 10,
        token: this.$store.state.token,
        userCode: this.$store.state.userCode,
        productCode: '',
        status: '',
        startTime: '',
        endTime: '',
        barcode: '',
      },
      total: 0,
      tableData: [],
      formList: {
        productOPT: []
      }
    }
  },
  methods: {
    //页码
    handleCurrentChange(val) {
      this.params.pageNum = val;
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
    },
    //初始化产品选项
    async initProductOPT(){
      const {token, userCode} = this
      const result = await reqProductOPT({token, userCode})
      if(result.code === '0000') {
        this.formList.productOPT = result.datas
      }
    }
  },
  created(){
    this.initEasyTable();
    this.initProductOPT();
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