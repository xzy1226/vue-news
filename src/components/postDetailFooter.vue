<template>
  <div class="postDetail-footer">

    <!-- 未激活状态 -->
    <div class="footer-disable" v-if="!isFocus">
      <input type="text" placeholder="写跟贴" @focus="showArea" />
      <div class="comment">
        <div class="comment-length">{{item.comment_length}}</div>
        <i class="iconfont iconpinglun-"></i>
      </div>
      <i class="iconfont iconshoucang" @click='star' 
        :class="{isStar: item.has_star}"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>

    <!-- 已激活状态 -->
    <div class="footer-enable" v-if="isFocus">
      <textarea class="commentArea" ref="commentArea" rows="3" @blur="isFocus=false"></textarea>
      <div class="btn-send">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      //记录当前激活状态, 默认未激活
      isFocus: false
    }
  },
  methods: {
    //评论状态切换
    showArea(){
      this.isFocus=true;
      // 有一个函数可以设置一个异步回调,告诉 vue 等待我们下一次渲染完毕的时候
      // 再执行回调函数
      this.$nextTick(()=>this.$refs.commentArea.focus())
    },
    //收藏
    star(){
      this.$axios.get(`/post_star/${this.item.id}`).then(res=>{
        console.log(res)
        this.item.has_star=res.data.message=="收藏成功"?true:false;
      })
    }
  },
};
</script>

<style lang="less" scoped>
.postDetail-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  // 未激活状态
  .footer-disable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 13.889vw;
    padding: 0 5.556vw;
    background: #eee;

    input{
      width: 50vw;
      height: 8.333vw;
      line-height: 8.333vw;
      text-indent: 5.556vw;
      border-radius: 4.167vw;
      color: #333;
      background-color: #d7d7d7;
      border: none;
      outline: none;
    }

    .comment{
      position: relative;

      .comment-length{
        position: absolute;
        top: -2.222vw;
        left: 0.556vw;
        padding: 0.556vw 1.389vw;
        font-size: 2.778vw;
        border-radius: 2.222vw;
        color: #fff;
        background-color: #f00;
      }
    }
    .iconfont{
      font-size: 6.389vw;
    }
    .isStar{
      color: red;
    }
  }

  // 激活状态
  .footer-enable{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 2.778vw 5.556vw;
    background: #eee;

    .commentArea{
      flex: 1;
      height: 25vw;
      padding-top: 2.778vw;
      text-indent: 2.778vw;
      border-radius: 2.778vw;
      background-color: #d7d7d7;
      border: none;
      outline: none;
      resize: none;
    }

    .btn-send{
      width: 16.667vw;
      height: 7.222vw;
      font-size: 3.889vw;
      line-height: 7.222vw;
      margin-left: 2.778vw;
      border-radius: 3.889vw;
      text-align: center;
      color: #fff;
      background-color: #f00;

    }
  }
}
</style>