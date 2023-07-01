import { PageContainer } from "@ant-design/pro-layout";
import { Button, Layout, Menu } from "antd";
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