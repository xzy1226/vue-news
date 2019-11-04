<template>
  <div class="container">
    <headerNav title="栏目管理" />

    <div class="remove-category">
      <div class="title">点击删除以下频道</div>
      <div class="content">
        <div class="tag-remove" 
          v-for="(item,index) in activeTag" 
          :key="index"
          @click="removeCategory(index)"
        >{{item.name}}</div>
      </div>
    </div>

    <div class="add-category">
      <div class="title">点击添加以下频道</div>
      <div class="content">
        <div class="tag-add" v-for="(item,index) in deactiveTag" :key="index" @click="addCategory(index)">{{item.name}}</div>

      </div>
    </div>
  </div>
</template>

<script>
import headerNav from '../components/headerNav';
export default {
  components: {headerNav},
  data() {
    return {
      activeTag: [],    //激活标签
      deactiveTag: []   //未激活标签
    }
  },
  watch: {
    activeTag(){
      localStorage.setItem('activeTag',JSON.stringify(this.activeTag))
    },
    deactiveTag(){
      localStorage.setItem('deactiveTag',JSON.stringify(this.deactiveTag))
    }
  },
  mounted() {
    //判断激活标签是否存在
    localStorage.getItem('activeTag')?
      this.activeTag=JSON.parse(localStorage.getItem('activeTag')):
      this.$axios.get('/category').then(res=>{
        this.activeTag=res.data.data;
      });
    
    //判断未激活标签是否存在    
    this.deactiveTag=localStorage.getItem('deactiveTag')?JSON.parse(localStorage.getItem('deactiveTag')):[];
    
  },
  methods: {
    addCategory(index){
      //数据交互
      this.activeTag.push(this.deactiveTag[index]);
      this.deactiveTag.splice(index,1)
    },
    removeCategory(index){
      //限定 '关注' 和 '头条' 不能删除
      let name=this.activeTag[index].name;
      if(name=='关注'||name=='头条') return;
      //数据交互
      this.deactiveTag.push(this.activeTag[index]);
      this.activeTag.splice(index,1)
    }
  },
}
</script>

<style lang="less" scoped>
  .container{

    .remove-category{
      padding: 10px;

      .title{
        font-size: 12px;
      }

      .content{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 74px);
        // grid-template-rows: repeat(auto-fill, 20px);
        grid-gap: 10px 15px;

        margin: 10px auto;
        // background-color: #fbfbfb;

        .tag-remove{
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          border-radius: 3px;
          border: 1px solid #ddd;
          background-color: #f8f8f8;
        }
      }
    }

    .add-category{
      padding: 10px;

      .title{
        font-size: 12px;
      }

      .content{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 74px);
        // grid-template-rows: repeat(auto-fill, 20px);
        grid-gap: 10px 15px;
        margin: 10px auto;


        .tag-add{
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          border-radius: 3px;
          color: #010101;
          background-color: skyblue;
        }
      }
    }
  }
</style>