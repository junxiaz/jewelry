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
    // console.log(this.$route)
  },
  mounted(){

  }
}
</script>

<style scoped lang="scss">
ul{
  display: flex;
  margin-left:44px;
  li{
    margin:0 16px;
    width: 95px;
    height:45px;
    font:16px/45px "NotoSansHans-Medium";
    text-align: center;
    color:#474747;
    cursor: pointer;
  }
  li.router-link-active {background:#fff;color:#705FE0}
}

</style>