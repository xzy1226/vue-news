<template>
  <div class="container">
    <div class="closeBtn">
      <i class="iconfont iconicon-test" @click="$router.back()"></i>
    </div>

    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <div class="userName">
      <authInput
        type="text"
        placeholder="手机号码"
        rule="^\d{5,13}$"
        err_message="请输入正确的手机号"
        @input="setUserName"
      ></authInput>
    </div>

    <div class="nickName">
      <authInput
        type="text"
        placeholder="昵称"
        rule="^\w{2,12}$"
        err_message="请输入正确的昵称"
        @input="setNickName"
      ></authInput>
    </div>

    <div class="password">
      <authInput
        type="text"
        placeholder="密码"
        rule="^[a-z0-9_-]{3,12}$"
        err_message="请输入3~12位密码"
        @input="setPassWord"
      ></authInput>
    </div>

    <div class="registerBtn">
      <authBtn text="注册" @send="sendRegister" />
    </div>
  </div>
</template>

<script>
import authInput from "../components/authInput";
import authBtn from "../components/authBtn";
export default {
  components: {
    authInput,
    authBtn
  },
  data() {
    return {
      username: "",
      password: "",
      nickname: ""
    };
  },
  methods: {
    setUserName(val) {
      this.username = val;
    },
    setNickName(val) {
      this.nickname = val;
    },
    setPassWord(val) {
      this.password = val;
    },
    sendRegister() {
      // 判断内容是否存在
      if (this.username == '' || this.password == '' || this.nickname== '') {
        this.$toast.fail("输入内容不能为空");
        return;
      }
      //发送请求
      this.$axios.post('/register',{
        username: this.username,
        password: this.password,
        nickname: this.nickname
      }).then(res=>{
        if(!res.data.statusCode){
          this.$toast.success( res.data.message);
        }
      })
    }
  }
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
}
</style>