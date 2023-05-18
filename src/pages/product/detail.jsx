import React, { Component } from 'react'
import { List, Icon, Card } from 'antd'
import { reqCategory } from '../../api'
// import { BASE_IMG_PATH } from '../../utils/constants'
import LinkButton from "../../components/link-button";
import Yelun from '../../assets/images/yelun.jpg'
/*
商品详情组件
*/
export default class ProductDetail extends Component {
    state = {
        cName1: '', // 一级分类名称
        cName2: '' // 二级分类名称
    }
    /*
    异步获取当前产品对应的分类名称
    */
    getCategoryName = async () => {
        console.log('this.props.location.state返回数据', this.props.location.state)
        const { categoryId, pCategoryId } = this.props.location.state
        if (pCategoryId === '0') {
            // 获取一级分类名称
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name
            this.setState({ cName1 })
        } else {
            // 获取一级分类名称
            /*const result1 = await reqCategory(pCategoryId)
            const cName1 = result1.data.name
            // 获取二级分类名称
            const result2 = await reqCategory(categoryId)
            const cName2 = result2.data.name
            this.setState({cName1, cName2})*/
            /*
            一次发多个请求 , 等所有请求都返回后一起处理 , 如果有一个请求出错了 , 整个都会失败
            Promise.all([promise1, promise2]) 返回值一个 promise 对象 , 异步成功返回的是
            [result1, result2]
            */
            const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const result1 = results[0]
            const result2 = results[1]
            console.log('results是啥', results)
            console.log('----------------------')
            console.log('results[0]是啥', result1)
            const cName1 = result1.data.name
            const cName2 = result2.data.name
            this.setState({ cName1, cName2 })
        }
    }
    componentDidMount() {
        this.getCategoryName()
    }
    render() {
        const { name, desc, price, imgs, detail } = this.props.location.state
        const { cName1, cName2 } = this.state
        console.log('cName1和cName2', cName1, cName2)
        const title = (
            <span>
                <LinkButton onClick={() => {
                    this.props.history.goBack()
                }}>
                    <Icon type="arrow-left" style={{ fontSize: 20 }} />
                </LinkButton>
                &nbsp;&nbsp;商品详情
            </span>
        )

        const imgStyle = { width: 150, height: 130, marginRight: 10, border: '1px solid black' }
        return (
            <Card className='product-detail' title={title}>
                <List>
                    <List.Item>
                        <span className='left'>商品名称:</span>
                        <span className='right-description'>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品描述:</span>
                        <span className='right-description'>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品价格:</span>
                        <span className='right-description'>{price + ' 元'}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>所属分类:</span>
                        <span className='right-description'>{cName1 + (cName2 ? ' --> ' + cName2 : '')}</span>
                    </List.Item>
                    <List.Item style={{ height: 150 }}>
                        <span className='left'>商品图片:</span>
                        <span className='right-description'>
                            {
                                imgs.map(img => (
                                    // <img src={BASE_IMG_PATH + img} alt="img" key={img} style={imgStyle} />
                                    <img src={Yelun} alt="img" key={img} style={imgStyle} />
                                ))
                            }
                        </span>
                    </List.Item>
                    <List.Item style={{ marginTop: '15px' }}>
                        <span className='left'>商品详情:</span>
                        <div
                            className='right-description'
                            dangerouslySetInnerHTML={{ __html: detail }}></div>
                    </List.Item>
                </List>
            </Card>
        )
    }
}