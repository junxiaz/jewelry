<template>
  <div class="classNotes">
    <!-- 说明分类 -->    
    <div class="box">
      <em> </em>
      <span>{{title}}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"classNotes",
  props:{
    title:{
      type:String,
      default:"说明" //默认值为 说明
    }
  }
}
</script>

<style scoped lang="scss">
.classNotes{
  padding-bottom:10px;
  font-size:20px;
  border-bottom:1px solid #D6D6D6;
  .gang{color:#D1AA67;}
  div.box{
    border-left:4px solid #D1AA67;
    em{display: inline-block;width: 5px;}
    span{color:#676767;}
  }
}
</style>