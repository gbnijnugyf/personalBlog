import { PageContainer } from "@ant-design/pro-layout";
import { Breadcrumb, Button, Layout, Menu, MenuProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { menuHeaderProps, menuHeaderPropsR } from "../../menu/menuProps";
import "./css/index.css";

export function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("detail");
  }, []);

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  return (
    <>
      {/* <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            items={menuHeaderPropsL}
            defaultSelectedKeys={["detail"]}
            onClick={(props) =>
              props.key.length !== 0 ? navigate(props.key) : null
            }
          ></Menu>
        </Header>
        <Content>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Content>
      </Layout> */}
      <Layout className="layout">

        <Menu
          // theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={menuHeaderProps}
          className="menu"
        />
        <Content>
          <div className="content" style={{ background: "colorBgContainer" }}>
            <br />
            <br />
            
          </div>
        </Content>
        <Footer className='footer' >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
