<template>
  <div class="container">
    <headerNav title="我的收藏"></headerNav>
    <div class="myCollection" v-for="(item,index) of mycollections" :key="index">
      <!-- 上下布局，封面多于一张 -->
      <div class="myCollection-vertical" v-if="item.cover.length>1">
        <div class="post">{{item.title}}</div>
        <div class="cover">
          <div class="cover-img" v-for="(imgs,index) in item.cover" :key="index">
            <img :src="imgs.url" alt />
          </div>
        </div>
        <div class="user">{{item.user.nickname}} {{item.comments.length}}跟帖</div>
      </div>
      <!-- 左右布局，封面只有一张 -->
      <div class="myCollection-cross" v-else>
        <div class="post">
          <div class="title">{{item.title}}</div>
          <div class="user">{{item.user.nickname}} {{item.comments.length}}跟帖</div>
        </div>
        <div class="cover-img" v-for="(imgs,index) in item.cover" :key="index">
          <img :src="imgs.url" alt />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import headerNav from "../components/headerNav";
export default {
  components: { headerNav },
  data() {
    return {
      mycollections: []
    };
  },
  mounted() {
    this.$axios.get("/user_star").then(res => {
      this.mycollections = res.data.data;
      //遍历数据
      this.mycollections.forEach(element => {
        //判断img的路劲是否有ip
        element.cover.forEach(element => {
          element.url = element.url.includes("http")
            ? element.url
            : this.$axios.defaults.baseURL + element.url;
        })
      });

      console.log(this.mycollections);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  //左右布局
  .myCollection-cross {
    display: flex;
    justify-content: space-between;
    padding: 5.556vw 2.778vw 4.167vw;
    border-bottom: 1px solid #ddd;

    .post {
      flex: 1;

      .title {
        padding: 1.667vw 0 2.778vw;
      }
    }

    .cover-img {
      width: 33.333vw;
      height: 20.833vw;
      margin-left: 2.778vw;
      img {
        width: 100%;
      }
    }
  }

  //上下布局
  .myCollection-vertical {
    padding: 5.556vw 2.778vw 4.167vw;
    // background-color: #eee;
    border-bottom: 1px solid #ddd;

    .cover {
      display: flex;
      justify-content: space-between;
      margin: 1.389vw 0 3.889vw;

      .cover-img {
        width: 32.5%;

        img {
          width: 100%;
        }
      }
    }
  }

  .user {
    font-size: 3.889vw;
    color: #999;
  }
}
</style>