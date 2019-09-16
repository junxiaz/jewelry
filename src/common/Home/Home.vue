<template>
  <div class="container">
    <!-- 首页 -->
    
    <!-- 搜索条件 myStyle,homePage样式见style.css-->
    <div class="search">
      <el-form :inline="true" :model="formInline" ref="cityForm" class="demo-form-inline myStyle homePage">
        <el-form-item label="城市">
          <el-select v-model="formInline.city" placeholder="城市" size="large" style="width:140px;">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formInline)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border fit class="myStyle"
        :header-cell-style="{background: '#705FE0',color: '#fff',fontSize: '16px',height:'50px',padding:'0 6px'}"
        style="width: 100%">
        <el-table-column fixed prop="shopName" label="店名"></el-table-column>
        <el-table-column prop="stock" label="库存"></el-table-column>
        <el-table-column prop="province" label="预警">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '-1'">
              -{{scope.row.province}}
            </span>
            <span v-else>
              +{{scope.row.province}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column fixed="right" label="操作" width="210">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleClick(scope.row)">查看详情</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-row style="margin-top:15px;">
      <el-col :span="12" :offset="12" align="right">
        <el-pagination background class="myStyle"
          layout="total,prev, pager, next"
          :page-size="params.pageSize"  :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        params:{pageNo:1,pageSize:10,processName:""},
        total:20,
        // tableData: [
        //   {shopName:"黄金城中中国黄金",stock:"21",province:"300",contact:"小张",phone:"13412341234",status:"0"},
        //   {shopName:"周大福",stock:"32",province:"10",contact:"小李",phone:"13412341234",status:"-1"},
        //   {shopName:"周生生",stock:"45",province:"4000",contact:"小红",phone:"13412341234",status:"0"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"小明",phone:"13412341234",status:"-1"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"李红",phone:"13412341234",status:"0"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"王强",phone:"13412341234",status:"-1"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"丽丽",phone:"13412341234",status:"0"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"李潇",phone:"13412341234",status:"0"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"曾聪",phone:"13412341234",status:"0"},
        //   {shopName:"老凤祥",stock:"666",province:"100",contact:"小露",phone:"13412341234",status:"0"},
        // ],
        tabelData: $store.shopInfo,
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    computed: {
      ...mapState(['shopInfo'])
    },
    methods: {
       //页码
      handleCurrentChange(val) {
        this.params.pageNo = val;
        this.initEasyTable();
      },
      //查询
      onSubmit(formData) {
        console.log(formData)
      },
      
      //查看详情
      handleClick(row) {
        console.log(row);
        this.$message({
          showClose: true,
          message: '暂无详情，敬请期待',
          type: 'warning'
        });
      },

      //初始化数据
      initEasyTable(){
        this.axios.post('/api/process/listProcess',this.params)
        .then(res => {
          if( res.status == 200){
            console.log(res);
            // this.loading = false;
            // this.tableData = res.data.list;
            // this.tableData.map((item,index)=>{
            //   var pageData = res.data.page;
            //   this.tableData[index].number = (pageData.pageNo-1)*pageData.pageSize + index +1;          
            // });
            // this.total = res.data.page.totalRecord;
          }
        })  
        .catch(err =>{
          this.loading = true;
          this.$message.error('服务器响应失败');
          console.log(err);
        })
      }
    },
    mounted(){
      // this.initEasyTable();
      this.$store.dispatch('getShopInfo')
    }
  }
</script>

<style lang="scss" scoped>
  // @import '../../common/style/element-variables.scss';
  .container {
    margin-top: 20px;
    padding: 30px 40px 20px;
    background: #fff;
    .pagination {
      padding-top: 15px;
    }
  }
</style>