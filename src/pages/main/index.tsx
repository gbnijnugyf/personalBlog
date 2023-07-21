import { PageContainer } from "@ant-design/pro-layout";
import { Button, Layout, Menu, MenuProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { menuHeaderPropsL, menuHeaderPropsR } from "../../menu/menuProps";
import "./css/index.css"

export function MainPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('detail');
  },[])

  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  return (
    <>
      <Layout>
        <div className="menu-header">
          <Header>
            <img />
            <Menu
              theme="dark"
              mode="horizontal"
              items={menuHeaderPropsL}
              defaultSelectedKeys={['detail']}
              onClick={(props) => props.key.length !== 0 ? navigate(props.key) : null}
              className="menu-header-left"
            >
            </Menu>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
            <Menu
              theme="dark"
              mode="horizontal"
              items={menuHeaderPropsR}
              onClick={(props) => props.key.length !== 0 ? navigate(props.key) : null}
              className="menu-header-right"
            >
            </Menu>

          </Header>
        </div>

        <Content><Outlet /></Content>

      </Layout>

    </>
  )
}