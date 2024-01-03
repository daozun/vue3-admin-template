import router from './router'
import { error404 } from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { Store } from '@/store/index'
import { setRouter } from '@/utils/setRouter'
import { getAuthMenu } from '@/api/modules/role'
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
      if (Store().asyncRoute) {
        next()
      } else {
        addRouter(to, next)
      }
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
  getAuthMenu()
    .then((res) => {
      if (res.statusCode === RESPONSECODE.OK) {
        const asyncRouter = setRouter(res.data[0].children)

        for (const item of asyncRouter) {
          router.addRoute(item)
          router.options.routes.push(item)
        }

        router.addRoute(error404)

        Store().setAsyncRoute(true)
        next({ ...to, replace: true })
      } else {
        ElMessage({
          message: '获取动态菜单失败',
          type: 'error'
        })

        next()
      }
    })
    .catch((err) => {
      ElMessage({
        message: '获取动态菜单失败',
        type: err
      })

      next()
    })
}
