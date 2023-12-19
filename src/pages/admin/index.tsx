import { Layout, Menu, Tabs } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./css/index.css";
import Sider from "antd/es/layout/Sider";
import { useEffect } from "react";
import { menuAdminSider } from "../../menu/menuProps";
import { Service } from "../../globe/service";

export function AdminMainPage() {
  const localtion = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/admin/login");
    }
  }, [localtion.pathname]);

  return (
    <>
      <Layout className="admin-layout">
        <Header className="menu">个人博客后台管理</Header>
        {!localtion.pathname.startsWith("/admin/main") ? (
          <></>
        ) : (
          <Sider style={{ marginTop: "8vh" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["article"]}
              // defaultOpenKeys={["sub1"]}
              style={{ height: "92vh" }}
              items={menuAdminSider}
              onClick={async (props) => {
                if (props.key.length !== 0) {
                  if (props.key === "loginout") {
                    await Service.adminLoginout().then(() =>
                      localStorage.removeItem("token")
                    ).catch(()=>{
                      // error("登出失败！")
                    });
                  }
                  navigate("main/" + props.key, { replace: true });
                }
              }}
            />
          </Sider>
        )}
        <Content className="admin-content">
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}

export function MainContent() {
  return (
    <>
      <Layout className="main-content-layout">
        <Content>
          <div className="content" style={{ background: "colorBgContainer" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </>
  );
}
