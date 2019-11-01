<template>
  <div>
    <headerNav title="精彩跟帖"/>
    <comment v-for="(item,index) in comments" :key="index" :comment="item" />

  </div>
</template>

<script>
import headerNav from '../components/headerNav';
import comment from "../components/comment";

export default {
  components: {headerNav,comment},
  data() {
    return {
      postId: this.$route.params.id,
      comments: []
    }
  },
  mounted() {
    this.$axios.get(`/post_comment/${this.postId}`).then(res=>{
        this.comments=res.data.data
    })
  },
}
</script>

<style lang="less" scoped>

</style>