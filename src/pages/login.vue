<template>
  <div class="container">
    <div class="closeBtn">
      <i @click="toBack" class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="username">
      <authInput
        type="text"
        placeholder="手机号码"
        rule="^\d{5,13}$"
        err_message="请输入正确的手机号"
        @input="setUserName"
      ></authInput>
    </div>
    <div class="password">
      <authInput
        type="password"
        placeholder="密码"
        rule="^[a-z0-9_-]{3,12}$"
        err_message="请输入3~12位密码"
        @input="setPassWord"
      ></authInput>
    </div>
    <div class="loginBtn">
      <authBtn text="登录" @send="sendLogin" />
    </div>
    <div class="toRegister">
      <router-link to="/register">立即注册</router-link>
    </div>

  </div>
</template>

<script>
import authInput from '../components/authInput';
import authBtn from '../components/authBtn';
export default {
  components: {
    authInput,
    authBtn
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    setUserName(val){
      this.username=val;
    },
    setPassWord(val){
      this.password=val;
    },
    sendLogin(){
      // 判断内容是否存在
      if(this.username==''||this.password==''){
        this.$toast.fail('输入内容不能为空');
        return;
      }
      //发送请求
      this.$axios.post('/login',{
        username: this.username,
        password: this.password
      }).then(res=>{
        if(!res.data.statusCode){
          //提示信息
          this.$toast.success( res.data.message);
          
          //保存数据
          localStorage.setItem('token',res.data.data.token);
          localStorage.setItem('user_id',res.data.data.user.id);
          
          //设置定时
          let timer=setTimeout(() => {
            clearTimeout(timer)   //清除定时器
            //跳转
            this.$router.push({name: 'index'})
          }, 1000);
        }
      })
    },
    toBack(){
      this.$router.back()
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 5.333vw;

  .closeBtn {
    margin-bottom: 5vw;
    i {
      font-size: 7.222vw;
      color: #333;
    }
  }

  .logo{
    margin-bottom: 5vw;
    text-align: center;

    span{
      font-size: 34.444vw;
      color: #d81e06;
    }
  }

  .toRegister{
    margin-top: 3.333vw;
    font-size: 4.444vw;
    text-align: right;
  }

}
</style>