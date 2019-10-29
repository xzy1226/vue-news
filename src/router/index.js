import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Index from '@/pages/Index'
import Profile from '@/pages/Profile'
import EditProfile from '@/pages/EditProfile'
import MyFollow from '@/pages/MyFollow'
import MyComment from '@/pages/MyComment'
import MyCollection from '@/pages/MyCollection';

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: EditProfile
    },
    {
      path: '/myfollow',
      name: 'myfollow',
      component: MyFollow
    },
    {
      path: '/mycomment',
      name: 'mycomment',
      component: MyComment
    },{
      path: '/mycollection',
      name: 'mycollection',
      component: MyCollection
    }
  ]
})
