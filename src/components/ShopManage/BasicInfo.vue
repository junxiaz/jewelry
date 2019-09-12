<template>
  <div class="tab">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
    .tab {
        margin-top: 20px;
        .el-tabs {
            border: none;
            box-shadow: none;
            .el-tabs__header {
                border-color: #fff;
            }
            .el-tab-pane {
                border-color: #fff;
            }
            .is-active {
                border-left-color: #fff;
                border-right-color: #fff;
            }
        }
    }
</style>