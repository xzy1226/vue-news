<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="toProfile">
        <i class="iconfont iconwode"></i>
      </div>
    </div>

    <!-- <div class="tab">
      <van-row>
        <van-col span="20">
          <van-tabs background="#e4e4e4" border="false" line-width="0">
            <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">内容 {{ index }}</van-tab>
          </van-tabs>
        </van-col>
        <van-col span="4">
          <div class="tab-icon">
            <i class="iconfont iconjiantou2"></i>
          </div>
        </van-col>
      </van-row>
    </div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios.get("/category").then(res => {
      // console.log(res);
    }).catch(err=>{
      console.log(err)
    })

  },
  methods: {
    toProfile() {
      // this.$router.push({ name: "profile" }).catch(err=>{console.log(err)});
      this.$router.push({ name: "profile" })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
    height: 13.889vw;
    color: #fff;
    background-color: #f00;

    .logo {
      i {
        font-size: 13.889vw;
      }
    }
    .search {
      width: 58.333vw;
      height: 9.444vw;
      font-size: 3.889vw;
      line-height: 9.444vw;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 4.722vw;

      i {
        font-size: 5vw;
      }
    }

    .user {
      width: 32px;
      height: 32px;
      line-height: 32px;
      i {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .van-tab {
    font-size: 18px !important;
    color: #000;
  }

  .tab-icon {
    height: 44px;
    background-color: #e4e4e4;
    line-height: 44px;
    text-align: center;

    i {
      display: block;
      font-size: 18px;
      transform: rotate(-90deg);
    }
  }
}
</style>