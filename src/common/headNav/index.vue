<template>  
    <el-container>
      <!-- 组件-框子 -->
      <el-header style="height: 72px;">
        <HeaderGuide />
      </el-header>
      <el-main>
        <childRouter/>
      </el-main>
    </el-container>
</template>

<script>
import HeaderGuide from '@/common/HeaderGuide/HeaderGuide'
import childRouter from '@/common/childRouter'
export default {
  components:{
    HeaderGuide,
    childRouter
  },
}
</script>
<style scoped lang="scss">
  .el-header {
    padding: 0;
  }
  
  .el-main {
    padding: 21px 40px 40px;
    background-color: #f4f5fe;
    div{min-height: 100%;}
  }
  .el-container{
    height: 100%;
  }
</style>