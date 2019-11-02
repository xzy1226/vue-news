<template>
  <div class="container">
    <headerNav title="个人中心"></headerNav>

    <div class="profile" @click="toEditPage">
      <!-- 头像不存在，则默认头像
      <img
        v-if="profile.head_img"
        class="logo"
        src="http://127.0.0.1:3000/uploads/image/IMG1568705287936.jpeg"
        alt
      />
      <img v-else class="logo" src="@/assets/img/default.png" alt />-->

      <img :src="profile.head_img" class="logo" alt />
      <div class="user">
        <div class="name">
          <!-- 判断性别 -->
          <i v-if="profile.gender==1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          {{profile.nickname}}
        </div>
        <div class="time">2019-10-26</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>

    <div v-for="(item,index) of labelList" :key="index">
      <cellBar :label="item.label" :desc="item.desc" @toPage="toPageLink(index)"></cellBar>
    </div>

    <cellBar label="设置" @toPage="toEditPage"></cellBar>

    <div class="logout">
      <authBtn text="退出登录" @send="Logout" />
    </div>
  </div>
</template>

<script>
import cellBar from "../components/cellBar";
import authBtn from "../components/authBtn";
import headerNav from "../components/headerNav";

export default {
  components: { cellBar, authBtn,headerNav },
  data() {
    return {
      labelList: [
        {
          label: "我的关注",
          desc: "关注的用户",
          pathName: "myfollow"
        },
        {
          label: "我的跟帖",
          desc: "跟帖/回复",
          pathName: "mycomment"
        },
        {
          label: "我的收藏",
          desc: "文章/视频",
          pathName: "mycollection"
        }
      ],
      profile: {}
    };
  },
  methods: {
    toPageLink(index) {
      this.$router.push({name: this.labelList[index].pathName})
    },
    toEditPage() {
      this.$router.push({ name: "editprofile" });
    },
    //退出
    Logout() {
      //删除数据
      localStorage.clear();

      //提示
      this.$toast.success("退出成功");
      //设置定时
      let timer = setTimeout(() => {
        clearTimeout(timer); //清除定时
        //跳转到登录
        this.$router.replace({ name: "login" });
      }, 1000);
    }
  },
  mounted() {
    this.$axios.get(`/user/${localStorage.getItem("user_id")}`).then(res => {
      this.profile = res.data.data;
      //设置默认头像
      this.profile.head_img = this.profile.head_img
        ? this.$axios.defaults.baseURL + this.profile.head_img
        : "/static/img/default.png";
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  .profile {
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    padding: 8.333vw 0;
    border-bottom: 5px solid #ddd;

    .logo,
    .user {
      margin-left: 5.556vw;
    }
    .logo {
      width: 19.444vw;
      height: 19.444vw;
      border-radius: 9.722vw;
    }

    .user {
      flex: 1;
      .name {
        font-size: 4.444vw;

        .iconxingbienan {
          color: skyblue;
        }
        .iconxingbienv {
          color: pink;
        }
      }

      .time {
        font-size: 3.889vw;
        color: #999;
      }
    }

    .iconjiantou1 {
      font-size: 5vw;
      margin-right: 2.778vw;
    }
  }

  .logout {
    position: absolute;
    left: 20%;
    bottom: 13.889vw;
    width: 60%;
  }
}
</style>