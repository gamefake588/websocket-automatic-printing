export function listToTree(data, pid, pPath, isChildNull = false) {
  const d = []
  data.forEach((val) => {
    if (val.parentId === pid) {
      const list = listToTree(data, val.id, pPath + '/' + val.path, isChildNull)
      const obj = { ...val, path: pPath + '/' + val.path }
      if (!isChildNull || list.length !== 0) {
        obj.children = list
      }
      d.push(obj)
    }
  })
  return d
}

export function formatDate(date, fmt, isShowWeek = false) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt + (isShowWeek ? ' ' + week : '')
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 示例
// import { formatDate } from "./date";
// filters: {
// formatDate(time, format) {
//     if (time) {
//         var date = new Date(time);
//         return formatDate(date, format || "yyyy-MM-dd hh:mm:ss");
//     }
// }
// }

// 删除空的搜索项
export function deleteEmptyAttr(obj) {
  return Reflect.ownKeys(obj)
    .filter((item) => {
      return typeof obj[item] !== 'string' ? true : obj[item].trim()
    })
    .reduce((acc, cur) => {
      acc[cur] = obj[cur]
      return acc
    }, {})
}
// 下载文件
export function downFile(href) {
  // 创建a标签
  const eleLink = document.createElement('a')
  eleLink.style.display = 'none'
  eleLink.href = href
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

/*
 * 深拷贝
 * @param object
 * @return object
 */
export function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const cloneObj = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      if (typeof obj === 'object') {
        value !== null ? (cloneObj[key] = deepClone(value)) : (cloneObj[key] = value)
      } else {
        cloneObj[key] = value
      }
    }
  }
  return cloneObj
}

// 用于生成随机字符串的文本
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
/*
 * 生成随机字符串（首字母不为数字）
 * @param number
 * @return string
 */
export function getRandomString(length) {
  const res = new Array(length)
  for (let i = 0; i < res.length; i++) {
    res[i] = chars[Math.floor(Math.random() * (chars.length - (i === 0 ? 10 : 0)))]
  }
  return res.join('')
}

/*
 * 获取文本宽度
 * @param {string} text 要计算的文本
 * @param {string} font 字体：'14px "PingFang SC Regular"'
 * @return 返回文本的长度
 */
export function getTextWidth(text, font) {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

/*
 * 获取随机数字
 * @param {int} min 最小值
 * @param {int} max 最大值
 * @return int
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/*
 * 处理角色
 */
export function handlerRole() {
  const role = localStorage.getItem('Authorization')

  if (!role) return

  return role.indexOf('actoken') > -1 ? 'admin' : 'merchant'
}

// 只保留数字后两位
export function transformPrice(num) {
  return num ? +num.toFixed(2) : num
}
