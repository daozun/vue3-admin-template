/**
 * 根据子节点返回所有父节点
 * @param {Array} list
 * @param {String} item
 * @returns []String
 */

export const recursionFn = (list, item) => {
  let res = []

  function recursion (list, paths = []) {
    for (const route of list) {
      if (route.path === item.path) {
        res = [...paths, ...[route.path]]
        return
      } else {
        if (route.children) {
          recursion(route.children, paths.concat([route.path]))
        }
      }
    }
  }

  recursion(list)

  return res
}
