export const setRouter = (routerParamList) => {
  const routerList = []

  try {
    for (const item of routerParamList) {
      let newRouter
      newRouter = {
        path: item.path,
        name: item.name,
        meta: handleStringToObj(item.meta, item),
        alwaysShow: item.alwaysShow,
        hidden: item.hidden,
        component: (resolve) =>
          require.ensure([], (require) => require(`@/${item.component}`)),
        parent_id: item.parent_id ? item.parent_id : '',
        id: item.id
      }

      if (item.children && item.children.length > 0) {
        const child = setRouter(item.children)
        newRouter = { ...newRouter, children: child }
      }

      // 默认重定向地址
      if (item.redirect) {
        newRouter = { ...newRouter, redirect: item.redirect }
      }

      routerList.push(newRouter)
    }
  } catch (error) {
    console.error(error)
    return []
  }

  return routerList
}

const handleStringToObj = (str, item) => {
  if (str) {
    // eslint-disable-next-line no-eval
    const obj = eval('(' + str + ')')

    obj.id = item.id
    obj.parent_id = item.parent_id ? item.parent_id : ''

    return obj
  }
}

export const listToTree = (items, id = null, link = 'parent_id') =>
  items
    .filter((item) => item[link] === id)
    .map((item) => ({
      ...item,
      children: listToTree(items, item.id)
    }))
