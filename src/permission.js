import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log(
    '%c [ from ]-9',
    'font-size:13px; background:pink; color:#bf2c9f;',
    from
  )
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 有 token 并且从 login 页面进来
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单即使没有toke也可以登录进来（例如登录页面）
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from, failure) => {
  NProgress.done()
})
