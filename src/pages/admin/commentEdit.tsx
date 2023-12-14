import { Avatar, Input, List, Menu, MenuProps, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";

import "./css/commentEdit.css";
// import "markdown-navbar/dist/navbar.css";
// import "github-markdown-css/github-markdown-light.css";
import { Service } from "../../globe/service";
import { IComment, IMenuInfo } from "../../globe/inter";
import { articleMemuItem, articleMenu } from "./articlePublish";
import { IArticleEdit } from "./articleEdit";
import { CommentPage } from "../main/comment";
import { Link, useNavigate } from "react-router-dom";
import { replace } from "lodash";
import { UserOutlined } from "@ant-design/icons";

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
        setNowClassify("unique-message");
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
      <div className="comment-layout">
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
          <div className="content1">
            <Content>
              {nowClassify !== "" ? (
                nowClassify !== "unique-message" ? (
                  <CommentEdit classify={nowClassify} ID={nowArticleID} />
                ) : (
                  <Message />
                )
              ) : (
                <p>请选择文章/留言以查看</p>
              )}
            </Content>
          </div>
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

function Message() {
  const [msgList, setMsgList] = useState<IComment[]>();
  useEffect(() => {
    Service.getMessage().then((res) => {
      const list: IComment[] = res.data.data;
      setMsgList(list);
    });
  }, []);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={msgList}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} src={""} />}
              // title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
}
