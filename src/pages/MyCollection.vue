<template>
  <div class="container">
    <headerNav title="我的收藏"></headerNav>

    <post v-for="(post,index) in mycollections" :key="index" :item="post" />
    
  </div>
</template>

<script>
import headerNav from "../components/headerNav";
import post from '../components/post';

export default {
  components: { headerNav,post },
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
        //手动添加评论数量
        element.comment_length=element.comments.length
        //判断img的路劲是否有ip
        element.cover.forEach(element => {
          element.url = element.url.includes("http")
            ? element.url
            : this.$axios.defaults.baseURL + element.url;
        })
      })
    });
  }
};
</script>

<style lang="less" scoped>
</style>