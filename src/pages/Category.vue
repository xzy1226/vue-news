<template>
  <div class="container">
    <headerNav title="栏目管理" />

    <div class="remove-category">
      <div class="title">点击删除以下频道</div>
      <div class="content">
        <div class="tag-remove" v-for="(item,index) in removeTag" :key="index">{{item.name}}</div>
      </div>
    </div>

    <div class="add-category">
      <div class="title">点击添加以下频道</div>
      <div class="content">
        <div class="tag-add" v-for="(item,index) in addTag" :key="index" @click="addCategory(index)">{{item.name}}</div>

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
      removeTag: [],
      addTag: []
    }
  },
  mounted() {
    this.$axios.get('/category').then(res=>{

      this.removeTag=res.data.data.filter(item=> item.is_top==1);
      this.addTag=res.data.data.filter(item=> item.is_top==0);

      console.log(this.removeTag)
      console.log(this.addTag)
    })
  },
  methods: {
    addCategory(index){
      let name=this.addTag[index].name;
      console.log(name)

      this.$axios.post('/category',{
        name: this.addTag[index].name,
        is_top: 1
      })
      .then(res=>{

        this.removeTag.push(this.addTag[index]);
        this.addTag.splice(index,1)
      })
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