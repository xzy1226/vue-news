<template>
  <div class="container">
    <headerNav title="我的关注"></headerNav>
    <div class="my-follow" v-for="(item,index) of myfollows" :key="index">
      <img :src="item.head_img" alt />
      <div class="user">
        <div class="name">{{item.nickname}}</div>
        <div class="time">2019-10-26</div>
      </div>
      <div class="cancel-Btn" @click="unFollow(index)">取消关注</div>
    </div>
  </div>
</template>

<script>
import headerNav from "../components/headerNav";
export default {
  components: { headerNav },
  data() {
    return {
      myfollows: []
    };
  },
  methods: {
    //更新页面数据
    loadPage() {
      this.$axios.get("/user_follows").then(res => {
        this.myfollows = res.data.data;
        // 默认头像
        this.myfollows.forEach(element => {
          element.head_img = element.head_img
            ? this.$axios.defaults.baseURL + element.head_img
            : "/static/img/default.png";
        });
      });
    },
    unFollow(index) {
      this.$axios
        .get(`/user_unfollow/${this.myfollows[index].id}`)
        .then(res => {
          this.$toast.success(res.data.message);
          //更新页面数据
          this.loadPage()
        });
    }
  },
  mounted() {
    this.loadPage()
  }
};
</script>

<style lang="less" scoped>
.container {
  .my-follow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 5.556vw;
    border-bottom: 1px solid #ddd;

    img {
      width: 11.111vw;
      height: 11.111vw;
      border-radius: 50%;
    }

    .user {
      flex: 1;
      text-align: left;
      padding-left: 5.556vw;

      .time {
        font-size: 3.889vw;
        color: #999;
      }
    }

    .cancel-Btn {
      height: 8.333vw;
      line-height: 8.333vw;
      padding: 0 4.167vw;
      font-size: 3.889vw;
      background-color: #d7d7d7;
      border-radius: 4.167vw;
    }
  }
}
</style>