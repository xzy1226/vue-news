<template>
  <div class="container">
    <postDetailHeader :item="post" />

    <div class="postDetail">
      <!-- 普通文章 -->
      <div class="normal-post" v-if="post.type!=2">
        <div class="title">{{post.title}}</div>
        <div class="userinfo" v-if="post.user">{{post.user.nickname}} 2019-10-10</div>
        <div class="content" v-html="post.content"></div>
      </div>

      <!-- 视频文章 -->
      <div class="video-post" v-if="post.type==2">
        <div class="video">
          <video class="video"
         src="https://video.pearvideo.com/mp4/third/20190823/cont-1594424-12719568-191232-hd.mp4"
          controls="controls"
          autoplay="autoplay"
          x5-video-player-type="h5"
          :poster="post.cover[0].url"
          ></video>
        </div>
        <div class="userinfo">
          <img :src="'http://127.0.0.1:3000'+post.user.head_img" alt="">
          <div class="nickname">{{post.user.nickname}}</div>
        </div>
        <div class="title">{{post.title}}</div>
      </div>
      
      <!-- 点赞和分享微信按钮 -->
      <div class="actionBtns">
        <div class="like" @click="lick">
          <i class="iconfont icondianzan" :class="{
            isLike: post.has_like
          }"></i>
          {{post.like_length}}
        </div>
        <div class="wechat">
          <i class="iconfont iconweixin"></i>
          微信
        </div>
      </div>

      <!-- 分割线 -->
      <div class="line"></div>

      <div class="goodComments">精彩跟帖</div>
    </div>
    <postDetailFooter :item="post" />
  </div>
</template>

<script>
import postDetailHeader from "../components/postDetailHeader";
import postDetailFooter from "../components/postDetailFooter";
export default {
  components: { postDetailHeader, postDetailFooter },
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    this.$axios.get(`/post/${this.$route.params.id}`).then(res => {
      this.post = res.data.data;
      console.log(this.post);
    });
  },
  methods: {
    lick(){
      this.$axios.get(`/post_like/${this.post.id}`).then(res=>{
        console.log(res)
        if(res.data.message=="点赞成功"){
          this.post.like_length+=1
          this.post.has_like=true;
        }else if(res.data.message=="取消成功"){
          this.post.like_length-=1;
          this.post.has_like=false;
        }
      })
    }
  },

};
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 22.222vw;

  .postDetail {

    // 普通文章样式
    .normal-post {
      padding: 5.556vw 2.778vw;

      .title {
        font-size: 5.556vw;
        font-weight: bold;
        color: #333;
      }

      .userinfo {
        margin: 2.778vw 0 5.556vw;
        font-size: 3.889vw;
        color: #868686;
      }

      .content {
        /deep/img {
          width: 100%;
        }
      }
    }
    // 视频文章样式
    .video-post{

      .video{
        width: 100%;
      }

      .userinfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 13.889vw;
        padding: 2.778vw 5.556vw;
        
        img{
          width: 7.222vw;
          height: 7.222vw;
          border-radius: 3.611vw;
        }

        .nickname{
          flex: 1;
          text-align: left;
          margin-left: 2.778vw;
        }
      }

      .title{
        padding: 0 5.556vw;
        font-size: 4.444vw;
        color: #333;
      }
    }

    //文章下面按钮
    .actionBtns{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 11.111vw;

      .like,.wechat{
        height: 8.333vw;
        line-height: 8.333vw;
        padding: 0 4.167vw;
        border: 1px solid #999;
        font-size: 3.889vw;
        border-radius: 4.167vw;
      }

      .isLike{
        color: red;
      }

      .iconweixin{
        color: #00c800;
      }
    }

    .line{
      height: 1.389vw;
      margin: 5.556vw 0;
      background-color: #e4e4e4;
    }

    .goodComments{
      width: 100%;
      font-size: 5.556vw;
      color: #333;
      text-align: center;
    }
  }
}
</style>