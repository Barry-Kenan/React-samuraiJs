import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Divider, Layout, Menu, Row, Typography} from "antd";
import {LaptopOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";

const { Text } = Typography;

const Header:React.FC = () => {
    const {Header} = Layout;

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentLogin)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header className="header">
            <div className="logo"/>

            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<LaptopOutlined/>}><Link to='/users'>Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    {isAuth
                        ? <div>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            <Divider type={"vertical"} style={{color:"white"}} />
                           <Text type={"success"}>{login}</Text>
                            <Divider type={"vertical"}  />
                            <Button  onClick={logoutCallback}>Logout</Button></div>
                        :<Button><Link to={'/login'}>Login</Link></Button> }

                </Col>
            </Row>
        </Header>
        /*<header className={s.header}>
            <img src="https://w7.pngwing.com/pngs/662/202/png-transparent-dragon-day-spa-logo-art-dragon-logo-legendary-creature-mammal-carnivoran.png" alt="Coca-cola"/>

            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>*/
    )
}

export default Header