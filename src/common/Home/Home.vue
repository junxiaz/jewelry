<template>
  <div class="container">
    <!-- 首页 -->
    
    <!-- 搜索条件 myStyle,homePage样式见style.css-->
    <div class="search">
      <el-form size="medium" :inline="true" :model="params" ref="cityForm" class="demo-form-inline myStyle homePage">
        <el-form-item label="城市">
          <el-select v-model="params.city" placeholder="城市" style="width:140px;">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(params)">查询</el-button>
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
        <el-table-column prop="prewarning" label="预警">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.status == '-1'">
              -{{scope.row.province}}
            </span>
            <span v-else>
              +{{scope.row.province}}
            </span>
          </template> -->
        </el-table-column>
        <el-table-column prop="contacts" label="联系人"></el-table-column>
        <el-table-column prop="contactNumber" label="联系电话"></el-table-column>
        <el-table-column prop="ccMails" label="ccMails"></el-table-column>
        <el-table-column prop="city" label="city"></el-table-column>
        <el-table-column prop="cost" label="cost"></el-table-column>
        <el-table-column prop="county" label="county"></el-table-column>
        <el-table-column prop="endTime" label="endTime"></el-table-column>
        <el-table-column prop="handoverTime" label="handoverTime"></el-table-column>
        <el-table-column prop="shopCode" label="shopCode"></el-table-column>
        <el-table-column prop="startTime" label="startTime"></el-table-column>
        <el-table-column prop="toMails" label="toMails"></el-table-column>
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
  import { reqShopInfo } from "@/api";
  export default {
    data() {
      return {
        params:{
          pageNo: 1,
          pageSize: 10,
          token: this.$store.state.token,
          userCode: this.$store.state.userCode,
          city: ''
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
      
      //查看详情
      handleClick(row) {
        this.$message({
          showClose: true,
          message: '暂无详情，敬请期待',
          type: 'warning'
        });
      },

      //初始化数据
      async initEasyTable(){
        const {params} = this
        const result = await reqShopInfo(params)
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