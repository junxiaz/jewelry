<template>
  <div id="app">
    <!-- <el-container>
      <el-header style="height: 72px;"><HeaderGuide /></el-header>
      <el-main> -->
        <router-view />
      <!-- </el-main>
    </el-container> -->
    
    
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderGuide from './components/HeaderGuide/HeaderGuide'

export default {
  name: "App",
  components: {
    HeaderGuide
  }
};
</script>

<style>
  .el-header {
    padding: 0;
  }
  
  .el-main {
    padding: 0 40px 40px;
    background-color: #f4f5fe;
  }
</style>
