import { createRouter, createWebHashHistory } from 'vue-router'

const constantRoutes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  //   hidden: true
  // },
  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: () => import('@/layout')
  // },
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
  //   children: [
  //     {
  //       path: '/dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       meta: { title: 'Dashboard', icon: 'dashboard' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: () => import('@/layout'),
  //   redirect: '/example/article',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'article',
  //       name: 'Article',
  //       component: () => import('@/views/article/index'),
  //       meta: { title: 'Article', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     },
  //     {
  //       path: 'upload',
  //       name: '上传头像',
  //       component: () => import('@/views/upload/index'),
  //       meta: { title: '上传头像', icon: 'upload' }
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
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'),
  //       redirect: '/nested/menu1/menu1-1',
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           redirect: '/nested/menu1/menu1-2/menu1-2-1',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: '/permission',
  //   component: () => import('@/layout'),
  //   name: 'Permission',
  //   children: [
  //     {
  //       path: '/permission',
  //       name: 'Permission',
  //       component: () => import('@/views/permission/index'),
  //       meta: { title: 'Permission', icon: 'lock' }
  //     }
  //   ]
  // },
  // {
  //   path: '/menu',
  //   component: () => import('@/layout'),
  //   name: 'Menu',
  //   children: [
  //     {
  //       path: '/menu',
  //       name: 'Menu',
  //       component: () => import('@/views/menu/index'),
  //       meta: { title: '菜单管理', icon: 'menu' }
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

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes: constantRoutes
// })

export function resetRouter () {
  const newRouter = createNewRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
