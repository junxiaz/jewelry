<template>
  <div class="baseInfo themeBg">
    <!-- 基本信息 -->

    <!-- 门店信息 -->
    <classNotes title="门店信息"/>
    <div class="shop pl34px">      
      <el-form ref="shopForm" :model="shopForm" class="myStyle" 
        :inline="true" label-position="right" label-width="76px">
        <el-form-item label="门店名称">
          <el-input v-model="shopForm.shopName" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="shopForm.contacts" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="shopForm.county" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="shopForm.contactNumber" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="收件邮箱">
          <el-input v-model="shopForm.toMails" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="抄送邮箱">
          <el-input v-model="shopForm.ccMails" size="medium" style="width:320px"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 班次信息 -->
    <classNotes title="班次信息" class="shiftsNote">
      <span class="word">(国家节假日加班时间)</span>
    </classNotes>

    <div class="shifts pl34px">
      <div class="week"><span>平日交接班时间</span></div>

      <el-form ref="shiftsForm" :model="shopForm" :inline="true" class="myStyle shifts">
        <el-form-item label="早班">
          <el-time-picker v-model="shopForm.startTime" size="medium" style="width:78px"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" 
            placeholder="" prefix-icon="noIcon" :clearable="false">
          </el-time-picker> 
          <!-- <el-input v-model="shopForm.startTime" size="medium" style="width:78px"></el-input> -->
          <el-button type="text" size="medium" style="color:#474747;">时</el-button>
        </el-form-item>

        <el-form-item label="中班">
          <el-time-picker v-model="shopForm.handoverTime" size="medium" style="width:78px"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="" prefix-icon="noIcon" :clearable="false">
          </el-time-picker> 
          <!-- <el-input v-model="shopForm.handoverTime" size="medium" style="width:78px"></el-input> -->
          <el-button type="text" size="medium" style="color:#474747">时</el-button>
        </el-form-item>

        <el-form-item label="晚班">
          <el-time-picker v-model="shopForm.endTime" size="medium" style="width:78px"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="" prefix-icon="noIcon" :clearable="false">
          </el-time-picker> 
          <!-- <el-input v-model="shopForm.endTime" size="medium" style="width:78px"></el-input> -->
          <el-button type="text" size="medium" style="color:#474747">时</el-button>
        </el-form-item>
      </el-form>

      <div class="special">
        <span>特殊交接班时间</span>
        <el-button icon="el-icon-plus" @click="addDialog = true">添加交接班时间</el-button>
      </div>
      
      <!-- 表格 -->
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" class="myStyle"
        :header-cell-style="{background: '#F5F9FF',color: '#5F9EE0 ',fontSize: '16px',height:'35px',padding:0}"
        :cell-style="{padding:0,height:'35px',color:'#474747',fontSize:'16px',lineHeight:'35px'}"
        :row-style="{height:'35px'}"
      >
        <el-table-column prop="specialDate" label="日期"></el-table-column>
        <el-table-column prop="startTime" label="早班"> </el-table-column>
        <el-table-column prop="handoverTime" label="中班"></el-table-column>
        <el-table-column prop="endTime" label="晚班"></el-table-column>
        <el-table-column prop="dateDesc" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" size="medium" @click="openUpdateDialog(scope.row,scope.$index)"></el-button>
            <el-button type="text" icon="el-icon-delete" size="medium" @click="deleteTable(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row style="margin-top:15px;">
        <el-col :span="12" :offset="12" align="right">
          <el-pagination background layout="total,prev, pager, next" class="myStyle"
          @current-change="handleCurrentChange"
            :page-size="pageSize" :current-page="currentPage"
            :total="tableData.length">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- 风控模型 -->
    <classNotes title="风控模型" v-show="false"/>
    <div class="risk pl34px">
      <el-form  v-show="false" ref="riskForm" :model="riskForm" class="myStyle">
        <el-form-item label="风控模型">
          <el-select v-model="riskForm.risk" placeholder="请选择风控模型" size="mini" style="width:176px">
            <el-option label="风控模型一" value="shanghai"></el-option>
            <el-option label="风控模型二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="submitAll()" size="medium" v-has>提交</el-button>
    </div>

    <!-- 添加弹框 -->
    <el-dialog title="添加交接班时间" :visible.sync="addDialog" width="30%"
      :before-close="handleClose">
      <el-form ref="addTimeForm" :model="addTimeForm" :rules="addTimeRules" class="myStyle" size="mini" label-width="90px">
        <el-form-item label="日期" prop="dateTime">
          <el-date-picker v-model="addTimeForm.dateTime" type="date" placeholder="选择日期" @change="checkDate(addTimeForm.dateTime,'add')"></el-date-picker>
        </el-form-item>
        <el-form-item label="早班" prop="morning">
          <el-time-picker v-model="addTimeForm.morning" 
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="请输入早班时间">
          </el-time-picker> 
        </el-form-item>
        <el-form-item label="中班" prop="noon">
          <el-time-picker v-model="addTimeForm.noon" 
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="请输入中班时间">
          </el-time-picker> 
        </el-form-item>
        <el-form-item label="晚班" prop="night">
          <el-time-picker v-model="addTimeForm.night" 
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="请输入晚班时间">
          </el-time-picker>          
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" :rows="2" placeholder="请输入备注内容" v-model="addTimeForm.remarks" resize="none"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('addTimeForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitOvertime('addTimeForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹框 -->
    <el-dialog title="修改交接班时间" :visible.sync="updateDialog" width="30%">
      <el-form ref="updateTimeForm" :model="updateTimeForm"  :rules="addTimeRules" class="myStyle" size="mini" label-width="80px">
        <el-form-item label="时间" prop="dateTime">
          <el-date-picker v-model="updateTimeForm.dateTime" type="date" placeholder="请输入加班日期" @change="checkDate(updateTimeForm.dateTime,'update')"></el-date-picker>
        </el-form-item>
        <el-form-item label="早班" prop="morning">
          <el-time-picker v-model="updateTimeForm.morning" placeholder="请输入早班时间"
                          :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="中班" prop="noon">
          <el-time-picker v-model="updateTimeForm.noon" placeholder="请输入中班时间"
                          :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="晚班" prop="night">
          <el-time-picker v-model="updateTimeForm.night" placeholder="请输入晚班时间"
                          :picker-options="{ selectableRange: '00:00:00 - 23:59:59'}">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="备注" prop="timeType">
          <el-input type="textarea" :rows="2" placeholder="请输入备注内容" v-model="updateTimeForm.remarks" resize="none"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('updateTimeForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitOvertime('updateTimeForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { reqShopDetails, updateShopDetails,reqGetShopInfoSpecialTime } from '@/api'
import classNotes from "@/common/classNotes"
export default {
  name:"baseInfo",
  components:{
    classNotes
  },
  data(){
    return {
      initParams: {
        token: this.$store.state.token,
        userCode: this.$store.state.userCode,
        shopCode: this.$store.state.shopCode
      },
      currentPage:1,
      pageSize:10,
      shopForm: {},
      shiftsForm:{},
      riskForm:{
        risk:""
      },
      tableData: [],
      addDialog:false, //添加弹框
      addTimeForm:{
        dateTime:"",
        morning:"",
        noon:"",
        night:"",
        remarks:""
      },
      addTimeRules:{
        dateTime:[
          { required: true, message: '请输入加班日期', trigger: 'change' },
        ],
        morning: [
          { type: 'date', required: true, message: '请填早班', trigger: 'change' }
        ],
        noon: [
          { type: 'date', required: true, message: '请填早班', trigger: 'change' }
        ],
        night: [
          { type: 'date', required: true, message: '请填早班', trigger: 'change' }
        ]
      },
      updateDialog:false,
      updateTimeForm:{
        dateTime:"",
        morning:"",
        noon:"",
        night:"",
        remarks:""
      },
      updateId:0, //存下修改时的id
      updateDate:'',//存下修改时的日期，方便判断是否重复
    }
  },

  methods:{
    //改变页数
    handleCurrentChange(val){
      this.currentPage = val;
    },
    //确认弹框是否关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});   
      this.$refs['addTimeForm'].resetFields(); 
    },

    // 取消添加弹框
    closeDialog(formName){
      if(formName == "addTimeForm"){
        this.addDialog = false;
        this.$refs[formName].resetFields();
      }
      else if(formName == "updateTimeForm"){
        this.updateDialog = false;
      }
    },

    //检查日期是否重复
    checkDate(dates,formName){
      dates = this.formatDate(dates);      
      if(formName === 'add'){
        this.tableData.forEach((val,index) =>{
          if(val.specialDate.indexOf(dates)>-1){
            this.$message({
              message:"时间重复，请重新选择",
              type:"warning",
              offset:100
            })
            this.addTimeForm.dateTime = "";
          }
        })
      } 
      else if(formName === "update"){
        // console.log('日期',dates)
        // console.log('日期',this.updateDate)
        //修改后的时间与原来的时间不相同时要判断,相同时不用
        if(dates != this.updateDate){
          this.tableData.forEach((val,index) =>{
            if(val.specialDate.indexOf(dates)>-1){
              this.$message({
                message:"时间重复，请重新选择",
                type:"warning",
                offset:100
              })
              this.updateTimeForm.dateTime = "";
            }
          })  
        }           

      }
    },

    // 打开修改弹框
    openUpdateDialog(formData,index){
      this.updateDialog = true;
      this.updateId = (this.currentPage -1)*this.pageSize + index;
      this.updateDate = formData.specialDate; //字符，保存日期
      this.updateTimeForm.dateTime = formData.specialDate;
      var adate = formData.specialDate.split("-");
      var astartTime = [];
      var anoonTime = [];
      var aendTime = [];
      if(formData.startTime){
        astartTime = formData.startTime.split(":");
        astartTime[2] = astartTime[2] ? astartTime[2] : "00";
        this.updateTimeForm.morning = new Date(adate[0],adate[1],adate[2],astartTime[0],astartTime[1],astartTime[2]);
      }
      if(formData.handoverTime){
        anoonTime = formData.handoverTime.split(":");
        // if(!anoonTime[2]){
        //   anoonTime[2] = "00";
        // }
        anoonTime[2] = anoonTime[2] ? anoonTime[2] : "00";
        this.updateTimeForm.noon = new Date(adate[0],adate[1],adate[2],anoonTime[0],anoonTime[1],anoonTime[2]);
      }
      if(formData.endTime){
        aendTime = formData.endTime.split(":");
        aendTime[2] = aendTime[2] ? aendTime[2] : "00";
        this.updateTimeForm.night = new Date(adate[0],adate[1],adate[2],aendTime[0],aendTime[1],aendTime[2]);
      }  
      this.updateTimeForm.remarks = formData.dateDesc;
    },  

    //添加/修改加班时间
    submitOvertime(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {  
          if(formName == "addTimeForm"){
            this.addDialog = false;
            this.tableData.unshift({
              "specialDate" : this.formatDate(this.addTimeForm.dateTime),
              "startTime" : this.formatTime(this.addTimeForm.morning),
              "handoverTime" : this.formatTime(this.addTimeForm.noon),
              "endTime" : this.formatTime(this.addTimeForm.night),
              "dateDesc":this.addTimeForm.remarks,
            });
            this.$refs[formName].resetFields();
          } else if(formName == "updateTimeForm"){              
            this.updateDialog = false;
            var specialDate = "";
            var startTime = "";
            var handoverTime = "";
            var endTime = "";
            specialDate = (typeof this.updateTimeForm.dateTime) == "object" ? this.formatDate(this.updateTimeForm.dateTime) : this.updateTimeForm.dateTime; 
            startTime = (typeof this.updateTimeForm.morning) == "object" ? this.formatTime(this.updateTimeForm.morning) : this.updateTimeForm.morning; 
            handoverTime = (typeof this.updateTimeForm.noon) == "object" ? this.formatTime(this.updateTimeForm.noon) : this.updateTimeForm.noon; 
            endTime = (typeof this.updateTimeForm.night) == "object" ? this.formatTime(this.updateTimeForm.night) : this.updateTimeForm.night; 

            this.tableData[this.updateId] = {
              "specialDate" : specialDate,
              "startTime" : startTime,
              "handoverTime" : handoverTime,
              "endTime" : endTime,
              "dateDesc":this.updateTimeForm.remarks,
            }
          }

        } else {
          this.$message({
            message: '请输入完整信息再确认',
            type: 'warning',
            duration:1000,
            offset:100
          });
          return false;
        }
      });
    },

    //删除表格信息
    deleteTable(index){
      var id = (this.currentPage -1)*this.pageSize + index;//点击删除时的序号
      this.tableData.splice(index,1);
      //处理表格中的删除最后一条显示暂无数据的问题
      const totalPage = Math.ceil((this.tableData.length - 1) / this.pageSize) // 总页数
      this.currentPage = this.currentPage > totalPage ? totalPage : this.currentPage;
      this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
    },

    //提交所有数据
    submitAll(){
      this.addUpdate();
    },

     // 初始化数据
    async initData(){
      const {initParams} = this
      const result = await reqShopDetails(initParams)
      if(result.code === '0000') {
        this.shopForm = result.shop;
        var astartTime = [];
        var anoonTime = [];
        var aendTime = [];
        if(this.shopForm.startTime){
          astartTime = this.shopForm.startTime.split(":");
          this.shopForm.startTime = new Date('2019','10','21',astartTime[0],astartTime[1],astartTime[2]);
        }
        if(this.shopForm.handoverTime){
          anoonTime = this.shopForm.handoverTime.split(":");
          this.shopForm.handoverTime = new Date('2019','10','21',anoonTime[0],anoonTime[1],anoonTime[2]);
        }
        if(this.shopForm.endTime){
          aendTime = this.shopForm.endTime.split(":");
          this.shopForm.endTime = new Date('2019','10','21',aendTime[0],aendTime[1],aendTime[2]);
        }
        this.tableData = result.specialTimes;
        // this.total = result.datas.total
      }
    },

    //修改门店信息
    async addUpdate() {
      this.shopForm.startTime = this.formatTime(this.shopForm.startTime);
      // console.log(this.shopForm.startTime)
      this.shopForm.handoverTime = this.formatTime(this.shopForm.handoverTime);
      this.shopForm.endTime = this.formatTime(this.shopForm.endTime);
      let datas = {
        "ccMails": this.shopForm.ccMails,
        "city": this.shopForm.city,
        "contactNumber": this.shopForm.contactNumber,
        "contacts": this.shopForm.contacts,
        "county": this.shopForm.county,
        "endTime": this.shopForm.endTime,
        "handoverTime": this.shopForm.handoverTime,
        "shopCode": this.shopForm.shopCode,
        "shopName": this.shopForm.shopName,
        "startTime":this.shopForm.startTime,
        "toMails":this.shopForm.toMails,
        "specialTimes":this.tableData,
        "token":this.$store.state.token,
        "userCode":this.$store.state.userCode
      }
      const result = await updateShopDetails(datas);
      if(result.code === '0000') {
        this.initData();
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      } else {
        this.$message({
          message: result.msg,
          type: 'warning'
        });
      }
    },

    //日期格式化
    formatDate(d){
      if(d){
        var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        var day = d.getDate() + '' < 10 ? '0' + d.getDate() + '' : d.getDate() + '';
        return d.getFullYear() +"-"+ month +"-"+ day;
      } else {
        return "";
      }
    },
    //时间格式化
    formatTime(d){
      if(d){
        var hour = d.getHours()+"" < 10 ? "0"+d.getHours() +'' : d.getHours()+"";
        var min = d.getMinutes()+"" < 10 ? "0"+d.getMinutes() +'' : d.getMinutes()+"";
        var second = d.getSeconds()+"" < 10 ? "0"+d.getSeconds() +'' : d.getSeconds()+"";
        return hour +":"+ min +":"+ second;
      } else {
        return  "";
      }
    }

  },
  mounted() {
    this.initData()
  }
}
</script>

<style scoped lang="scss">
.pl34px{padding-left:34px;}
.baseInfo{

  .classNotes{
    .word{color:#FB6969;font:12px/1 "NotoSansHans-Regular";}
  }
  .classNotes.shiftsNote{margin-top:-5px;}

  .shop{margin-top:15px;}

  .shifts{
    >div span{font:16px/54px "NotoSansHans-Medium";color:#5F9EE0;}
    .special button{
      height:24px;
      font:12px/24px "";
      color:#fff;
      background:#5F9EE0;
      border:0;
      padding:0 6px;
      margin-left:10px;
      }
      table{
        .el-table th, .el-table td{padding:0}
      }
  }
  .risk{
    margin-top: 8px;
  }
}

</style>