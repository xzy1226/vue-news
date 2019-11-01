<template>
  <div>
    <div class="comment-wrapper">
      <div class="comment-header">
        <img class="avatar" :src="comment.user.head_img" alt="">
        <div class="info">
          <div class="nickname">{{comment.user.nickname}}</div>
          <div class="time">2小时前</div>
        </div>
        <div class="reply" @click="replyActive">回复</div>
      </div>

      <commentFloor :commentParent="comment.parent" :count="parentCount" v-if="comment.parent" />
      <div class="comment-content">
        {{comment.content}}
      </div>
    </div>
  </div>
</template>

<script>
import commentFloor from './commentFloor'
export default {
  components: {commentFloor},
  props:['comment'],
  data() {
    return {
      parentCount: this.getParentLen(0,this.comment)
    }
  },
  mounted() {
    this.comment.user.head_img = this.comment.user.head_img
        ? this.$axios.defaults.baseURL + this.comment.user.head_img
        : "/static/img/default.png";
  },
  methods: {
    //向父组件传参
    replyActive(){
      this.$emit('reply', {
        id: this.comment.id,
        name: this.comment.user.nickname,
        isActive: true
      })
    },
    getParentLen(i,item){
      if(item.parent){
        return this.getParentLen(i+1,item.parent)
      }else{
        return i
      }
      

    }
  },
}
</script>

<style lang="less" scoped>
  .comment-wrapper{
    padding: 5.556vw;
    border-bottom: 1px solid #eee;

    .comment-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.778vw;

      .avatar{
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }

      .info{
        flex: 1;
        margin-left: 2.778vw;
      }

      .time,.reply{
        font-size: 3.889vw;
        color: #999;
      }
    }

    .comment-content{
      margin-top: 2.778vw;
    }
  }
</style>