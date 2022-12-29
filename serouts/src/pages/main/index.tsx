import { PageContainer } from "@ant-design/pro-layout";
import { Button, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import { menuHeaderProps } from "../../menu/menuProps";
import "./css/index.css"

export function MainPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* <PageContainer
        extra={[
          <Button key="3">Operating</Button>,
          <Button key="2">Operating</Button>,
          <Button key="1" type="primary">
            Main Operating
          </Button>,
        ]}
        footer={[
          <Button key="4">reset</Button>,
          <Button key="5" type="primary">submit</Button>
        ]}
        className="container"
      >
        fdsfads
        <Outlet />
      </PageContainer> */}

      <Layout>
        <div className="menu-header">

          <Header>
            <img />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={menuHeaderProps}
              onClick={(props) => navigate(props.key)}
              className="menu-header-left"
            >
            </Menu>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              // items={}
              onClick={(props) => navigate(props.key)}
              className="menu-header-right"
            >
            </Menu>

          </Header>
        </div>
        <Layout>
          {/* <Sider>left sidebar</Sider> */}

          <Content>fda <Outlet /></Content>

        </Layout>

        <Footer>footer</Footer>
      </Layout>
    </>
  )
}