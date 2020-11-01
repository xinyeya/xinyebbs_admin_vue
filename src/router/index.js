import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'index',
          path: '',
          component: () => import('@/views/index')
        },
        {
          name: 'articles',
          path: '/articles',
          component: () => import('@/views/articles')
        },
        {
          name: 'classify',
          path: '/classify',
          component: () => import('@/views/classify')
        },
        {
          name: 'labels',
          path: '/labels',
          component: () => import('@/views/labels')
        },
        {
          name: 'musics',
          path: '/musics',
          component: () => import('@/views/musics')
        },
        {
          name: 'contents',
          path: '/contents',
          component: () => import('@/views/contents')
        },
        {
          name: 'links',
          path: '/links',
          component: () => import('@/views/links')
        },
        {
          name: 'about',
          path: '/about',
          component: () => import('@/views/about')
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login')
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userinfo = localStorage.getItem("userinfo")
  if (to.path !== '/login') {
    // 判断是否有登录缓存
    if (userinfo) {
      // 如果已经登录，则允许进行下一步
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    // 防止有人直接输入路径跳转
    if (userinfo) {
      next({ name: 'home' })
      window.location.reload()
    } else {
      next()
    }
  }
});

export default router
