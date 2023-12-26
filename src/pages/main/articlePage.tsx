import { useLocation } from "react-router-dom";
import { Service } from "../../globe/service";
import { useEffect, useState } from "react";
import { MdCatalog, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import Sider from "antd/es/layout/Sider";
import { Layout, Tag, Image } from "antd";
import "./css/index.css";
import { Header } from "antd/es/layout/layout";
import { IArticle, articleInit } from "../../globe/inter";
import { CommentPage } from "./comment";
const scrollElement = document.documentElement;

export function ArticlePage() {
  const location = useLocation();
  const articleId = location.state.id;

  const [articleText, setArticleText] = useState(""); //正文
  const [articleBody, setArticleBody] = useState<IArticle>(articleInit);
  const [id] = useState("preview-only");
  useEffect(() => {
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
              <MdCatalog
                className="MdCatalog"
                editorId={id}
                scrollElement={scrollElement}
              />
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
                  style={{ objectFit: "cover" }}
                  src={articleBody.cover as string}
                />
              </Header>
              <MdPreview editorId={id} modelValue={articleText} />
              {/* <MdPreview editorId={id} modelValue={md} /> */}
            </div>
          </Layout>
          <div className="comment">
            <CommentPage articleId={articleId} admin={false} msgOrComment={0} />
          </div>
        </div>
      )}
    </>
  );
}
