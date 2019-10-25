<template>
  <div class="btn" @click="sendClick">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    sendClick(){
      this.$emit('send')
    }
  },
}
</script>

<style lang="less" scoped>
  .btn{
    width: 100%;
    height: 12.778vw;
    margin-top: 11.111vw;
    font-size: 5vw;
    text-align: center;
    line-height: 12.778vw;
    border-radius: 6.667vw;
    color: #fff;
    background-color: #cc3300;
  }
</style>