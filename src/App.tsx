import React, {useEffect} from "react";
import './App.css';
import 'antd/dist/antd.css'
import Navbar from "./components/Navbar/Navbar";
import Games from "./components/Games/Games"
import {Link, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersPage} from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeApp} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {Login} from "./components/Login/Login";

import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Avatar, Breadcrumb, Col, Layout, Menu, Row} from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";
import Header from "./components/Header/Header";

const { Content, Sider} = Layout;


type MapPropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}

const App: React.FC<MapPropsType & MapDispatchPropsType> = (props) => {
    useEffect(() => {
        props.initializeApp()
    })
    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <Layout>
            <Header />
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                            <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                            <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                            <Menu.Item key="5"><Link to='/users'>Users</Link></Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path='/' element={<ProfileContainer/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}/>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/dialogs' element={<DialogsContainer/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/users' element={<UsersPage/>}/>
                            <Route path='/games' element={<Games/>}/>
                            <Route path='*' element={<div>404 page not found</div>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout>

        /*<div className="App-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="App-wrapper-content">
                <Routes>
                    <Route path='/' element={<ProfileContainer/>}/>
                    <Route path='/profile' element={<ProfileContainer/>}/>
                    <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/users' element={<UsersPage/>}/>
                    <Route path='/games' element={<Games/>}/>
                    <Route path='*' element={<div>404 page not found</div>}/>
                </Routes>
            </div>
        </div>*/
    );
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
