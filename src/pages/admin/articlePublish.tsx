import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Markdown from "react-markdown";
import "./css/articlePublish.css";

export function ArticlePublishPage() {
  const [md, setMd] = useState("./test.md");

  const testmd = require("./test.md");
  useEffect(() => {
    fetch(testmd)
      .then((res) => res.text())
      .then((text) => setMd(text));
  });

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  return (
    <>
      <div className="article-layout">
        <Layout className="layout">
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content>
            <div className="content-md">
              <Markdown children={md} />
            </div>
          </Content>
        </Layout>
      </div>
    </>
  );
}
