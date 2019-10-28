// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vant from 'vant'
import {Toast} from 'vant';


//引入组件样式文件
import 'vant/lib/index.css';
//注册组件库
Vue.use(Vant);

// 设置轻提示框的展示时长
Toast.setDefaultOptions({
  duration: 1000
})

//路由守卫
router.beforeEach((to, from, next) => {

  const pagesNeedAuth=['/profile','/editprofile']

  if (pagesNeedAuth.includes(to.path)) {
    localStorage.getItem('token') ? next() : router.push({name: 'login'});
    // localStorage.getItem('token') ? next() : next('/login')
    // localStorage.getItem('token') ? next() : location.href='#/login';
  }else{
    next();
  }
})

//设置全局的基准url
axios.defaults.baseURL = 'http://127.0.0.1:3000';
// axios.defaults.baseURL = 'http://111.230.181.206:3000';

// 设置请求拦截器
axios.interceptors.request.use(config => {
  //设置请求头
  if(!config.headers.Authorization&& localStorage.getItem('token')){
    config.headers.Authorization = localStorage.getItem('token');
  }
  
  return config
})

//设置响应拦截器
axios.interceptors.response.use((res) => {
  const {
    message,
    statusCode
  } = res.data;
  //请求失败提示信息
  if (message && statusCode === 401 && !router.currentRoute.name.includes('index')) Toast.fail(message);
  
  //token信息过期或错误，跳转到登录
  if(message=='用户信息验证失败') router.push({name: 'login'});
  return res;
});


Vue.prototype.$axios = axios;




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
