import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { MdEditor } from "md-editor-rt";
import { useState } from "react";
import "./css/articleEdit.css";
import "md-editor-rt/lib/style.css";
import axios from "axios";
import { BASEURL } from "../../globe/inter";
export function ArticleEdit() {
  const [text, setText] = useState("# Hello Editor");

  //TODO:在文章编辑过程中就会涉及图片上传回显，此时文章并未上传，
  //为了对应————在添加文章之时就需要向后端发请求获得一个文章ID
  const onUploadImg = async (
    files: Array<File>,
    callback: (urls: string[]) => void
  ) => {
    const res = await Promise.all(
      files.map((file) => {
        console.log(file);
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append("file", file);
          //该ID为该图片所对应文章ID
          form.append("articleID", "eg:123")
          axios
            .post(BASEURL + "/api/img/upload", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log("{res}:", res);
              rev(res);
            })
            .catch((error) => rej(error));
        });
      })
    );

    callback(res.map((item: any) => item.data.url));
  };
  return (
    <>
      <Layout className="edit-layout">
        <Content>
          <MdEditor
            onUploadImg={onUploadImg}
            className="edit-window"
            modelValue={text}
            onChange={setText}
          />
        </Content>
      </Layout>
    </>
  );
}
