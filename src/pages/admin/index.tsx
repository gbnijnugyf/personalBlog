import { Layout, Tabs } from "antd";
import { Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import "./css/index.css";

export function AdminMainPage() {
  return (
    <>
      <Layout className="admin-layout">
        <Header className="menu">个人博客后台管理</Header>

        <Outlet />
      </Layout>
    </>
  );
}
