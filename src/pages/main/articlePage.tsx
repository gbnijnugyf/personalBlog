import { useLocation } from "react-router-dom";
import { Service } from "../../globe/service";
import { useEffect, useState } from "react";
import MarkNav from "markdown-navbar";
import { MdCatalog, MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import Sider from "antd/es/layout/Sider";
import { Layout, Tag, Image } from "antd";
import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import "./css/index.css";
import { Content, Header } from "antd/es/layout/layout";
import { IArticle, articleInit } from "../../globe/inter";
import { CommentPage } from "./comment";
const scrollElement = document.documentElement;
export function ArticlePage() {
  // 路由携带参数navigate("/home",{state:{id:123}})
  const articleId = useLocation().state.id;
  console.log(articleId);
  const [articleText, setArticleText] = useState(""); //正文
  const [articleBody, setArticleBody] = useState<IArticle>(articleInit);
  const [text] = useState("# Hello Editor");
  const [id] = useState("preview-only");
  const [md, setMd] = useState("");
  useEffect(() => {
    const testmd = require("./test.md");
    fetch(testmd)
      .then((res) => res.text())
      .then((text) => setMd(text));

    Service.getArticleDetail(articleId).then((res) => {
      setArticleBody(res.data.data);
      // setArticleUrl(url);
      setArticleText(articleBody.body);
      console.log(articleBody);
    });
  }, [articleId]);

  return (
    <>
      <div className="container-aritclePage">
        <Layout>
          <Sider className="markdown-nav">
            <div>
              <MarkNav source={md} ordered={true} />
            </div>
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
            <MdPreview modelValue={md} />
          </div>
        </Layout>
        <div className="comment">
          <CommentPage articleId={articleBody.ID} />
        </div>
      </div>
    </>
  );
}
