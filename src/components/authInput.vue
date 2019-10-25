<template>
  <input :type="type" :class="{error:!istrue}" :placeholder="placeholder" @input="textChange" @blur="showToast" />
</template>

<script>
export default {
  props: ["type", "placeholder", "rule", "err_message"],
  data() {
    return {
      istrue: true
    };
  },
  methods: {
    textChange(e) {
      //验证数据是否合格
      const reg = RegExp(this.rule);
      this.istrue =
        e.target.value == "" ? (this.istrue = true) : reg.test(e.target.value);
      //把数据传回父组件
      this.$emit("input", e.target.value);
    },
    showToast() {
      !this.istrue && this.$toast.fail(this.err_message);
    }
  }
};
</script>

<style lang="less" scoped>
  input {
    box-sizing: border-box;
    width: 100%;
    height: 13.333vw;
    font-size: 5vw;
    margin-bottom: 5vw;
    color: #949494;
    border: none;
    border-bottom: 1px solid #757575;
    outline: none;
  }
  .error{
    border-bottom: 1px solid #d00000;
  }

</style>