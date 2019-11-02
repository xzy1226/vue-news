<template>
  <div class="more-comments">
    <headerNav title="精彩跟帖"/>
    <comment 
      v-for="(item,index) in comments" 
      :key="index"
      @reply="replyObj" 
      :comment="item" />

    <postDetailFooter
      :item="post"
      :replyItem="reply"
      @newComment="getComments"
      @toMoreComment="toMoreComment"
    />
  </div>
</template>

<script>
import headerNav from '../components/headerNav';
import comment from "../components/comment";
import postDetailFooter from '../components/postDetailFooter';

export default {
  components: {headerNav,comment,postDetailFooter},
  data() {
    return {
      postId: this.$route.params.id,
      comments: [],
      post: [],
      reply: {},      //点击回复传过来的参数

    }
  },
  mounted() {
    this.getComments()
    this.$axios.get(`/post/${this.postId}`).then(res=>{
      this.post=res.data.data;
    })
  },
  methods: {
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
      this.$axios.get(`/post_comment/${this.postId}`)
        .then(res=>{
          this.comments = res.data.data;
          console.log(this.comments);
        })
    }
  },
}
</script>

<style lang="less" scoped>
  .more-comments{
    padding-bottom: 80px;
  }
</style>