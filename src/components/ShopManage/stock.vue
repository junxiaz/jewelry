<template>
  <div class="stock themeBg">
    <!-- 实时库存 -->
    <h2>长沙黄金城中国黄金</h2>
    
    <div class="main">
      <!-- 表单 -->
      <el-form ref="form" :model="form" class="formStyle myStyle" :inline="true" size="medium">
        <el-form-item label="品名" prop="productCode">
          <!-- <el-select v-model="form.productName" filterable placeholder="请选择品名">
            <el-option v-for="product in form.productList" :key="product.productCode" :label="product.productName" :value="product.productCode">
            </el-option>
          </el-select> -->
          <el-autocomplete v-model="form.productName" placeholder="请输入品名" :debounce=0 style="width:230px;"
                          :fetch-suggestions="((queryString, cb)=>{querySearch(queryString, cb,'product')})" 
                          @select="((item) => {handleSelect(item,'product')})" >
          </el-autocomplete>
        </el-form-item>
        <!-- <el-form-item label="店名" prop="shopCode">
          <el-autocomplete v-model="form.shopName" placeholder="请输入店名" :debounce=0 style="width:230px;"
                          :fetch-suggestions="((queryString, cb)=>{querySearch(queryString, cb,'shop')})" 
                          @select="((item) => {handleSelect(item,'shop')})" >
          </el-autocomplete>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="initEasyTable()">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="myStyle" v-loading="loading"
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'48px'}"
      >
        <el-table-column prop="shopName" label="门店名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="lastSurplusCount" label="上日结余"></el-table-column>
        <el-table-column prop="upperCabinetCount" label="上柜"></el-table-column>
        <el-table-column prop="saleCount" label="销售"></el-table-column>
        <el-table-column prop="outCount" label="调出"></el-table-column>
        <el-table-column prop="nowSurplusCount" label="当前结余"> </el-table-column>
        <!-- <el-table-column prop="productCode" label="产品编号"></el-table-column> -->
        <!-- <el-table-column prop="shopCode" label="门店编码"></el-table-column> -->
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
import { reqRealTimeStatisticsInfo,reqProductOPT,reqShopOPT } from "@/api";
export default {
  name:"stock",
  data() {
      return {
        loading:true,
        params:{
          pageNum: 1,
          pageSize: 10,
          productCode:"",
          shopCode:this.$store.state.shopCode,
          token: this.$store.state.token,
          userCode: this.$store.state.userCode,
        },
        total:0, 
        form:{
          productName:"",
          productCode:"",
          shopName: '',
          shopCode: '',
          productList:[],
          shopList:[]
        },
        tableData: [],
      }
    },
    methods:{
    //更改页码
      handleCurrentChange(val) {
        this.params.pageNum = val;
        this.initEasyTable();
      },

     // 初始化数据
      async initEasyTable(){
        const {params} = this
        const result = await reqRealTimeStatisticsInfo(params)
        if(result.code === '0000') {
          this.loading = false;
          this.tableData = result.datas.records
          this.total = result.datas.total
        }
      },

      //获取产品选项
      async initProductOPT(){
        const params = {
          token: this.$store.state.token,
          userCode: this.$store.state.userCode
        }
        const result = await reqProductOPT(params)
        if(result.code === '0000') {
          this.form.productList = result.datas;
        }
      },
      //获取门店选项
      async initShopOPT(){
        const params = {
          token: this.$store.state.token,
          userCode: this.$store.state.userCode
        }
        const result = await reqShopOPT(params)
        if(result.code === '0000') {
          this.form.shopList = result.datas;
        }
      },

      //带建议搜索输入框---开始
      querySearch(queryString, cb,name) {
        if(name == "product"){
          var resProduct = this.form.productList;
          var resultsProduct = queryString ? resProduct.filter(this.createFilter(queryString)) : resProduct;
          for(var i=0;i<resultsProduct.length;i++){
            resultsProduct[i].value = resultsProduct[i].productName; 
          }
          // 调用 callback 返回建议列表的数据
          cb(resultsProduct);
        }
        else if(name == "shop"){
        var resShop = this.form.shopList;
        var resultsShop = queryString ? resShop.filter(this.createFilter(queryString)) : resShop;
          for(var i=0;i<resultsShop.length;i++){
            resultsShop[i].value = resultsShop[i].shopName; 
          }
          cb(resultsShop);
        }     
             
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };

      },
      //已经选择好的关于该字段的所有信息
      handleSelect(item,name) {
        if(name == 'product'){
          this.params.productCode = item.productCode;
        }
        else if(name == 'shop'){
          this.params.shopCode = item.shopCode;
        }        
      }
      //带建议搜索输入框---结束

    },

    created(){
      this.initEasyTable();
      this.initProductOPT();
      this.initShopOPT();
    },
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