/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
// import { message } from 'antd'
import ajax from './ajax'

const BASE = 'http://localhost:5000'
// const BASE = ''
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')


/*
通过 jsonp 请求获取天气信息
*/
export function reqWeather() {
  const url =
    //   `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
    // 9MVra6urFRGOT9s8UBWr2`
    `https://restapi.amap.com/v3/weather/weatherInfo?city=320100&key=be1b1b3b45c463a230cb2638d7fb7a11&extensions=base&output=JSON`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === '1') {
        // const { dayPictureUrl, weather } = response.lives[0].weather_data[0]
        // resolve({ dayPictureUrl, weather })
        console.log('返回数据了吗？')
        console.log('response是什么', response.lives[0])
        const { city, weather, temperature } = response.lives[0]
        resolve({ city, weather, temperature })
      } else {
        alert(' 获取天气信息失败')
      }
    })
  })
}

// 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })
// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add',
  {
    parentId,
    categoryName
  }, 'POST')
// 更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax('/manage/category/update', {
    categoryId,
    categoryName
  }, 'POST')

// 根据分类 ID 获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId })
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })
// 根据 ID/Name 搜索产品分页列表
export const reqSearchProducts = ({ pageNum, pageSize, searchType, searchName }) =>
  ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
  })
// 添加 / 更新商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' +
  (product._id ? 'update' : 'add'), product, 'post')
// 对商品进行上架 / 下架处理
export const reqUpdateProductStatus = (productId, status) =>
  ajax('/manage/product/updateStatus', {
    productId,
    status
  }, 'POST')
// 删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', { name }, 'post')
