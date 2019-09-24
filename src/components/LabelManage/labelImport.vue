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
          <el-upload 
            action="string"
            ref="upload"
            accept=".xls,.xlsx"
            :on-success="uploadSuccess"
            :on-preview="handlePreview" 
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-exceed="handleExceed"
            :http-request="uploadFile"
            :multiple="false" :limit="1"  
            :file-list="fileList"
            :auto-upload="false"
            :show-file-list="true">
            <el-input ref="input" size="medium" placeholder="请选择附件" style="width:320px;"></el-input>
          
        <!-- </el-form-item>
        <el-form-item> -->
            <el-button type="text" size="medium" style="margin-left:5px; vertical-aligin:middle">
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
import axios from 'axios'
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
      fileList: [],
      formData: '',
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
      if(this.form.name !== '') {
        // this.$refs.input.disabled = 'true'
        // this.$refs.input.$attrs.placeholder = ''
      }
    },
    uploadFile(file) {
      this.formData.append('file', file.file)
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
      let formData = new formData();
      formData.append('file', this.fileList[0].raw)

      axios({
        url: '',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        }
      }).then(res => {
        if(res.code === '0000') {
          this.$message.sucess('上传文件成功')
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
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
.myStyle .el-upload-list {position: absolute; top: 1px;left: 3px; width: 318px; background: #ccc; }
</style>