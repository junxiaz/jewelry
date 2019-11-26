<template>
  <div class="childRouter">
    <!-- 组件-子路由配置 -->
    <ul v-if="!this.$route.meta.hidden">
      <router-link tag="li" :to="list.path" 
        v-for="(list,index) in routerList" :key="index">
        {{list.name}}
      </router-link>
    </ul>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name:"childRouter",
  data(){
    return {
      routerList:[],     
    }
  },
  methods:{
    routerShow(){
      for(var i = 0; i<this.$router.options.routes.length;i++){
        if(this.$route.matched[0].path == this.$router.options.routes[i].path){
          this.routerList = this.$router.options.routes[i].children;
          break;
        } 
        else {
          this.routerList = [];
        }
      }
    },
  },
  created(){
    this.routerShow();

  },
  mounted(){
  }
}
</script>

<style scoped lang="scss">
ul{
  overflow:hidden;
  margin-left:40px;
  li{
    float:left;
    margin:0 10px;
    width: 140px;
    height:42px;
    font:16px/42px "NotoSansHans-Medium";
    text-align: center;
    color:#D2AB62;
    cursor: pointer;
    background:#fff;
    border-radius: 8px 8px 0 0;
    border: 1px solid #D2AB62;
    border-bottom:0;
  }
  li.router-link-active {background:#D2AB62;color:#fff;font-weight: 700;}
}

</style>