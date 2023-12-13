import { Input, Menu, MenuProps, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";

import "./css/commentEdit.css";
import "markdown-navbar/dist/navbar.css";
import "github-markdown-css/github-markdown-light.css";
import { Service } from "../../globe/service";
import { IMenuInfo } from "../../globe/inter";
import { articleMemuItem, articleMenu } from "./articlePublish";
import { IArticleEdit } from "./articleEdit";
import { CommentPage } from "../main/comment";
import { Link, useNavigate } from "react-router-dom";
import { replace } from "lodash";

export function CommentManagerPage() {
  const [listArr, setListdArr] = useState<articleMenu[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [isAddClassifyOpen, setIsAddClassifyOpen] = useState(false);
  const [nowClassify, setNowClassify] = useState(""); // 分类
  const [nowArticleID, setNowArticleID] = useState(""); // 分类

  useEffect(() => {
    Service.getClassify().then(async (res) => {
      console.log(res);
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
          key: "unique-message",
          label: "留言",
        });
        setListdArr(menuList);
      });
    });
  }, [display]);

  const handleChoose = (props: IMenuInfo) => {
    console.log(props);
    if (props.key.length !== 0) {
      //TODO:修改为评论/留言管理
      if (props.key === "unique-message") {
        //获取留言
        console.log("1");
      } else {
        //选中已存在列表中的文章
        setNowClassify(props.keyPath[1]);
        setNowArticleID(props.key);
        console.log(props.key);
      }
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
          </Sider>
          <Content>
            {nowClassify !== "" ? (
              <CommentEdit classify={nowClassify} ID={nowArticleID} />
            ) : (
              <p>请选择文章以查看评论</p>
            )}
          </Content>
        </Layout>
      </div>
    </>
  );
}

function CommentEdit(props: IArticleEdit) {
  const navigate = useNavigate();
  console.log(props);
  return (
    <>
    {/* TODO:打开新标签页并传参 */}
      <div
        onClick={() =>
          navigate("/main/article", { replace: true, state: { id: props.ID } })
        }
        className="back-div"
      >
        点我回到文章详情
      </div>
      <CommentPage articleId={props.ID} admin={true} />
    </>
  );
}
