<template>
  <div class="cellBar" @click="sendClick">
    <div class="container">
      <div class="label">{{label}}</div>
      <div class="desc">{{desc}}</div>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label','desc'],
  methods: {
    sendClick(){
      this.label=='设置'? this.$emit('toPage'):this.$emit('toPage',this.label)
    }
  },
}
</script>

<style lang="less" scoped>
  .cellBar{
      padding-left: 5.556vw;
      box-sizing: border-box;

    .container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 12.222vw;
      border-bottom: 1px solid #ddd;

      .desc{
        flex: 1;
        font-size: 3.889vw;
        color: #999;
        text-align: right;
      }

      .iconjiantou1{
        font-size: 5vw;
        margin: 0 2.778vw;
      }
    }
  }

</style>