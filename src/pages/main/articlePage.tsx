import { useLocation, useParams } from "react-router-dom";
import { Service } from "../../globe/service";
import { useEffect, useState } from "react";
import MarkNav from "markdown-navbar";
import { MdCatalog, MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import Sider from "antd/es/layout/Sider";
import { Layout, Tag, Image } from "antd";
import remarkGfm from "remark-gfm";
import "./css/index.css";
import { Header } from "antd/es/layout/layout";
import { IArticle, articleInit } from "../../globe/inter";
import { CommentPage } from "./comment";
const scrollElement = document.documentElement;

function matchSearchId(str: string) {
  const regex = /[?&]id=(\d+)/;
  const match = str.match(regex);

  if (match && match[1]) {
    const id = match[1];
    return id;
  }
  return "";
}

export function ArticlePage() {
  // 路由携带参数navigate("/home",{state:{id:123}})
  // let params = useParams();
  // console.log(params.teamId); 
  const location = useLocation();
  // console.log(location)
  // const query = matchSearchId(location.search);
  // let articleId = "";
  // if (query === "") {
  //   articleId = location.state.id;
  // }else{
  //   articleId = query
  // }
  // console.log(articleId);
  const articleId = location.state.id;

  const [articleText, setArticleText] = useState(""); //正文
  const [articleBody, setArticleBody] = useState<IArticle>(articleInit);
  const [id] = useState("preview-only");
  const [md, setMd] = useState("");
  useEffect(() => {
    const testmd = require("./test.md");
    fetch(testmd)
      .then((res) => res.text())
      .then((text) => setMd(text));

    Service.getArticleDetail(articleId).then((res) => {
      console.log(res.data.data);
      setArticleBody(res.data.data);
      setArticleText(res.data.data.body);
    });
  }, [articleId]);

  return (
    <>
      {articleId === null ? (
        <>这篇文章不见啦</>
      ) : (
        <div className="container-aritclePage">
          <Layout>
            <Sider className="markdown-nav">
              {/* <div> */}
              {/* //TODO：目录失效 */}
              {/* <MarkNav source={articleText} ordered={true} /> */}
              {/* <MarkNav source={md} ordered={true} /> */}
              <MdCatalog
                className="MdCatalog"
                editorId={id}
                scrollElement={scrollElement}
              />
              {/* </div> */}
            </Sider>
            <div className="article-content">
              <Header className="article-header">
                <div className="header-title">
                  <div id="title">
                    <strong>{articleBody.title}</strong>
                  </div>
                </div>
                <div className="header-info">
                  <Tag>{articleBody.classification}</Tag>
                  <div id="time">发布时间：{articleBody.releaseTime}</div>
                </div>
                <Image
                  width={900}
                  height={300}
                  src={articleBody.cover as string}
                />
              </Header>
              <MdPreview editorId={id} modelValue={articleText} />
              {/* <MdPreview editorId={id} modelValue={md} /> */}
            </div>
          </Layout>
          <div className="comment">
            <CommentPage articleId={articleBody.ID} admin={false} />
          </div>
        </div>
      )}
    </>
  );
}
