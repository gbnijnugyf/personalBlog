import { Button, Drawer, Input, Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { MdEditor } from "md-editor-rt";
import { useRef, useState } from "react";
import "./css/articleEdit.css";
import "md-editor-rt/lib/style.css";
import axios from "axios";
import { BASEURL, IArticle } from "../../globe/inter";
import { Service } from "../../globe/service";
import { useLocation } from "react-router-dom";

export function ArticleEdit() {
  const [text, setText] = useState("# Hello Editor");
  const editTitle = useRef("");
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleEditTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    editTitle.current = e.target.value;
  };

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
          //TODO:该ID为该图片所对应文章ID，md自己索引，可删除？
          form.append("articleID", "eg:123");
          axios
            .post(BASEURL + "/article/imgUpload", form, {
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
  const [messageApi, contextHolder] = message.useMessage();

  function success(text: string = "保存成功") {
    messageApi.open({
      type: "success",
      content: text,
    });
  }
  function error(text: string = "保存失败") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }
  function warning(text: string = "请先填写标题") {
    messageApi.open({
      type: "warning",
      content: text,
    });
  }
  //TODO: 保存后的菜单展示是一个问题
  const onSaveEdit = (value: string) => {
    if (editTitle.current === "") {
      //标题为空
      warning();
      return;
    }
    const temp: IArticle = {
      body: value,
      classification: location.state.classify,
      cover: null,
      ID: null,
      releaseTime: null,
      title: editTitle.current,
      visible: 0,
    };
    console.log(temp);
    Service.saveArticleEdit(temp)
      .then((res) => {
        console.log(res);
        success();
      })
      .catch(() => error());
  };

  return (
    <>
      <Layout className="edit-layout">
        {contextHolder}
        <Content>
          <div className="edit-header">
            <div className="edit-title">
              {/* <p>标题：</p> */}
              <Input
                style={{ fontSize: "large" }}
                bordered={false}
                placeholder="请输入标题"
                showCount
                maxLength={15}
                onChange={handleEditTitleChange}
              />
            </div>
            <Button type="primary" onClick={showDrawer}>
              发布文章
            </Button>
          </div>
          <MdEditor
            onUploadImg={onUploadImg}
            className="edit-window"
            modelValue={text}
            onChange={setText}
            onSave={onSaveEdit}
          />
        </Content>
      </Layout>
      <Drawer
        title="文章发布"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
