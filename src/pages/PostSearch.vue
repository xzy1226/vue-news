<template>
  <div class="container">
    <!-- 头部 -->
    <div class="search-header">
      <i class="iconfont iconjiantou2"></i>

      <div class="search-input">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="搜索新闻">
      </div>

      <div class="search-btn" >搜索</div>
    </div>

    <div class="history-record">
      
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .container{
    .search-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #eee;

      .iconjiantou2{
        font-size: 16px;
      }

      .search-input{  
        flex: 1;
        height: 40px;
        padding-left: 20px;
        margin: 0 10px;
        border: 1px solid #ddd;
        line-height: 40px;
        border-radius: 20px;
        text-align: left;

        input{
          width: 85%;
          height: auto;
          font-size: 14px;
          outline: 0;
          border: none;
          background: none;
        }
      }

    }
  }
</style>