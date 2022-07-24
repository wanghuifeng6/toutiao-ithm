// 封装存储数据的方法(第一个参数为键名,第二个参数为数据)
export const setItem = (key, value) => {
  // 将数组,对象类型的数据转换为JSON格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 封装获取数据的方法
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 封装删除数据的方法
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
