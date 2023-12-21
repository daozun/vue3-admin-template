import { ROLE } from '@/enum/index'
import { getUserInfo } from '@/utils/auth'

export const handleBtnPermission = (app) => {
  app.directive('permission', {
    mounted (el, binding, vnode, prevVnode) {
      if (getUserInfo()?.user_role === ROLE.NORMAL) {
        el.parentNode.removeChild(el)

        return
      }
    }
  })
}
