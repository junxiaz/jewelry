<template>
  <div class="login">
    <div class="login-content">
      <h1 class="title">金升鑫珠宝RFID监管平台</h1>
      <h1 class="subtitle">登录</h1>
      <el-form :model="ruleForm" label-position="top" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userCode">
          <el-input v-model.number="ruleForm.userCode"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input type="password" v-model="ruleForm.userPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-checkbox v-model="ruleForm.remeber">记住密码</el-checkbox>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
          // if (!Number.isInteger(value)) {
          //   callback(new Error('请输入数字值'));
          // } else {
          //   if (value < 18) {
          //     callback(new Error('必须年满18岁'));
          //   } else {
          //     callback();
          //   }
          // }
        }, 1000);
      };
      var validateuserPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback()
        }
        // else {
        //   if (this.ruleForm.checkuserPwd !== '') {
        //     this.$refs.ruleForm.validateField('checkuserPwd');
        //   }
        //   callback();
        // }
      };
      return {
        ruleForm: {
          userPwd: '',
          userCode: '',
          remeber: true
        },
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
    },
    methods: {
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
          var exdate = new Date(); //获取时间
          exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
          //字符串拼接cookie
          window.document.cookie = "userCode" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
          window.document.cookie = "userPwd" + "=" + md5(c_pwd) + ";path=/;expires=" + exdate.toGMTString();
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
            const {userPwd, userCode, remeber} = this.ruleForm;
            if(remeber) {
              this.setCookie(userCode, userPwd, 7);
            }
            index()
            async function index() {
              const result = await reqUserLogin({userCode, userPwd})
              console.log(result.token)
              this.$store.dispatch('recordUser', {userPwd, userCode})
            }
            // const result = await reqUserLogin(this.ruleForm)
            // if(result.code == null) {
              // console.log(this.$store.state.token)
            // }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: url('./imgs/backgroud_login.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .login-content {
      width: 440px;
      height: 710px;
      padding-left: 680px;
      padding-right: 80px;
      background: url('./imgs/picture.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-600px, -355px);
      .title {
        font-size: 36px;
        color: rgb(115, 92, 225);
        text-align: center;
        margin-top: 85px;
        margin-bottom: 65px;
      }
      .subtitle {
        font-size: 36px;
        color: rgb(115, 92, 225);
        text-align: center;
        margin-bottom: 50px;
      }
      .btn {
        text-align: center;
      }
    }
  }
</style>