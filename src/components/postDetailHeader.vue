<template>
  <div class="postDetail-header">
    <i class="iconfont iconjiantou2" @click='$router.push("/")'></i>
    <i class="iconfont iconnew"></i>
    <!-- 已关注 -->
    <div class="follow-disable" @click="unFollow"  v-if="isFollow">已关注</div>
    <!-- 未关注 -->
    <div class="follow-active" @click="follow" v-else>关注</div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      isFollow: this.item.has_follow
    }
  },
  methods: {
    follow(){
      console.log('已关注')
      this.$axios.get(`/user_follows/${this.item.user.id}`)
      .then(res=>{
        this.isFollow=res.data.message=='关注成功' && true;
      })
    },
    unFollow(){
      console.log('取消关注')
      this.$axios.get(`/user_unfollow/${this.item.user.id}`)
      .then(res=>{
        this.isFollow=res.data.message=='取消关注成功' && false;
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .postDetail-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 13.889vw;
    padding: 0 5.556vw;

    .iconnew{
      flex: 1;
      font-size: 15vw;
    }

    .follow-disable,.follow-active{
      width: 17.222vw;
      height: 7.222vw;
      border-radius: 3.889vw;
      font-size: 3.889vw;
      line-height: 7.222vw;
      text-align: center;
    }

    .follow-disable{
      border: 1px solid #ccc;
    }

    .follow-active{
      color: #f7f7f7;
      background-color: #f00;
    }
  }
</style>