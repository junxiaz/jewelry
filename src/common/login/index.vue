<template>
  <div class="login">
    <div class="login-content">
      <h1 class="title">金升鑫珠宝RFID监管平台</h1>
      <h1 class="subtitle">登录</h1>
      <el-form :model="ruleForm" label-position="top" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userCode" class="lineHeight">
          <el-input v-model.number="ruleForm.userCode" class="nobd" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd" class="lineHeight">
          <el-input type="password" v-model="ruleForm.userPwd" autocomplete="off" class="nobd" size="small"></el-input>
        </el-form-item>
        <el-checkbox v-model="ruleForm.remeber">记住密码</el-checkbox>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')" to="/home" style="width:100px;">登录</el-button>
          <el-button @click="resetForm('ruleForm')" style="width:100px;">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import md5 from 'js-md5';
  import { reqUserLogin } from "../../api";
  export default {
    data() {
      var checkuserCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if(!/^[0-9a-zA-Z]{6,20}/.test(value)) {
            callback(new Error('请输入6~20位数字或字母'))
          } else {
            callback()
          }
        }, 1000);
      };
      var validateuserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
      };
      return {
        ruleForm: {
          userPwd: '',
          userCode: '',
          remeber: true
        },
        loading: false,
        redirect: undefined,
        otherQuery: {},
        rules: {
          userPwd: [
            { validator: validateuserPwd, trigger: 'blur' }
          ],
          userCode: [
            { validator: checkuserCode, trigger: 'blur' }
          ]
        }
      };
    },
     //页面加载调用获取cookie值
    mounted() {
      this.getCookie();
      // this.submitForm('ruleForm');
    },
    methods: {
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userCode" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
            var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'userCode') {
                    this.ruleForm.userCode = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'userPwd') {
                    this.ruleForm.userPwd = arr2[1];
                }
            }
          }
      },
      //清除cookie
      clearCookie: function() {
          this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {userPwd, userCode, remeber} = this.ruleForm;
            let userPass;
            if(userPwd.length === 32) {
              userPass = userPwd
            } else {
              userPass = md5(userPwd.toLocaleUpperCase());
            }
            if(remeber) {
              // 密码md5大写加密
              this.setCookie(userCode, userPass, 7);
            } else {
              this.clearCookie()
            }
            this.login(userPass, userCode);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async login(userPwd, userCode) {
        let result = await reqUserLogin({userCode, userPwd})
        if(result.code === '0000') {
          const token = result.token
          const shopCode = "";
          const shopName = "";
          const userTypeCode = result.userTypeCode
          this.loading = true;
          //后期删掉shopCode,添加一个shopName
          this.$store.dispatch('recordUser', {token, userCode, shopCode, userTypeCode,shopName})
            .then(() => {
              this.loading = false
              sessionStorage.setItem('statu', true);
              this.$router.replace('/home')
            }).catch(() => {
              this.loading = false
            })
        } else {
          this.$alert(result.msg, '消息', {
            confirmButtonText: '确定',
            callback: action => {
              return false 
            }
          });
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>

  .login {
    // width: 100%;
    min-height: 700px;
    min-width: 1280px;;
    // overflow-x: hidden;
    background: url('./imgs/background.png') no-repeat center;
    background-size: cover;
    background-attachment:fixed;
    position: relative;
    .login-content {
      width: 560px;
      height: 700px;
      margin-left: 680px;
      margin-right: 80px;
      background:#fff;
      // background: url('./imgs/picture.png') no-repeat;
      // background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-600px, -355px);
      .title {
        font-size: 36px;
        color: rgb(199,159,108);
        text-align: center;
        margin-top: 90px;
        margin-bottom: 82px;
      }
      .subtitle {
        font-size: 36px;
        color: rgb(99, 99, 99);
        text-align: center;
        margin-bottom: 90px;
      }
      .demo-ruleForm{padding:0 60px;}
      .btn {
        text-align: center;
        margin-top:40px;
      }
    }
  }
</style>