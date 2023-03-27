import login from './modules/login'
import user from './modules/user'
import shop from './modules/shop'
export default {
  gate: '',
  version: '',
  responseType: '', // 设置发送数据的类型是JSON还是BLOB
  requestType: '',
  list: {
    login,
    user,
    shop,
  },
}
