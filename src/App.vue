<template>
  <div id="app">
    <keep-alive include="index">
      <router-view/>
    </keep-alive>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a{
    color: inherit;
  }

  a:hover{
    text-decoration: none;
  }

  ul,li,ol{
    list-style: none;
  }


</style>
