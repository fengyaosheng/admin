import Cookies from 'js-cookie'


const TokenKey = 'vue_admin_template_token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return localStorage.removeItem(TokenKey)
}

//  生成新的页面
export const  jumpNative = (Obj, iosObj) =>{
  if (util.is_iphone()) {
      iosObj = JSON.stringify(iosObj);
      window.webkit.messageHandlers.jumpNative.postMessage(iosObj);
  } else if (util.is_android()) {
      Obj = JSON.stringify(Obj);
      window.messageHandlers.jumpNative(Obj);
  }
}

