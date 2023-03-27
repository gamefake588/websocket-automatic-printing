/**
 * 阿里iconfont配置
 **/

// 定义iconfont库
let iconfontVersion = ['3152666_w4v3bjfbwkk']
let iconfontUrlCss = `//at.alicdn.com/t/c/font_$key.css`

// 定义动态插入方法
const loadStyle = (url) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

// 动态插入
iconfontVersion.forEach((ele) => {
  loadStyle(iconfontUrlCss.replace('$key', ele))
})
