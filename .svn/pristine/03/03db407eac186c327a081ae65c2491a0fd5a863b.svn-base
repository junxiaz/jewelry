<template>
  <div class="label-import">
    <!-- 标签导入 -->
    <!-- 标题 -->
    <h2>长沙黄金城中国黄金</h2>

    <div class="main">
      <!-- 组件 -->
      <classNotes title="说明文档">        
        &nbsp;<span class="word">采用Excel文档传入数据，文档格式如下</span>
      </classNotes>

      <!-- 主体 -->
      <el-form ref="form" :model="form" label-width="76px" class="mt20px myStyle" :inline="true">
        <el-form-item label="选择文件">
          <el-input v-model="form.name" placeholder="请上传附件" size="medium" style="width:320px;"></el-input>
          
        </el-form-item>
        <el-form-item>
          <el-upload 
            action="https://jsonplaceholder.typicode.com/posts/"
            accept=".xls,.xlsx"
            :on-success="uploadSuccess"
            :on-preview="handlePreview" 
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :multiple="false" :limit="1"  :file-list="fileList"
            :show-file-list="true">
            <el-button type="text" size="medium" style="margin-left:5px;">
              <img src="../../../static/images/upload_icon.png"/>
            </el-button>

          </el-upload>
        </el-form-item>
      </el-form>
      
      <el-button type="primary" @click="onSubmit" size="medium">提交</el-button>
    </div>
  </div>
</template>

<script>
import classNotes from '@/common/classNotes'
export default {
  name:"labelImport",
  components:{
    classNotes
  },
  data(){
    return {
      form: {
          name: '',
          url:[]
      },
      fileList:[]
    }
  },
  methods:{
    //上传成功
    uploadSuccess(res, file, fileList){
      console.log(res,file,fileList);
      var fileName =[];
      fileList.map((item,index)=>{
        fileName.push(item.name);
      })
      this.form.name = fileName.join(",")
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeUpload(file, fileList) {
      console.log("before",file,fileList)
    },

    //确认提交
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped lang="scss">
.mt20px{margin-top:20px;}
.label-import{
  background:#fff;
  padding:36px 84px 20px 40px;
  h2{
    font:700 22px/1 "NotoSansHans-Bold";
    color:#464646;
    margin-bottom:49px;
  }


  .main{
    padding-left:45px;
    .classNotes{
      .word{color:#FB6969;font-size:16px;}
    }
  }
}
</style>