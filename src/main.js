// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

//引入组件库
import Vant from 'vant';
//注册组件库
Vue.use(Vant);
//引入组件样式文件
import 'vant/lib/index.css';

//设置全局的基准url
axios.defaults.baseURL='http://127.0.0.1:3000';

import { Toast } from 'vant';
//设置响应拦截器
axios.interceptors.response.use((res)=> {
  const {message,statusCode}=res.data;
  if(message && statusCode===401){
    Toast.fail(message);
  }
  return res;
});

Vue.prototype.$axios=axios;




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
