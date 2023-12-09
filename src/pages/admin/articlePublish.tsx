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
import {
  ClaOrFri,
  IAddClassify,
  IArticleList,
  IMenuInfo,
} from "../../globe/inter";
import { promises } from "dns";
import TextArea from "antd/es/input/TextArea";
import { ArticleEdit } from "./articleEdit";
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
  const [display, setDisplay] = useState<boolean>(false);
  const [isAddClassifyOpen, setIsAddClassifyOpen] = useState(false);
  const userEditClassify = useRef("");
  const userEditClassifyDescribe = useRef("");
  const [nowClassify, setNowClassify] = useState(""); // 分类
  const [nowArticleID, setNowArticleID] = useState(""); // 分类
  const handleEditClassifyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    userEditClassify.current = e.target.value;
  };
  const handleEditClassifyDescribeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    userEditClassifyDescribe.current = e.target.value;
  };
  const handleOk = () => {
    console.log(userEditClassify.current);
    console.log(userEditClassifyDescribe.current);
    const tempForm: IAddClassify<ClaOrFri.classify> = {
      type: ClaOrFri.classify,
      data: {
        name: userEditClassify.current,
        description: userEditClassifyDescribe.current,
      },
    };
    Service.addClassify(tempForm).then((res) => {
      console.log(res);
      setDisplay(!display);
    });
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
      const classifyArr = res.data.data.map((item) => item.name);
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
  }, [display]);

  const handleChoose = (props: IMenuInfo) => {
    console.log(props);
    if (props.key.length !== 0) {
      const classify = props.key.split("-")[2]; //获取分类
      if (props.key.startsWith("unique-add-")) {
        if (classify === "classify") {
          setIsAddClassifyOpen(true);
        } else {
          setNowClassify(classify);
          setNowArticleID("");

          //添加文章
          // navigate("edit", {
          //   replace: true,
          //   state: { classify: classify },
          // });
        }
      } else {
        //选中已存在列表中的文章
        setNowClassify(classify);
        setNowArticleID(props.key);
        console.log(props.key);
      }

      // navigate("main/" + props.key, { replace: true });
    }
  };

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
              onClick={handleChoose}
            />
            <Modal
              okText="确认添加"
              cancelText="取消"
              title="添加分类"
              open={isAddClassifyOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              分类名称：
              <Input
                showCount
                maxLength={15}
                onChange={handleEditClassifyChange}
              />
              分类描述：
              <TextArea
                showCount
                rows={4}
                placeholder="maxLength is 200"
                maxLength={200}
                onChange={handleEditClassifyDescribeChange}
              />
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
            {nowClassify !== "" ? (
              <ArticleEdit classify={nowClassify} ID={nowArticleID} />
            ) : (
              <p>请选择文章或添加文章</p>
            )}
            {/* <ArticleEdit classify={nowClassify} ID={nowArticleID} /> */}
            {/* <Outlet /> */}
          </Content>
        </Layout>
      </div>
    </>
  );
}
