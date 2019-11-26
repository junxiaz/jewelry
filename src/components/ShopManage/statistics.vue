<template>
  <div class="statistics">
    <!-- 实时统计 -->
    <div id="dataList">
      <h2>{{$store.state.shopName}}</h2>

    <!-- 数量统计 -->
      <el-row :gutter="20" id="cardList" class="mt20">
        <el-col :span="4" v-for="(item,index) in numList" :key="index">
          <div v-if="index===0"
              :style="{'backgroundImage':'url('+item.bg+')'}" class="cardBox">
            <h3>{{item.title}}</h3>
            <p class="ellipsis"><span>{{item.number}}</span> 元/克</p>
            <p class="ellipsis"><span>{{item.money | numberStyle(",")}}</span></p>
            <img :src="item.icon" class="iconImg"/>
          </div>

          <template v-else-if="index===2">            
            <div v-if="item.money < 0" class="cardBox"
                :style="{'backgroundImage':'url('+item.bg+')'}" >
              <h3>{{item.title}}</h3>
              <p class="ellipsis"><span>{{item.number}}</span> 万
                <img v-has :src="imgUrl" @click="dialogVisible = true" alt="修改" style="cursor: pointer;"></img>
              </p>
              <p style="color:#C81212" class="ellipsis"><span>{{item.money | numberStyle(",")}} </span> 万</p>
              <img :src="item.icon" class="iconImg"/>
            </div>
            <div v-else class="cardBox"
                  :style="{'backgroundImage':'url('+earlywarnGreen+')'}" >
              <h3>{{item.title}}</h3>
              <p class="ellipsis"><span>{{item.number}}</span> 万
                <img v-has :src="imgUrl" @click="dialogVisible = true" alt="修改" style="cursor: pointer;"></img>
              </p>
              <p style="color:#008574" class="ellipsis"><span>+{{item.money | numberStyle(",")}} </span> 万</p>
              <img :src="item.icon" class="iconImg"/>
            </div>
          </template>

          <div v-else
              :style="{'backgroundImage':'url('+item.bg+')'}" class="cardBox">
            <h3>{{item.title}}</h3>
            <p class="ellipsis"><span>{{item.number}}</span> 件</p>
            <p class="ellipsis"><span>{{item.money | numberStyle(",")}}</span> 万</p>
            <p v-has class="ellipsis"><span>{{item.gramWeight}}</span> 克</p>
            <img :src="item.icon" class="iconImg"/>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <!-- 表格 -->
    <div class="tableMain mt20">
      <h2>实时统计</h2>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="myStyle mt20"
        :header-cell-style="{background: '#D1AA67',color: '#fff',fontSize: '16px',height:'48px',padding:'0 6px'}"
        :row-style="{background:'#fcfbf7'}"
      >
        <el-table-column prop="shopCode" label="门店编码" fixed="left" min-width="100"></el-table-column>
        <el-table-column prop="shopName" label="门店名称" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="productCode" label="产品编码" min-width="100"></el-table-column>
        <el-table-column prop="productName" label="产品名称" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="lastSurplusCount" label="上日结余" min-width="100"></el-table-column>
        <el-table-column prop="upperCabinetCount" label="上柜"></el-table-column>
        <el-table-column prop="outCount" label="调出"></el-table-column>
        <el-table-column prop="saleCount" label="销售"></el-table-column>
        <el-table-column prop="nowSurplusCount" label="当前结余" min-width="100"></el-table-column>
        <el-table-column prop="cost" label="成本" v-if="userTypeCode == 'UT00001'" min-width="100"></el-table-column>
        <el-table-column prop="goldenWeight" label="总重量" v-if="userTypeCode == 'UT00001'" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="marketPrice" label="市场价" v-if="userTypeCode == 'UT00001'" show-overflow-tooltip min-width="100"></el-table-column>

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

    <!-- 弹框 -->
    <el-dialog
      title="提示（单位：万元）"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="preWarning" size="medium"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="danger" @click="updateShopPrewarning">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqRealTimeStatisticsInfo, updateShopPrewarning } from "@/api";
export default {
  name:"statistics",
  data(){
    return{
      params:{
        pageNum: 1,
        pageSize: 10,
        token: this.$store.state.token,
        userCode: this.$store.state.userCode,
        shopCode: this.$store.state.shopCode
      },
      total: 0,
      usserTypeCode:"",
      tableData: [],
      imgUrl:require("./imgs/edit_icon.png"),
      earlywarnGreen: require("./imgs/earlywarnGreen_bg.png"),

      numList:[
        {title:"实时金价",number:"",money:"",gramWeight:"", bg:require("./imgs/realtimeGold_bg.png") ,icon:require("./imgs/realtimeGold_icon.png")},
        {title:"珠宝总数",number:"",money:"",gramWeight:"", bg:require("./imgs/totalJewelry_bg.png") ,icon:require("./imgs/totalJewelry_icon.png")},
        {title:"预警线",number:"",money:"",gramWeight:"", bg:require("./imgs/earlywarnRed_bg.png") ,icon:require("./imgs/earlywarn_icon.png")},
        {title:"在柜珠宝",number:"",money:"",gramWeight:"", bg:require("./imgs/cabinetJewelry_bg.png") ,icon:require("./imgs/cabinetJewelry_icon.png")},
        {title:"当天销售",number:"",money:"",gramWeight:"", bg:require("./imgs/samedaySell_bg.png") ,icon:require("./imgs/samedaySell_icon.png")},
        {title:"在库珠宝",number:"",money:"",gramWeight:"", bg:require("./imgs/libraryJewelry_bg.png") ,icon:require("./imgs/libraryJewelry_icon.png")},
      ],
      preWarning: '',
      dialogVisible: false
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
        this.params.pageNum = val;
        this.initEasyTable();
      },
      //查询
      onSubmit(formData) {
        this.initEasyTable();
      },
      //初始化数据
      async initEasyTable(){
        const {params, numList} = this
        const result = await reqRealTimeStatisticsInfo(params)
        if(result.code === '0000') {
          this.tableData = result.datas.records
          this.total = result.datas.total
          this.preWarning = result.prewarning || 0
          numList[0].number = result.glodPrice || 0
          numList[0].money = result.createTime || 0
          numList[1].number = result.totalCount || 0
          numList[1].money = result.totalPrice || 0
          numList[1].gramWeight = result.totalWeight || 0
          numList[2].number = result.prewarning || 0
          numList[2].money = result.dvalue || 0
          numList[3].number = result.counterCount || 0
          numList[3].money = result.counterPrice || 0
          numList[3].gramWeight = result.counterWeight || 0
          numList[4].number = result.saleCount || 0
          numList[4].money = result.salePrice || 0
          numList[4].gramWeight = result.saleWeight || 0
          numList[5].number = result.warehouseCount || 0
          numList[5].money = result.warehousePrice || 0
          numList[5].gramWeight = result.warehouseWeight || 0
        }

            
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      async updateShopPrewarning() {
        let datas = {}
        datas.token = this.$store.state.token
        datas.userCode = this.$store.state.userCode
        datas.shopCode = this.$store.state.shopCode
        datas.prewarning = this.preWarning * 10000 + ""
        const res = await updateShopPrewarning(datas)
        console.log(datas)
        if(res.code === '0000') {
          this.dialogVisible = false
          this.initEasyTable();
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      }
    },
    created(){
      this.userTypeCode = this.$store.state.userTypeCode;
      this.initEasyTable();
    }
  }
</script>

<style scoped lang="scss">
mark{background:none;}
.statistics{
  padding-bottom:40px;
  border-top:2px solid #D1AA67;

  #dataList{
    background:#fff;
    min-width: 1220px;
    h2{    
      padding:36px 40px 0;    
      font:700 22px/1 "NotoSansHans-Bold";
      color:#464646;
    }
    #cardList{
      padding:25px 25px 15px;
      .cardBox{
        height:219px;
        background-repeat: no-repeat;
        background-size:cover;
        background-position: center;
        border-radius: 10px;
        padding:20px 0 0 20px;
        color:#fff;
        font-family: "NotoSansHans-Regular";
        position:relative;
        h3{font:20px/1 "NotoSansHans-Regular";margin-bottom:7px;}
        p{
          font-size:14px;
          margin-top:20px;
          span{
            font:31px/1 "Arial-BoldMT";
          }
        }
        img.iconImg{
          position:absolute;
          top:16px;
          right:13px;
        }
      }
    }
  }

  .tableMain{
    min-width: 1170px;
    padding:20px 25px 16px;
    background:#fff;
    h2{
      font:700 22px/1 "";
    }
  }
}
</style>