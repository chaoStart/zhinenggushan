/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')


/*
通过 jsonp 请求获取天气信息
*/
export function reqWeather(city) {
  const url =
    `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
  9MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === 'success') {
        const { dayPictureUrl, weather } = response.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        alert(' 获取天气信息失败')
      }
    })
  })
}