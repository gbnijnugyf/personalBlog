import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import MarkNav from "markdown-navbar";
import remarkGfm from "remark-gfm";
import "./css/articlePublish.css";
import "markdown-navbar/dist/navbar.css";
import "github-markdown-css/github-markdown-light.css";

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
            <div className="markdown-body" id="content-md">
              <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} />
            </div>
          </Content>
          <Sider className="left-sider">
            <MarkNav className="toc-list" source={md} ordered={true} />
          </Sider>
        </Layout>
        
      </div>
      
    </>
  );
}
