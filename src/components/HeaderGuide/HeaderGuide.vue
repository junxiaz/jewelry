<template>
  <div class="header-guide">
    <h1 class="header-logo" @click="$router.replace('/home');">金升鑫珠宝RFID监控后台</h1>
    <span class="header-nav">
      <ul>
        <li class="header-nav-item">
          <router-link :to="item.path" v-for="(item, index) in nav"  @click="goTo(item, index)" :key="index" :class="item.nowImg?true:''">
            <!-- <img :src="item.nowImg?item.activeUrl:item.navUrl" alt=""> -->
            <template v-if="$route.matched[0].path == item.path">
              <img :src="item.activeUrl" >
            </template>
            <template v-else>              
              <img :src="item.navUrl" alt="">
            </template>            

          </router-link>
        </li>
      </ul>
    </span>
    <span class="header-login">
      <span class="header-login-name">欢迎，admin</span>
      <img src="./imgs/line_navigation.png" alt="">
      <img class="header-login-out" src="./imgs/signout_icon.png" alt="">
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nav : [
          {
            path: '/ShopManage',
            navUrl : require('./imgs/shop_navigation_noral.png'),
            activeUrl: require('./imgs/shop_navigation_press.png'),
            nowImg : false
          },
          {
            path: '/LabelManage',
            navUrl : require('./imgs/label_navigation_noral.png'),
            activeUrl: require('./imgs/label_navigation_press.png'),
            nowImg : false
          },
          {
            path: '/BasicManage',
            navUrl : require('./imgs/base_navigation_noral.png'),
            activeUrl: require('./imgs/base_navigation_press.png'),
            nowImg : false
          }
        ]
      }
    },
   methods: {
      // goTo (path) {
      //     this.$router.replace(path);
      // }
      goTo(i, index) {
      console.log(i,index)
        this.nav.map(i => {
          i.nowImg = false;
          return {...i};
        })
        this.$router.replace(i.path);
        this.nav[index].nowImg = true;
      }
    },
    }
</script>

<style lang="scss" scoped>
.header-guide {
  width: 100%;
  height: 72px;
  font-size: 12px;
  color: #fff;
  line-height: 72px;
  background-color: #fff;
  .header-logo {
    width: 299px;
    font-size: 20px;
    color: #FFFFFF;
    display: inline-block;
    text-align: center;
    background: #D1AA67;
    vertical-align: top;
    cursor: pointer;
  }
  .header-nav {
    display: inline-block;
    .header-nav-item {
      float: left;
      a {
        margin-left: 32px;
        margin-right: 32px;
      }
      a.router-link-active{background:#000;}
    }
  }
  .header-login {
    float: right;
    font-size: 14px;
    color: #6B6B6B;
    img {
      vertical-align: middle;
    }
    .header-login-name {
      margin-right: 10px;
    }
    .header-login-out {
      margin-left: 10px;
      margin-right: 58px;
      cursor: pointer;
    }
  }
}
</style>