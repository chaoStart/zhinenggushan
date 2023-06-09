import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateProductStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option
/*
商品管理的主界面路由
*/
export default class ProductHome extends Component {
    state = {
        total: 0, // 商品的总数量
        products: [], // 当前页列表数据
        searchType: 'productName', // 搜索类型 productName / productDesc
        searchName: '', // 搜索关键字
    }
    /*
    更新指定产品的状态
    */
    updateProductStatus = async (productId, status) => {
        const result = await reqUpdateProductStatus(productId, status)
        if (result.status === 0) {
            message.success(' 更新状态成功!')
            this.getProducts(this.pageNum || 1)
        }
    }
    /*
    初始化生成 Tabe 所有列的数组
    */
    initColumns = () => {
        this.columns = [
            {
                title: ' 订单名称',
                dataIndex: 'name'
            },
            {
                title: ' 订单描述',
                dataIndex: 'desc'
            },
            {
                title: ' 价格',
                dataIndex: 'price',
                render: (price) => <span>¥{price}</span>
            },
            {
                title: ' 状态',
                width: 100,
                dataIndex: 'status',
                render: (status, product) => { // 1: 在售 , 2: 已下架
                    let btnText = ' 进行中'
                    let statusText = ' 正在加工'
                    if (status === 2) {
                        btnText = ' 停止'
                        statusText = ' 已完成订单'
                    }
                    status = status === 1 ? 2 : 1
                    return (
                        <span>
                            <Button type='primary' onClick={() =>
                                this.updateProductStatus(product._id, status)}>{btnText}</Button>
                            <span>{statusText}</span>
                        </span>
                    )
                }
            },
            {
                title: ' 操作',
                width: 100,
                render: (product) => (
                    <span>
                        <LinkButton onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
                        &nbsp;&nbsp;&nbsp;
                        <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
                    </span>
                )
            },
        ]
    }
    /*
    异步获取指定页的数据
    */
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        const { searchType, searchName } = this.state
        console.log('看看页面和搜索类型', pageNum, '-->', searchName, '-->', searchType)
        let result
        if (searchName) { // 搜索分页
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
        } else { // 一般分页
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        console.log('getProducts()分页列表请求回来的数据:', result)
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list
            })
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { products, total, searchType } = this.state
        const title = (
            <span>
                <Select value={searchType} onChange={value => this.setState({
                    searchType: value
                })}>
                    <Option key='productName' value='productName'>按名称搜索</Option>
                    <Option key='productDesc' value='productDesc'>按描述搜索</Option>
                </Select>
                <Input style={{ width: 150, marginLeft: 10, marginRight: 10 }} placeholder='关键字'
                    onChange={(e) => this.setState({ searchName: e.target.value })} />
                {/* 这边getProducts(1)是什么都不输入的时候，点击自动跳转到默认的第1页 */}
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary' style={{ float: 'right' }} onClick={() => {
                console.log('能点击进入product/addupdate子路由页面')
                this.props.history.push('/product/addupdate')
            }
            }>
                <Icon type='plus' />
                添加商品
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        rowKey='_id'
                        columns={this.columns}
                        dataSource={products}
                        pagination={{
                            defaultPageSize: PAGE_SIZE,
                            total,
                            showQuickJumper: true,
                            onChange: this.getProducts
                        }}
                    />
                </Card>
            </div>
        )
    }
}