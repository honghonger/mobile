// 封装本地存储模块
export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(name))
}
export const setItem = (name, value) => {
  return window.localStorage.setItem(name, JSON.stringify(value))
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
