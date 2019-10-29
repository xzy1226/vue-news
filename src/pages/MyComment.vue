<template>
  <div class="container">
    <headerNav title="我的跟帖"></headerNav>
    <div class="my-comment" v-for="(item,index) of mycomments" :key="index">
      <div class="date">2019-10-10 10:25</div>
      <div class="parent" v-if="item.parent">
        <div class="name">回复：{{item.parent.user.nickname}}</div>
        <div class="parent-content">{{item.parent.content}}</div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="post-origin">
        <div class="post">原文：{{item.post.title}}</div>
        <div class="icon">
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </div>

    <div class="more-comment" @click="moreComment" v-if="isMoreComment">更多跟帖 >></div>
    <div class="more-comment no-more"  v-else>没有更多跟帖了 ！！！</div>
  </div>
</template>

<script>
import headerNav from "../components/headerNav";
export default {
  components: { headerNav },
  data() {
    return {
      mycomments: [],
      count: 0,
      isMoreComment: true
    }
  },
  methods: {
    moreComment(){
      this.$axios.get(`/user_comments?pageIndex=${this.count++}&pageSize=3`).then(res=>{
        // this.mycomments=res.data.data;
        console.log(res.data.data.length)
        if(res.data.data.length<3){
          this.isMoreComment=false
        }
        res.data.data.forEach(element => {
          this.mycomments.push(element)
        });
        console.log(this.mycomments)
      })
    }
  },
  mounted() {
    this.moreComment()
  },
};
</script>

<style lang="less" scoped>
  .container{
    .my-comment{
      padding: 5.556vw;
      border-bottom: 1px solid #ddd;

      .date,.parent,.post-origin{
        font-size: 3.889vw;
        color: #999;
      }

      .parent-content,.post{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .date{
        margin-bottom: 4.167vw;
      }
      .parent{
        padding: 2.778vw 0 2.778vw 2.778vw;
        background-color: #e4e4e4;

        .parent-content{
          font-size: 4.167vw;
          padding-top: 2.778vw;
        }
      }

      .content{
        margin: 4.167vw 0;
      }

      .post-origin{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .post{
          flex: 1;
        }

        .icon{
          margin-left: 5.556vw;
        }
      }
    }

    .more-comment{
      width: 100%;
      font-size: 3.889vw;
      padding: 2.778vw 0;
      margin: 5.556vw 0 ;
      text-align: center;
      color: #999;
    }
    .no-more{
      background-color: #eee;
      margin: 0;
    }
  }
</style>