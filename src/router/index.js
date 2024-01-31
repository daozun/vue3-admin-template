import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * hidden: true                   true 表示不显示在侧边栏，false 显示在侧边栏
 * meta : {
 *   title: 'xxx'                 用在显示左侧边栏名称
 *   icon： 'xxx'                 图标
 *   isNest: false                true 表示嵌套菜单显示，false不嵌套显示
 * }
 */

/**
 * 动态路由加载的注意点：
 * 1. name 一定要是独一无二的！！！
 * 2. 如下面的 dashboard，父路由和子路由的地址指向一致，那么子路由一定要加上 `/` 如下面的 dashboard
 * 3. 如果子路由的地址指向前面是父路由地址，如下面的 example，那么子路由不要加上 `/`
 */

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
    hidden: true
  }
  // {
  //   path: '/dashboard',
  //   component: () => import('@/layout'),
  //   name: 'Dashboard',
  //   meta: { isNest: false }
  //   children: [
  //     {
  //       path: '/dashboard',
  //       name: 'ChildDashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: 'Dashboard', icon: 'dashboard', isNest: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: () => import('@/layout'),
  //   redirect: '/example/article',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example', isNest: true },
  //   children: [
  //     {
  //       path: 'article',
  //       name: 'Article',
  //       component: () => import('@/views/article/index'),
  //       meta: { title: 'Article', icon: 'table', isNest: false }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree', isNest: false }
  //     },
  //     {
  //       path: 'upload',
  //       name: '上传头像',
  //       component: () => import('@/views/upload/index'),
  //       meta: { title: '上传头像', icon: 'upload', isNest: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: () => import('@/layout'),
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested',
  //     isNest: true
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'),
  //       redirect: '/nested/menu1/menu1-1',
  //       name: 'Menu1',
  //       meta: { title: 'Menu1', isNest: true },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1', isNest: false }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           redirect: '/nested/menu1/menu1-2/menu1-2-1',
  //           meta: { title: 'Menu1-2', isNest: true },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1', isNest: false }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2', isNest: false }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3', isNest: false }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2', isNest: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/permission',
  //   component: () => import('@/layout'),
  //   name: 'Permission',
  //   meta: { isNest: false }
  //   children: [
  //     {
  //       path: '/permission',
  //       name: 'ChildPermission',
  //       component: () => import('@/views/permission/index'),
  //       meta: { title: 'Permission', icon: 'lock', isNest: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/menu',
  //   component: () => import('@/layout'),
  //   name: 'Menu',
  //   meta: { isNest: false }
  //   children: [
  //     {
  //       path: '/menu',
  //       name: 'ChildMenu',
  //       component: () => import('@/views/menu/index'),
  //       meta: { title: '菜单管理', icon: 'menu', isNest: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/editor',
  //   component: () => import('@/layout'),
  //   name: 'Editor',
  //   meta: { isNest: false },
  //   children: [
  //     {
  //       path: '/editor',
  //       name: 'ChildEditor',
  //       component: () => import('@/views/editor/index'),
  //       meta: { title: '富文本编辑器', icon: 'editor', isNest: false }
  //     }
  //   ]
  // },
  // {
  //   path: '/:pathMatch(.*)',
  //   name: 'not-found',
  //   component: () => import('@/views/404.vue'),
  //   hidden: true
  // }
]

export const error404 = {
  path: '/:pathMatch(.*)',
  name: 'not-found',
  component: () => import('@/views/404.vue'),
  hidden: true
}

const createNewRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
  })

const router = createNewRouter()

export default router
