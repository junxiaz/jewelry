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
          <el-input v-model="shopForm.contact" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="shopForm.address" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="shopForm.phone" size="medium" style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="shopForm.email" size="medium" style="width:320px"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 班次信息 -->
    <classNotes title="班次信息" class="shiftsNote">
      <span class="word">(国家节假日加班时间)</span>
    </classNotes>

    <div class="shifts pl34px">
      <div class="week"><span>平日/周末加班时间</span></div>

      <el-form ref="shiftsForm" :model="shiftsForm" :inline="true" class="myStyle shifts">
        <el-form-item label="早班">
          <el-input v-model="shiftsForm.morning" size="medium" style="width:58px"></el-input>
          <el-button type="text" size="medium" style="color:#474747;">时</el-button>
        </el-form-item>

        <el-form-item label="中班">
          <el-input v-model="shiftsForm.noon" size="medium" style="width:58px"></el-input>
          <el-button type="text" size="medium" style="color:#474747">时</el-button>
        </el-form-item>

        <el-form-item label="晚班">
          <el-input v-model="shiftsForm.night" size="medium" style="width:58px"></el-input>
          <el-button type="text" size="medium" style="color:#474747">时</el-button>
        </el-form-item>
      </el-form>

      <div class="special">
        <span>特殊加班时间</span>
        <el-button icon="el-icon-plus" @click="addDialog = true">添加加班时间</el-button>
      </div>
      
      <el-table :data="tableData" border style="width: 100%" class="myStyle"
        :header-cell-style="{background: '#F5F9FF',color: '#5F9EE0 ',fontSize: '16px',height:'35px',padding:0}"
        :cell-style="{padding:0,height:'35px',color:'#474747',fontSize:'16px',lineHeight:'35px'}"
        :row-style="{height:'35px'}"
      >
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="morning" label="早班"> </el-table-column>
        <el-table-column prop="noon" label="中班"></el-table-column>
        <el-table-column prop="night" label="晚班"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit-outline" size="medium" @click="openUpdateDialog(scope.row)"></el-button>
            <el-button type="text" icon="el-icon-delete" size="medium" @click="deleteTable(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row style="margin-top:15px;">
        <el-col :span="12" :offset="12" align="right">
          <el-pagination background layout="total,prev, pager, next" class="myStyle"
            :total="3">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- 风控模型 -->
    <classNotes title="风控模型"/>
    <div class="risk pl34px">
      <el-form ref="riskForm" :model="riskForm" class="myStyle">
        <el-form-item label="风控模型">
          <el-select v-model="riskForm.risk" placeholder="请选择风控模型" size="mini" style="width:176px">
            <el-option label="风控模型一" value="shanghai"></el-option>
            <el-option label="风控模型二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 添加弹框 -->
    <el-dialog title="添加加班时间" :visible.sync="addDialog" width="30%"
      :before-close="handleClose">
      <el-form ref="addTimeForm" :model="addTimeForm" :rules="addTimeRules" class="myStyle" size="mini" label-width="90px">
        <el-form-item label="时间" prop="dateTime">
          <el-input v-model="addTimeForm.dateTime" placeholder="请输入加班日期"></el-input>
        </el-form-item>
        <el-form-item label="加班班次" prop="timeType">
          <el-select v-model="addTimeForm.timeType" placeholder="请选择加班班次" class="size-full">
            <el-option label="早班" value="0"></el-option>
            <el-option label="中班" value="1"></el-option>
            <el-option label="晚班" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加班时间" prop="specificTime">
          <el-time-picker v-model="addTimeForm.specificTime" class="size-full"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="请输入加班时间">
          </el-time-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('addTimeForm')" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitOvertime('addTimeForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹框 -->
    <el-dialog title="修改加班时间" :visible.sync="updateDialog" width="30%"
      :before-close="handleClose">
      <el-form ref="updateTimeForm" :model="updateTimeForm" class="myStyle" size="mini" label-width="80px">
        <el-form-item label="时间" prop="dateTime">
          <el-input v-model="updateTimeForm.dateTime" placeholder="请输入加班日期"></el-input>
        </el-form-item>
        <el-form-item label="早班" prop="morning">
          <el-input v-model="updateTimeForm.morning" placeholder="请输入早班时间"></el-input>
        </el-form-item>
        <el-form-item label="中班" prop="noon">
          <el-input v-model="updateTimeForm.noon" placeholder="请输入中班时间"></el-input>
        </el-form-item>
        <el-form-item label="晚班" prop="night">
          <el-input v-model="updateTimeForm.night" placeholder="请输入晚班时间"></el-input>
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
import classNotes from "@/common/classNotes"
export default {
  name:"baseInfo",
  components:{
    classNotes
  },
  data(){
    return {
      params:{pageNo:1,pageSize:10},
      total:3,
      shopForm:{
        shopName:"",
        contact:"",
        address:"",
        phone:"",
        email:"",
      },
      shiftsForm:{
        morning:"09:00",
        noon:"",
        night:""
      },
      riskForm:{
        risk:""
      },
      tableData: [
        {id:0,date: '2016-05-03',morning:'09:00',noon:'',night:'',remarks:"元旦"},
        {id:1,date: '2016-05-03',morning:'',noon:'14:00',night:'',remarks:"清明"},
        {id:2,date: '2016-05-03',morning:'',noon:'',night:'21:00',remarks:"春节"},
      ],
      addDialog:false, //添加弹框
      addTimeForm:{
        dateTime:"",
        timeType:"",
        specificTime:""
      },
      addTimeRules:{
        dateTime:[
          { required: true, message: '请输入加班日期', trigger: 'blur' },
        ],
        timeType:[          
          { required: true, message: '请选择班次类型', trigger: 'change' },
        ],
        specificTime:[          
          { required: true, message: '请输入具体时间', trigger: 'blur' },
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
    }
  },
  methods:{
    //确认弹框是否关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 取消添加弹框
    closeDialog(formName){
      if(formName == "addTimeForm"){
        this.addDialog = false;
      }
      else if(formName == "updateTimeForm"){
        this.updateDialog = false;
      }
      this.$refs[formName].resetFields();
    },

    //添加加班时间
    submitOvertime(formName) {
      if(formName == "addTimeForm"){
        this.$refs[formName].validate((valid) => {
          if (valid) {      
            // this.axios.post('/api/process/createProcess',formName)
            // .then(res => {
            //   if( res.status == 200){
            //     this.$message({
            //       message: '恭喜你，数据添加成功',
            //       type: 'success',
            //       offset:100
            //     });
                this.addDialog = false;
            //     this.initData();
            //   }
            //   this.$refs[formName].resetFields();//重置            
            // })
          } else {
            this.$message({
              message: '请输入完整信息再确认',
              type: 'warning',
              duration:2000,
              offset:100
            });
            return false;
          }
        });

      }
      else if(formName == "updateTimeForm"){
        // this.axios.post('/api/process/createProcess',formName)
            // .then(res => {
            //   if( res.status == 200){
            //     this.$message({
            //       message: '恭喜你，数据修改成功',
            //       type: 'success',
            //       offset:100
            //     });
                this.updateDialog = false;
            //     this.initData();
            //   }
            //   this.$refs[formName].resetFields();//重置            
            // })
      }
    },

    // 打开修改弹框
    openUpdateDialog(formData){
      this.updateDialog = true;
      this.updateTimeForm.dateTime = formData.date;
      this.updateTimeForm.morning = formData.morning;
      this.updateTimeForm.noon = formData.noon;
      this.updateTimeForm.night = formData.night;
      this.updateTimeForm.remarks = formData.remarks;
      // this.axios.post('/api/process/listProcess',formData)
      // .then(res => {
      // })  
      // .catch(err =>{
      //   this.loading = true;
      //   this.$message.error('服务器响应失败');
      //   console.log(err);
      // })
    },  

    //删除表格信息
    deleteTable(id){
      this.$confirm('确认要删除该信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {          
      // this.axios.post('/api/process/createProcess',id)
            // .then(res => {
            //   if( res.status == 200){
            //     this.$message({
            //       message: '删除成功',
            //       type: 'success',
            //       offset:100
            //     });
            //     this.initData();
            //   }   
            // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
      height:24x;
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