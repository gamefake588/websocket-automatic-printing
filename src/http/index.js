import axios from 'axios'
import portList from './ports.js'
import { handlerRole } from '@/utils/tools'

import Cookies from 'js-cookie'

// import {getCookie} from '../common/cookie';
const CURRENTURL = window.location.href

const _axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data =
        config.headers['Content-Type'].indexOf('form-data') > -1
          ? transFormData(config.data)
          : JSON.stringify(config.data)
    }
    // const token = getCookie('token');
    // if (token) {
    //     config.headers.Authorization = 'Bearer' + token;
    // }
    return config
  },
  (error) => {
    console.log(`发送请求错误！${error}`)
  }
)

// 返回状态判断(添加响应拦截器)
_axios.interceptors.response.use(
  (res) => {
    let data = []
    // console.log(res);
    // 对响应数据做些事
    if (res.status === 200) {
      data = res.data ? res.data : res
      if (data.code === 20102) {
        setTimeout(() => {
          window.location.href = `./#/login`
        }, 500)
      } else if (data.code != 0) {
        return Promise.reject(data)
      }

      // console.log(data);
    }
    return data
  },
  (err) => {
    console.log(err)

    // 请求重发 { retry: 5, retryDelay: 1000 }
    var config = err.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err)

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err)
    }

    // Increase the retry count
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config)
    })
    // 响应错误
    if (err.response && err.response.status) {
      const status = err.response.status
      switch (status) {
        case '400':
          console.log('请求错误' + status)
          break
        case '401':
          // window.location.href = `./#/login?redirect=${encodeURIComponent(CURRENTURL)}`;
          console.log('请求错误' + status)
          break
        case '500':
          console.log('服务器内部错误：' + status)
          break
        default:
          console.log('请求失败' + status)
      }
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
)

// ----------------初始化API实例-----------------------
let API = {}
function run(note) {
  // console.log(note);
  // 组装地址
  let gate = note.gate || portList.gate
  let version = note.version || portList.version
  let url = note.base ? note.base : '/api'
  let type = (note.type || 'get').toLocaleLowerCase()
  let contentType = note.contentType
  let retry = note.retry || 0
  let retryDelay = note.retryDelay || 1000

  let authorization = note.authorization || portList.authorization
  if (gate) {
    url += '/' + gate
  }
  if (version) {
    url += '/' + version
  }
  url += note.url
  return function (data) {
    // console.log('访问了：' + url);
    // console.log('传递参数为：');
    // console.log(data);
    // console.log(url);
    let requestUrl = url
    let re = _axios
    if (data.childPath) {
      requestUrl += data.childPath
    }
    delete data.childPath

    // 添加请求头
    const headers = {}

    if (note.base.indexOf('ach18') > -1) {
      headers.Authorization = Cookies.get('AC_USER_TOKEN')
    } else if (
      note.base.indexOf('api') > -1 ||
      note.base.indexOf('acshop') > -1
    ) {
      headers['access-token'] = Cookies.get('AC_USER_TOKEN')
    }

    if (type === 'post') {
      // console.log(localStorage.getItem("Authorization"));
      re = new Promise((resolve, reject) => {
        _axios
          .post(requestUrl, data, {
            headers: {
              'Content-Type': setContentType(contentType),
              ...headers,
            },
            retry,
            retryDelay,
          })
          .then(
            (res) => {
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
      })
    }
    if (type === 'get') {
      if (note.responseType) {
        re = new Promise((resolve, reject) => {
          _axios({
            method: 'get',
            url: requestUrl,
            params: data,
            responseType: note.responseType,
            headers,
            retry,
            retryDelay,
          }).then(
            (res) => {
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
        })
      } else {
        re = new Promise((resolve, reject) => {
          _axios
            .get(requestUrl, { params: data, headers, retry, retryDelay })
            .then(
              (res) => {
                resolve(res)
              },
              (err) => {
                reject(err)
              }
            )
        })
      }
    }
    return re
  }
}

for (let p in portList.list) {
  API[p] = {}
  for (let l in portList.list[p]) {
    API[p][l] = run(portList.list[p][l])
  }
}

function setContentType(type) {
  return type || 'application/json; charset=utf-8'
}

function transFormData(data) {
  let form = new FormData()
  let keys = Object.keys(data)
  keys.forEach((key) => {
    form.append(key, data[key])
  })
  return form
}

export default API
