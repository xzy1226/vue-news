<template>
  <div class="container">
    <headerNav title="编辑资料"></headerNav>
    <div class="avatar">
      <img class="logo" :src="profile.head_img" alt />
      <van-uploader :after-read="afterRead" class="uploadImg" />
    </div>

    <cellBar label="昵称" :desc="profile.nickname" @toPage="isShowNickname=true"></cellBar>
    <cellBar label="密码" desc="******" @toPage="isShowPwd=true"></cellBar>
    <cellBar label="性别" :desc="profile.gender=='1'?'男':'女'" @toPage="isShowSelect=true"></cellBar>

    <!-- 编辑昵称弹出框 -->
    <van-dialog
      v-model="isShowNickname"
      title="编辑昵称"
      show-cancel-button
      @confirm="editInfo({nickname: newNickname})">
      <van-cell-group>
        <van-field v-model="newNickname" placeholder="请输入用户名" />
      </van-cell-group>
    </van-dialog>

    <!-- 编辑密码弹出框 -->
    <van-dialog
      v-model="isShowPwd"
      title="编辑密码"
      show-cancel-button
      @confirm="editPwd">
      <van-cell-group>
        <van-field type="password" v-model="oldPwd" placeholder="请输入旧密码" />
        <van-field type="password" v-model="newPwd" placeholder="请输入新密码" />
      </van-cell-group>
    </van-dialog>

    <!-- 上拉菜单 -->
    <van-action-sheet
      v-model="isShowSelect"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />
  </div>
</template>

<script>
import headerNav from "../components/headerNav";
import cellBar from "../components/cellBar";
import authBtn from "../components/authBtn";

export default {
  components: { headerNav, cellBar, authBtn },
  data() {
    return {
      profile: {},
      //默认参数
      newNickname: "",
      newPwd: "",
      oldPwd: "",
      actions: [{ name: "男" }, { name: "女" }],
      //默认隐藏弹出框
      isShowNickname: false,
      isShowPwd: false,
      isShowSelect: false,
    };
  },
  methods: {
    //更新页面数据
    loadPage() {
      this.$axios.get(`/user/${localStorage.getItem("user_id")}`).then(res => {
        this.profile = res.data.data;
        //设置默认头像
        this.profile.head_img = this.profile.head_img
          ? this.$axios.defaults.baseURL + this.profile.head_img
          : "/static/img/default.png";
      });
    },
    //更新数据
    editInfo(data) {
      this.$axios
        .post(`/user_update/${localStorage.getItem("user_id")}`, data)
        .then(res => {
          this.$toast.success(res.data.message);
          this.loadPage();
        });

      //清空输入框
      this.newNickname = '';
      this.newPwd = '';
    },
    //修改密码
    editPwd(){
      //判断旧密码是否正确，且新旧密码不能相等
      if(this.profile.password!==this.oldPwd || this.oldPwd===this.newPwd){
        this.$toast.fail('密码输入不正确，请重新输入');
        this.newPwd= '';
        this.oldPwd= '';
        return
      }

      //调用更新数据方法      
      this.editInfo({password: this.newPwd})

    },
    //上拉菜单选择
    onSelect(item) {
      //判断所选的性别
      let gender = item.name == "男" ? 1 : 0;
      //调用更新数据方法
      this.editInfo({gender})
      //隐藏上拉菜单
      this.isShowSelect = false;
    },
    //更改图片 将文件上传至服务器
    afterRead(item) {

      //将数据转成二进制
      let data=new FormData();
      data.append('file',item.file)
      //发送请求
      this.$axios.post('/upload',data).then(res=>{
        //调用更新数据方法
        this.editInfo({head_img: res.data.data.url});
      })
    }
  },
  mounted() {
    this.loadPage();
  }
};
</script>

<style lang="less" scoped>
.container {
  .avatar {
    position: relative;
    width: 19.444vw;
    height: 19.444vw;
    margin: 8.333vw auto;

    .logo {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }

    .uploadImg{
      position: absolute;
      top: 0;
      left: 0;
      width: 20vw;
      height: 20vw;
      opacity: 0;
    }
  }

  .saveBtn {
    width: 83.333vw;
    margin: 13.889vw auto 0;
  }
}
</style>