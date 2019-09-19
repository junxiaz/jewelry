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
        <el-table-column prop="createBy" label="createBy"></el-table-column>
        <el-table-column prop="createTime" label="createTime"></el-table-column>
        <el-table-column prop="handoverDate" label="handoverDate" width="280"></el-table-column>
        <el-table-column prop="handoverType" label="handoverType"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="lastSurplusCount" label="lastSurplusCount"></el-table-column>
        <el-table-column prop="nowSurplusCount" label="nowSurplusCount"></el-table-column>
        <el-table-column prop="outCount" label="outCount"></el-table-column>
        <el-table-column prop="productCode" label="productCode"></el-table-column>
        <el-table-column prop="productName" label="productName"></el-table-column>
        <el-table-column prop="saleCount" label="saleCount"></el-table-column>
        <el-table-column prop="shopCode" label="shopCode"></el-table-column>
        <el-table-column prop="shopName" label="shopName"></el-table-column>
        <el-table-column prop="updateBy" label="updateBy"></el-table-column>
        <el-table-column prop="updateTime" label="updateTime"></el-table-column>
        <el-table-column prop="upperCabinetCount" label="upperCabinetCount"></el-table-column>
        <!-- <el-table-column prop="position" label="位置"></el-table-column>
        <el-table-column prop="jewelryNum" label="珠宝数量"> </el-table-column>
        <el-table-column prop="cost" label="成本"></el-table-column>
        <el-table-column prop="status" label="设备状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">无</span>
            <span v-else-if="scope.row.status == 1">正常</span>
          </template>
        </el-table-column> -->
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
import { mapState } from "vuex";
import { reqStatisticsInfo } from "@/api";
export default {
  name:"statistics",
  data(){
    return{
      params:{
        pageNo: 1,
        pageSize: 10,
        token: this.$store.state.token,
        userCode: this.$store.state.userCode
      },
      total: 0,
      tableData: [],
      imgUrl:"../../../static/images/edit_icon.png",
      numList:[
        {title:"珠宝总数",number:"1100",money:"11000000"},
        {title:"预警线",number:"80000",money:"+30000"},
        {title:"在库珠宝",number:"100",money:"1000000"},
        {title:"在柜珠宝",number:"1000",money:"1000000"},
        {title:"当天销售",number:"100",money:"100000"},
      ],
    }
  },
  filters:{
    numberStyle(number,str){
      return (number).toString().replace(/\B(?=(\d{4})+(?!\d))/g, str);
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
        const result = await reqStatisticsInfo(params)
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