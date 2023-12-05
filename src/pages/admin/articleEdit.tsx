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

          axios
            .post(BASEURL + "/api/img/upload", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log("{res}:",res);
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
