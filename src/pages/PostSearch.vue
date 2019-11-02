<template>
  <div class="container">
    <!-- 头部 -->
    <div class="search-header">
      <i class="iconfont iconjiantou2" @click="toBack"></i>

      <div class="search-input">
        <i class="iconfont iconsearch"></i>
        <input v-model="searchText" type="text" placeholder="搜索新闻">
      </div>

      <div class="search-btn" @click="search" >搜索</div>
    </div>

    <div v-if="posts.length>0">
      <post v-for="(post,index) in posts" :key="index" :item="post" />
    </div>

    <div class="suggestion" v-else>
      <div class="history">
        <h2>历史记录</h2>
        <span @click="searchItem(item)" v-for="(item,index) in historyList" :key="index">{{item}}</span>
      </div>
      <div class="hot">
        <h2>热门搜索</h2>
        <p v-for="(item,index) in hotList" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import post from '../components/post';

export default {
  components: {post},
  data() {
    return {
      searchText: '',
      hotList: ['美女','阿信','关晓彤'],
      historyList: JSON.parse(localStorage.getItem('history')) || [],
      posts: []
    }
  },
  watch: {
    searchText(){
      this.posts=!this.searchText && []
      // if(!this.searchText) this.posts=[]
    },
    historyList(){
      //把历史记录存储到本地
      localStorage.setItem('history',JSON.stringify(this.historyList))
    }
  },
  methods: {
    search(){
      this.$axios.get(`/post_search?keyword=${this.searchText}`).then(res=>{
        this.posts=res.data.data;
        //判断搜索内容是否存在历史记录中，没有则添加到历史记录
        !this.historyList.includes(this.searchText) && this.historyList.push(this.searchText)
      })
    },
    searchItem(item){
      this.searchText=item;
      this.search();
    },
    toBack(){
      this.searchText?this.searchText='':this.$router.back()
    }
  },
}
</script>

<style lang="less" scoped>
  .container{
    .search-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2.778vw 5.556vw;

      .iconjiantou2{
        font-size: 4.444vw;
      }

      .search-input{  
        flex: 1;
        height: 11.111vw;
        padding-left: 5.556vw;
        margin: 0 2.778vw;
        border: 1px solid #ddd;
        line-height: 11.111vw;
        border-radius: 5.556vw;
        text-align: left;

        input{
          width: 85%;
          height: auto;
          font-size: 3.889vw;
          outline: 0;
          border: none;
          background: none;
        }
      }

    }

    .suggestion{
      padding: 0 5.556vw;

      .history,.hot{
        padding: 5.556vw 0;
      }
      .history{
        border-bottom: 1px solid #eee;

        h2{
          padding-bottom: 5.556vw;
        }

        span{
          margin-right: 2.778vw;
        }
      }
      h2{
        font-size: 4.444vw;
      }
      p{
        margin-top: 2.778vw;
        font-size: 3.889vw;
      }
    }
  }
</style>