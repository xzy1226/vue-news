<template>
  <div class="header-nav">
    <div class="icon-back" @click="$router.back()">
      <i class="iconfont iconjiantou2"></i>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
  .header-nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 13.889vw;
    font-size: 4.444vw;

    .icon-back{
      width: 6.667vw;
      height: 6.667vw;
      margin-left: 5.556vw;

      .iconjiantou2{
        font-size: 4.167vw;
        color: #999;
        line-height: 6.667vw;
        text-align: center;
      }
    }

    .title{
      flex: 1;
      text-align: center;
      padding-right: 11.111vw;
      font-weight: bold;
      color: #000;
    }
  }

</style>