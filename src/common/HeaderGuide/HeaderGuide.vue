<template>
  <div class="header-guide">
    <h1 class="header-logo" @click="$router.replace('/home');">金升鑫珠宝RFID监控后台</h1>

    <span class="header-nav" v-show="$route.fullPath != '/home'">
      <transition name="el-zoom-in-center">
        <ul >
          <li class="header-nav-item">
            <router-link :to="item.path" v-for="(item, index) in nav"  @click="goTo(item, index)" :key="index" :class="item.nowImg?true:''">
              <template v-if="$route.matched[0].path == item.path">
                <img :src="item.activeUrl" >
              </template>
              <template v-else>              
                <img :src="item.navUrl" alt="">
              </template>           
            </router-link>
          </li>
        </ul>
      </transition>
    </span>

    <span class="header-login">
      <span class="header-login-name">欢迎，{{userCode}}</span>
      <img src="./imgs/line_navigation.png" alt="">
      <img class="header-login-out" src="./imgs/signout_icon.png" alt="" @click="logout">
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    computed: {
      ...mapState(['userCode', 'token'])
    },
    methods: {
      goTo(i, index) {
        this.nav.map(i => {
          i.nowImg = false;
          return {...i};
        })
        this.$router.replace(i.path);
        this.nav[index].nowImg = true;
      },
      logout () {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求退出
          this.$store.dispatch('logout')
          sessionStorage.setItem('statu', false)
          this.$router.replace('/login')
        }).catch(() => {
          return false;
        });
      },
      checkLogin() {
        const  LOGOUT_TIME = 1000 * 60 * 60 * 12; 
        let timer = setTimeout(() => {
          // 请求退出
          this.$store.dispatch('logout')
          sessionStorage.setItem('statu', false)
          this.$router.replace('/login')
          clearTimeout(timer)
        }, LOGOUT_TIME);
        if(!sessionStorage.getItem('statu') || sessionStorage.getItem('statu') == 'false') {
          this.$store.dispatch('logout')
          this.$router.replace('/login')
        }
      }
    },
    created(){
      this.checkLogin();
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
      height:72px;
      a {
        margin-left: 32px;
        margin-right: 32px;
      }
      a.router-link-active{background:none;}
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