<template>
  <div class="label-import bt2">
    <!-- 标签导入 -->
    <!-- 标题 -->
    <h2>{{$store.state.shopName}}</h2>

    <div class="main">
      <!-- 组件 -->
      <classNotes title="说明文档">        
        &nbsp;<span class="word">采用Excel文档传入数据，文档格式如下</span>
      </classNotes>

      <!-- 主体 -->
      <el-form ref="form" label-width="76px" class="mt20px myStyle" :inline="true">
        <el-form-item label="选择文件">
          <el-upload 
            action="string"
            ref="upload"
            accept=".xls,.xlsx"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange"
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
      
      <el-button type="danger" @click="submitUpload" size="medium" v-has>提交</el-button>
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
      fileList: [],
    }
  },
  methods:{
    handleChange(file, fileList) {
      this.fileList.push(file.raw)
    },
    handleRemove(file, fileList) {
      let index = this.fileList.findIndex(val => val.uid === file.uid);
      this.fileList.splice(index, 1);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    //确认提交
    submitUpload(file, fileList) {
      let formData = new FormData()
      formData.append('files', this.fileList[0])

      if(!this.fileList[0]) {
        this.$message.warning('请选择附件')
        return false
      }

      axios({
        url: 'http://101.231.106.162:9105/jewelry/web/tag/importTagInfo',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data;charset=utf-8'
        }
      }).then(res => {
        if(res.data.code === '0000') {
          this.$message({
            message: '上传文件成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          });
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
.myStyle .el-upload-list {position: absolute; top: 6px;left: 1px; width: 318px; background: #ccc; }
</style>