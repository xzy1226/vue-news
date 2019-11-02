<template>
  <div>
    <floor @reply="reply" :count="count-1" :commentParent='commentParent.parent' v-if="commentParent.parent"></floor>
    <div class="floor">
      <div class="floor-header">
        <div class="info">
          {{count}}楼：
          {{commentParent.user.nickname}}
          <span class="time">2小时</span>
        </div>
        <div class="reply" @click="reply">回复</div>
      </div>
      <div class="floor-content">{{commentParent.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floor",
  props: ["commentParent","count"],
  methods: {
    reply(data){
      // 子评论回复 要一层一层往外传
      this.$emit('reply', data.id?data:{
        id: this.commentParent.id,
        name: this.commentParent.user.nickname,
        isActive: true
      })

    }
  },
};
</script>

<style lang="less" scoped>
.floor {
  padding: 5.556vw;
  border: 1px solid #eee;
  background-color: #f9f9f9;

  .floor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.778vw;

    .time,
    .reply {
      font-size: 3.889vw;
      color: #999;
    }
  }
}
</style>