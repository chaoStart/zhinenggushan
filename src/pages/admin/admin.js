import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import memeoryUtils from '../../utils/memoryUtils'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout
/*
后台管理的路由组件
*/
export default class Admin extends Component {
    render() {
        const user = memeoryUtils.user
        console.log('您好！', user.username)
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: 'white', margin: '20px 20px 0' }}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#aaaaaa' }}>推荐使用谷歌浏览器，
                        可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}