<template>
  <div class="variety themeBg">
  <!-- 品种管理 -->
  <h2 class="mb24px">{{$store.state.shopName}}</h2>
    <div class="main">
      <el-button type="danger" size="small" @click="addDialog = true" v-has>新增</el-button>
      <el-button type="danger" size="small"  @click="openUpdateDialog" v-has>修改</el-button>
      <!-- <el-button type="danger" size="small">删除</el-button> -->

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" class="mt30px myStyle" v-loading="loading"
        :header-cell-style="{background: '#D1AA67',color: '#fff',fontSize: '16px',height:'48px'}"
        :row-style="{background:'#fcfbf7'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
        <el-table-column prop="brand" label="品牌" fixed="left" min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goldContent" label="含金量"> </el-table-column>
        <el-table-column prop="productName" label="产品类型" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="salesModel" label="销售模式" min-width="120"></el-table-column>
        <el-table-column prop="technology" label="工艺" min-width="100"></el-table-column>
      </el-table>

      <el-row style="margin-top:15px;">
        <el-col :span="12" :offset="12" align="right">
          <el-pagination background class="myStyle"
            layout="total,prev, pager, next"
            :page-size="params.pageSize" :total="total"
            @current-change="handleCurrentChange">
          </el-pagination>
        </el-col>
      </el-row>

    </div>

    <!-- 添加弹框 -->
    <el-dialog title="添加品种" :visible.sync="addDialog" width="30%"
      :before-close="((done) => {handleClose(done,'addForm')})">
      <el-form ref="addForm" :model="addForm" :rules="rules" class="myStyle" size="mini" label-width="90px" label-position="left">
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="addForm.brand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="含金量" prop="goldContent">
          <el-input v-model="addForm.goldContent" placeholder="请输入含金量"></el-input>
        </el-form-item>          
        <el-form-item label="品名" prop="productName">          
          <el-autocomplete v-model="addForm.productName" placeholder="请输入品名" :debounce=0 class="size-full"
                          :fetch-suggestions="querySearch" 
                          @select="handleSelect" >
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="销售模式" prop="salesModel">
          <el-input v-model="addForm.salesModel" placeholder="请输入销售模式"></el-input>
        </el-form-item>
        <el-form-item label="工艺" prop="technology">
          <el-input v-model="addForm.technology" placeholder="请输入工艺"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="closeDialog('addForm')" size="mini">取 消</el-button>
        <el-button type="danger" @click="addData('addForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    
    <!-- 修改弹框 -->
    <el-dialog title="修改品种" :visible.sync="updateDialog" width="30%"
      :before-close="((done) => {handleClose(done,'updateForm')})">
      <el-form ref="updateForm" :model="updateForm" :rules="rules" class="myStyle" size="mini" label-width="90px" label-position="left">
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="updateForm.brand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="含金量" prop="goldContent">
          <el-input v-model="updateForm.goldContent" placeholder="请输入含金量"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="productCode">
          <el-select v-model="updateForm.productCode" placeholder="请选择产品类型" class="size-full">
            <el-option v-for="(item,productId) in productList" :key = "productId"
                        :label="item.productName" :value="item.productCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售模式" prop="salesModel">
          <el-input v-model="updateForm.salesModel" placeholder="请输入销售模式"></el-input>
        </el-form-item>
        <el-form-item label="工艺" prop="technology">
          <el-input v-model="updateForm.technology" placeholder="请输入工艺"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="closeDialog('updateForm')" size="mini">取 消</el-button>
        <el-button type="danger" @click="addData('updateForm')" size="mini">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqListProductInfo,reqAddProductInfo,reqUpdateProductInfo,reqProductOPT } from "@/api";
import { async } from 'q';

export default {
  name:"variety",
  data() {
      return {
        loading:true,
        params:{
          pageNum: 1,
          pageSize: 10,
          token: this.$store.state.token,
          userCode: this.$store.state.userCode,
        },
        total:0,
        moreSelect: [], //多选的数据
        tableData: [],
        addDialog:false, //添加弹框
        addForm:{
          brand:"",
          goldContent:"",
          productName:"",
          salesModel:"",
          technology:"",
          token: this.$store.state.token,
          userCode: this.$store.state.userCode,
        },
        productList:[],
        updateDialog:false,
        updateForm:{
          brand:"",
          goldContent:"",
          productCode:0,
          productType:"",
          salesModel:"",
          technology:"",
          token: this.$store.state.token,
          userCode: this.$store.state.userCode,
        },

        rules:{
          brand:[
            { required: true, message: '请输入品牌', trigger: 'blur' },
          ],
          goldContent:[
            { required: true, message: '请输入含金量', trigger: 'blur' }
          ],
          productType:[          
            { required: true, message: '请选择产品类型', trigger: 'change' },
          ],
          productName:[
            { required: true, message: '请选择品名', trigger: 'blur' },
          ],
          salesModel:[          
            { required: true, message: '请输入销售模式', trigger: 'blur' },
          ],
          technology:[          
            { required: true, message: '请输入工艺', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //页码
      handleCurrentChange(val) {
        this.params.pageNum = val;
        this.initEasyTable();
      },

      //选择多个
      handleSelectionChange(val) {
        this.moreSelect = val;
      },

      // 新增 和 修改
      addData(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            if( formName == "addForm"){
              this.addDialog = false;
              this.addEasyTable(this.addForm);
              this.initEasyTable();
            }
            else if( formName == "updateForm"){
              this.updateDialog = false;
              console.log(this.updateForm)
              // this.updateEasyTable(this.updateForm);
              // this.initEasyTable();
            }
          }  

          else{
            return false;
          }
        })        
      },

      //打开修改弹框
      openUpdateDialog(){
        if(this.moreSelect.length == 0){
          this.$message({
            message: '您还未选择任何信息',
            type: 'warning'
          });
        }
        else if(this.moreSelect.length == 1){
          this.updateDialog = true;
          this.updateForm.brand = this.moreSelect[0].brand;
          this.updateForm.goldContent = this.moreSelect[0].goldContent;
          this.updateForm.productCode = this.moreSelect[0].productCode;
          // this.updateForm.productType = this.moreSelect[0].productName;
          this.updateForm.salesModel = this.moreSelect[0].salesModel;
          this.updateForm.technology = this.moreSelect[0].technology;
        }
        else{
          this.$message({
            message: '请选择其中一条进行修改',
            type: 'warning'
          });
        }
      },

      // 取消弹框并清空
      closeDialog(formName){
        if(formName == "addForm"){
          this.addDialog = false;
        }
        else if(formName == "updateForm"){
          this.updateDialog = false;
        }
        if (this.$refs[formName] !== undefined) {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          })
        }             
      },

      //确认弹框是否关闭
      handleClose(done,formName) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();         
            this.$refs[formName].clearValidate();  
          })
          .catch(_ => {});
      },

      //带建议搜索输入框---开始
      querySearch(queryString, cb) {
        var resProduct = this.productList;
        var resultsProduct = queryString ? resProduct.filter(this.createFilter(queryString)) : resProduct;
        for(var i=0;i<resultsProduct.length;i++){
          resultsProduct[i].value = resultsProduct[i].productName; 
        }
        // 调用 callback 返回建议列表的数据
        cb(resultsProduct); 
             
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };

      },
      //已经选择好的关于该字段的所有信息
      handleSelect(item) {
        console.log(item);
        this.addForm.productName = item.productName;
        // this.params.productCode = item.productCode; 
      },
      //带建议搜索输入框---结束

      //错误消息提示
      msgError(msg){
        this.$message({
          message: msg,
          type: 'error'
        });
      },

      //添加数据的接口
      async addEasyTable(params){
        const result = await reqAddProductInfo(params)
        if(result.code === '0000') {
          this.$message({
            message: '恭喜你，数据插入成功',
            type: 'success'
          });
        }
        else{
          this.msgError(result.msg);
        }    
      },

      //修改数据
      async updateEasyTable(params){
        const result = await reqUpdateProductInfo(params)
        if(result.code === '0000') {
          this.$message({
            message: '恭喜你，数据修改成功',
            type: 'success'
          });
          
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          })
        } 
        else {
          this.msgError(result.msg);
        }   
      },

      //初始化数据
      async initEasyTable(){
        const {params} = this
        const result = await reqListProductInfo(params)
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
          this.productList = result.datas;
        }
      },

    },
    created(){
      this.initEasyTable();
      this.initProductOPT();
    }
}
</script>

<style scoped lang="scss">
.mt30px{margin-top:30px;}
.mb24px{margin-bottom:24px;}
.variety{
  h2{
    font:700 22px/1 "NotoSansHans-Bold";
    color:#464646;
  }

  .main{
    padding-left:45px;
  }
}
</style>