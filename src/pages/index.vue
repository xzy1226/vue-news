<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    
    <div class="tab">
      <van-tabs  background="#e4e4e4" v-model="tabActive" animated swipeable sticky>
        <van-tab
          v-for="(item,index) in tabList"
          :key="index"
          :title="item.name">

            <van-list
              v-model="loading"
              :immediate-check="false"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="LoadMorePost">
              <post v-for="(post,index) in item.posts" :key="index" :item="post" />
            </van-list>
            
        </van-tab>
      </van-tabs>

      <div class="tab-icon">
          <i class="iconfont iconjiantou2"></i>
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
      tabList: [],
      //当前显示标签
      tabActive: localStorage.getItem("token") ? 1 : 0,
      loading: false,   //底部加载中提示
      pageSize: 5       //每次加载的数据量
    };
  },
  mounted() {
    //vue实例挂载完毕，发送请求，获取分类标签
    this.$axios.get("/category").then(res => {
      //给分类标签添加一个posts属性，用于存放文章列表
      res.data.data.forEach(element => {
        //初始化列表内容
        element.posts=[];        
        element.currentPage=1;    //当前页数
        element.finished=false;   //数据是否加载完毕
      });

      //过滤出热门的标签 
      this.tabList = res.data.data.filter(element => element.is_top == 1);

      //调用获取文章数据列表方法
      this.getPostList(this.tabActive)
    });
  },
  methods: {
    //获取文章数据列表
    getPostList(tabIndex){
      //要发送请求的参数
      const params={
        category: this.tabList[tabIndex].id,
        pageIndex: this.tabList[tabIndex].currentPage,
        pageSize: this.pageSize
      }

      // 发送请求，获取文章数据列表
      this.$axios.get(`/post`,{params}).then(res=>{

        // 给对应的分类标签添加文章数据 , 新旧数据合并
        this.tabList[tabIndex].posts=[...this.tabList[tabIndex].posts,...res.data.data];

        // 数据加载完，关闭底部加载中提示
        this.loading=false;

        //判断数据是否加载完毕
        this.tabList[tabIndex].finished=res.data.data.length<this.pageSize && true;
        
      })
    },
    //加载更多数据
    LoadMorePost(){
      // 设置延时
      let timer=setTimeout(() => {
        //清除延时
        clearTimeout(timer)

        //当前页面+1
        this.tabList[this.tabActive].currentPage++;

        //调用获取文章数据列表方法
        this.getPostList(this.tabActive)
      }, 1000);
     
    }
  },
  watch: {
    // 监听当前标签
    tabActive(newTabIndex){
      //判断当前标签是否有文章数据，没有则调用获取文章数据列表方法
      this.tabList[newTabIndex].posts.length==0 && this.getPostList(newTabIndex)
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  // 头部
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    width: 100%;
    height: 13.889vw;
    color: #fff;
    background-color: #f00;

    .logo {
      i {
        font-size: 13.889vw;
      }
    }
    .search {
      width: 58.333vw;
      height: 9.444vw;
      font-size: 3.889vw;
      line-height: 9.444vw;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 4.722vw;

      i {
        font-size: 5vw;
      }
    }

    .user {
      width: 32px;
      height: 32px;
      line-height: 32px;
      i {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  // 导航
  .tab{
    position: relative;
    overflow: hidden;

    /deep/.van-tabs__wrap{
      padding-right: 40px;
    }

    /deep/.van-sticky--fixed{
      /deep/.van-tabs__wrap{
        padding-right: 0px;
      }
    }

    /deep/.van-tab {
      font-size: 5vw !important;
      // color: #000;
    }

    /deep/.van-sticky{
      background-color: #e4e4e4;
    }

    .tab-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 12.222vw;
      line-height: 12.222vw;
      text-align: center;
      background-color: #e4e4e4;

      i {
        display: block;
        font-size: 5vw;
        transform: rotate(-90deg);
      }
    }
  }
  
}
</style>