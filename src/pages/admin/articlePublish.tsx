import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import MarkNav from "markdown-navbar";
import remarkGfm from "remark-gfm";
import "./css/articlePublish.css";
import "markdown-navbar/dist/navbar.css";
import "github-markdown-css/github-markdown-light.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Service } from "../../globe/service";
import { IArticleList } from "../../globe/inter";
import { promises } from "dns";
interface articleMemuItem {
  key: string; //文章ID
  icon?: JSX.Element;
  label: string; //文章标题
}
interface articleMenu {
  key: string; //类别名称
  label: string; //类别名称
  children: articleMemuItem[]; //分类下的文章列表
}

export function ArticleManagerPage() {
  const [md, setMd] = useState("./test.md");
  const [listArr, setListdArr] = useState<articleMenu[]>([]);

  const navigate = useNavigate();
  const testmd = require("./test.md");

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

  useEffect(() => {
    fetch(testmd)
      .then((res) => res.text())
      .then((text) => setMd(text));

    Service.getClassify().then(async (res) => {
      const classifyArr = res.data.data;
      const promises = classifyArr.map((classify) =>
        Service.getArticleList(classify).then((res) => {
          const list: articleMemuItem[] = res.data.data.map((aitem) => {
            const temp: articleMemuItem = {
              key: aitem.ID,
              label: aitem.title,
            };
            return temp;
          });
          list.push({
            key: "unique-add-" + classify, //TODO：此处添加文章需要避开这个key，避免二义性
            label: "添加文章",
            icon: <PlusCircleOutlined />,
          });
          return {
            key: classify,
            label: classify,
            children: list,
          };
        })
      );

      Promise.all(promises).then((res) => {
        // console.log(res);
        setListdArr(res);
      });
    });
  }, []);

  return (
    <>
      <div className="article-layout">
        <Layout className="layout">
          <Sider>
            <Menu
              className="article-list"
              mode="inline"
              defaultSelectedKeys={["article"]}
              items={listArr}
              onClick={(props) => {
                if (props.key.length !== 0) {
                  if (props.key.startsWith("unique-add-")) {
                    //添加文章
                    const classify = props.key.split("-")[2]; //获取分类
                    navigate("edit", {
                      replace: true,
                      state: { classify: classify },
                    });
                  }
                  console.log(props.key);
                  // navigate("main/" + props.key, { replace: true });
                }
              }}
            />
          </Sider>

          <Content>
            {/* <Layout>
              <div className="markdown-body" id="content-md">
                <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} />
              </div>
              <Sider className="left-sider">
                <MarkNav className="toc-list" source={md} ordered={true} />
              </Sider>
            </Layout> */}
            <Outlet />
          </Content>
        </Layout>
      </div>
    </>
  );
}
