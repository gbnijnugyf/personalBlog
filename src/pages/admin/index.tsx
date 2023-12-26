import { Layout, Menu, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./css/index.css";
import Sider from "antd/es/layout/Sider";
import { useEffect } from "react";
import { menuAdminSider } from "../../menu/menuProps";
import { Service } from "../../globe/service";

export function AdminMainPage() {
  const localtion = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  function error(text: string = "登出失败") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/admin/login");
    }
  }, [localtion.pathname]);

  return (
    <>
      {contextHolder}
      <Layout className="admin-layout">
        <Header className="menu">个人博客后台管理</Header>
        {!localtion.pathname.startsWith("/admin/main") ? (
          <></>
        ) : (
          <Sider style={{ marginTop: "8vh" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["article"]}
              style={{ height: "92vh" }}
              items={menuAdminSider}
              onClick={async (props) => {
                if (props.key.length !== 0) {
                  if (props.key === "loginout") {
                    await Service.adminLoginout()
                      .then(() => localStorage.removeItem("token"))
                      .catch(() => {
                        error();
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
