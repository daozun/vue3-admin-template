import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { setRouter } from '@/utils/setRouter'
import { getRoleMenu } from './api/modules/role'
import { RESPONSECODE } from '@/enum'

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 有 token 并且从 login 页面进来
      next({ path: '/' })
      NProgress.done()
    } else {
      addRouter(to, next)
      // next()
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

const addRouter = (to, next) => {
  getRoleMenu()
    .then((res) => {
      if (res.statusCode === RESPONSECODE.OK) {
        setRouter(res.data)
        next()
      } else {
        ElMessage({
          message: '获取动态菜单失败',
          type: 'error'
        })

        next()
      }
    })
    .catch(() => {
      ElMessage({
        message: '获取动态菜单失败',
        type: 'error'
      })

      next()
    })
}
