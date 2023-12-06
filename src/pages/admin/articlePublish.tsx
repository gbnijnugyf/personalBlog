import { Input, Menu, MenuProps, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
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
  children?: articleMemuItem[]; //分类下的文章列表
  icon?: JSX.Element;
}

export function ArticleManagerPage() {
  const [md, setMd] = useState("./test.md");
  const [listArr, setListdArr] = useState<articleMenu[]>([]);
  const [isAddClassifyOpen, setIsAddClassifyOpen] = useState(false);
  const userEditClassify = useRef("");
  const handleEditClassifyChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    userEditClassify.current = e.target.value;
  };
  const handleOk = () => {
    console.log(userEditClassify.current)
    setIsAddClassifyOpen(false);
  };
  const handleCancel = () => {
    setIsAddClassifyOpen(false);
  };
  const navigate = useNavigate();
  const testmd = require("./test.md");

  useEffect(() => {
    fetch(testmd)
      .then((res) => res.text())
      .then((text) => setMd(text));

    Service.getClassify().then(async (res) => {
      const classifyArr = res.data.data;
      const promises = classifyArr.map((classify) =>
        Service.getArticleListByClassify(classify).then((res) => {
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
        let menuList: articleMenu[] = res;
        menuList.push({
          key: "unique-add-classify",
          label: "新增分类",
          icon: <PlusCircleOutlined />,
        });
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
                    if (classify === "classify") {
                      setIsAddClassifyOpen(true);
                    } else {
                      navigate("edit", {
                        replace: true,
                        state: { classify: classify },
                      });
                    }
                  }

                  console.log(props.key);
                  // navigate("main/" + props.key, { replace: true });
                }
              }}
            />
            <Modal
              okText="确认添加"
              cancelText="取消"
              title="添加分类"
              open={isAddClassifyOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input showCount maxLength={20} onChange={handleEditClassifyChange} />
            </Modal>
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
