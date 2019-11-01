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
          <video
            class="video"
            src="https://video.pearvideo.com/mp4/third/20190823/cont-1594424-12719568-191232-hd.mp4"
            controls="controls"
            autoplay="autoplay"
            x5-video-player-type="h5"
            :poster="post.cover[0].url"
          ></video>
        </div>
        <div class="userinfo">
          <img :src="'http://127.0.0.1:3000'+post.user.head_img" alt />
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

      <!-- 跟帖 -->
      <div class="comments">
        <div class="goodComments">精彩跟帖</div>
        <div class="userComments">
          <div class="noComments" v-if="comments.length==0">暂无跟帖，抢占沙发</div>
          <div v-else>
            <comment v-for="(item,index) in comments" :key="index" :comment="item" @reply="replyObj" />
            <div class="moreComment" @click="toMoreComment">更多跟帖</div>
          </div>
        </div>
      </div>
    </div>
    <postDetailFooter
      :item="post"
      :replyItem="reply"
      @newComment="getComments"
      @toMoreComment="toMoreComment"
    />
  </div>
</template>

<script>
import postDetailHeader from "../components/postDetailHeader";
import postDetailFooter from "../components/postDetailFooter";
import comment from "../components/comment";
export default {
  components: { postDetailHeader, postDetailFooter, comment },
  data() {
    return {
      postId: this.$route.params.id,
      post: {},       //文章详情数据
      comments: [],   //评论列表
      reply: {},      //点击回复传过来的参数
    }
  },
  mounted() {
    let params = {
      pageSize: 3,
      pageIndex: 1
    };
    let axiosList = [
      this.$axios.get(`/post/${this.postId}`),
      this.$axios.get(`/post_comment/${this.postId}`, { params })
    ];

    //axios 并发请求
    this.$axios.all(axiosList).then(
      this.$axios.spread((res1, res2) => {
        this.post = res1.data.data;
        this.comments = res2.data.data;
      })
    );
  },
  methods: {
    // 点赞
    lick() {
      this.$axios.get(`/post_like/${this.postId}`).then(res => {
        if (res.data.message == "点赞成功") {
          this.post.like_length += 1;
          this.post.has_like = true;
        } else if (res.data.message == "取消成功") {
          this.post.like_length -= 1;
          this.post.has_like = false;
        }
      });
    },
    //跳转精彩跟帖页面
    toMoreComment() {
      this.$router.push({
        name: "morecomments",
        params: {
          id: this.postId
        }
      });
    },
    //接受点击回复时返回的 parent_id 和 回复的用户名
    replyObj(val) {
      this.reply = val;
    },
    //获取评论数据
    getComments() {
      let params = {
        pageSize: 3,
        pageIndex: 1
      };
      this.$axios.get(`/post_comment/${this.postId}`, { params })
        .then(res=>{
          this.comments = res.data.data;
        })
    }
  }
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
    .video-post {
      .video {
        width: 100%;
      }

      .userinfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 13.889vw;
        padding: 2.778vw 5.556vw;

        img {
          width: 7.222vw;
          height: 7.222vw;
          border-radius: 3.611vw;
        }

        .nickname {
          flex: 1;
          text-align: left;
          margin-left: 2.778vw;
        }
      }

      .title {
        padding: 0 5.556vw;
        font-size: 4.444vw;
        color: #333;
      }
    }

    //文章下面按钮
    .actionBtns {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 11.111vw;

      .like,
      .wechat {
        height: 8.333vw;
        line-height: 8.333vw;
        padding: 0 4.167vw;
        border: 1px solid #999;
        font-size: 3.889vw;
        border-radius: 4.167vw;
      }

      .isLike {
        color: red;
      }

      .iconweixin {
        color: #00c800;
      }
    }

    .line {
      height: 1.389vw;
      margin: 5.556vw 0;
      background-color: #e4e4e4;
    }

    .comments {
      .goodComments {
        width: 100%;
        font-size: 5.556vw;
        color: #333;
        text-align: center;
      }

      .userComments {
        .noComments {
          height: 22.222vw;
          line-height: 22.222vw;
          font-size: 3.889vw;
          color: #999;
          text-align: center;
        }
      }

      .moreComment {
        width: 33.333vw;
        height: 8.333vw;
        margin: 8.333vw auto 0;
        border: 1px solid #333;
        line-height: 8.333vw;
        text-align: center;
        border-radius: 4.167vw;
      }
    }
  }
}
</style>