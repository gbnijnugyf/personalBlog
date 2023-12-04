import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export function PersonalPage() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    useEffect(()=>{navigate("./personalInfo")},[])//TODO:默认路由通过此方法设置，空数组警告

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{ height: '100%' }}
                    defaultSelectedKeys={['personalInfo']}
                    // items={menuPersonalSider}
                    onClick={(props) => props.key.length !== 0 ? navigate(props.key) : null}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        color: 'black'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
