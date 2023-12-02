import { PageContainer } from "@ant-design/pro-layout";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { items, menuHeaderProps, menuHeaderPropsR } from "../../menu/menuProps";
import "./css/index.css";
import { DownOutlined } from "@ant-design/icons";

export function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("detail");
  }, []);

  return (
    <>
      <Layout className="layout">
        <Header className="menu">
          <Menu
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["detail"]}
            items={menuHeaderProps}
            className="menu-center"
            onClick={(props) => {
              if (props.key.length !== 0) {
                console.log(props.key);

                navigate(props.key, { replace: true });
              }
            }}
          />
          <Dropdown menu={{ items }} className="menu-right">
            <a onClick={(e) => e.preventDefault()}>
              Setting
            </a>
          </Dropdown>
          {/* <Menu
            mode="horizontal"
            items={menuHeaderPropsR}
            className="menu-right"
            onClick={(props) => {
              if (props.key.length !== 0) {
                console.log(props.key);

                navigate(props.key, { replace: true });
              }
            }}
          /> */}
        </Header>
        <Content>
          <div className="content" style={{ background: "colorBgContainer" }}>
            <Outlet />
          </div>
        </Content>
        <Footer className="footer">
          Personal Blog ©2023 Created by gbnijnugyf
        </Footer>
      </Layout>
    </>
  );
}
