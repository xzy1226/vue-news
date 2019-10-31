<template>
  <div class="post">
    <!-- 上下布局，封面多于一张 -->
    <div class="layout-vertical" v-if="item.cover.length>1">
      <div class="post" @click="toDetail">{{item.title}}</div>
      <div class="cover" @click="toDetail">
        <div class="cover-img" v-for="(urlItem,index) in item.cover" :key="index">
          <img :src="urlItem.url" alt />
        </div>
      </div>
      <div class="user">{{item.user.nickname}} {{item.comment_length}}跟帖</div>
    </div>

    <!-- 视频模块布局 -->
    <div class="layout-video" v-if="item.type == 2">
      <div class="post" @click="toDetail">{{item.title}}</div>
      <div class="cover" @click="toDetail">
        <img class="cover-video" :src="item.cover[0].url" alt />
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="user">{{item.user.nickname}} {{item.comment_length}}跟帖</div>
    </div>

    <!-- 左右布局，封面只有一张 -->
    <div class="layout-cross" v-else>
      <div class="post"> 
        <div class="title" @click="toDetail">{{item.title}}</div>
        <div class="user">{{item.user.nickname}} {{item.comment_length}}跟帖</div>
      </div>
      <img :src="item.cover[0].url" alt @click="toDetail"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  mounted() {
    //遍历图片,判断img的路劲是否有ip
    this.item.cover.forEach(element => {
      element.url = element.url.includes("http")
        ? element.url
        : this.$axios.defaults.baseURL + element.url;
    })
  },
  methods: {
    toDetail(){
      //跳转详情页
      this.$router.push({
        name: 'postdetail',
        params: {
          id: this.item.id
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.post {
  //左右布局
  .layout-cross {
    display: flex;
    justify-content: space-between;
    padding: 5.556vw 2.778vw 4.167vw;
    border-bottom: 1px solid #ddd;

    .post {
      flex: 1;
      height: 20.833vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        padding-top: 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    img {
      width: 33.333vw;
      height: 20.833vw;
      margin-left: 2.778vw;
      object-fit: cover;
    }
  }

  //上下布局
  .layout-vertical {
    padding: 5.556vw 2.778vw 4.167vw;
    // background-color: #eee;
    border-bottom: 1px solid #ddd;

    .post {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cover {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin: 1.389vw 0 3.889vw;

      .cover-video {
        width: 100%;
      }
      .iconshipin {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 19.444vw;
        height: 19.444vw;
        line-height: 19.444vw;
        font-size: 13.889vw;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
      }

      .cover-img {
        width: 32.5%;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }
  }

  //视频布局
  .layout-video {
    padding: 5.556vw 2.778vw 4.167vw;
    // background-color: #eee;
    border-bottom: 1px solid #ddd;

    .post {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cover {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin: 1.389vw 0 3.889vw;

      .cover-video {
        width: 100%;
      }
      .iconshipin {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 15.278vw;
        height: 15.278vw;
        line-height: 15.278vw;
        font-size: 45px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #eee;
        background-color: rgba(0, 0, 0, 0.3);
      }

      .cover-img {
        width: 32.5%;

        img {
          width: 100%;
          object-fit: cover;
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