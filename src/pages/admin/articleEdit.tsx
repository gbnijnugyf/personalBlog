import {
  Button,
  Drawer,
  Form,
  Input,
  Layout,
  Modal,
  Space,
  Upload,
  message,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { MdEditor } from "md-editor-rt";
import { useEffect, useState } from "react";
import "./css/articleEdit.css";
import "md-editor-rt/lib/style.css";
import axios from "axios";
import { BASEURL, IArticle, articleInit } from "../../globe/inter";
import { Service } from "../../globe/service";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

export interface IArticleEdit {
  classify: string; //分类
  ID: string; //文章ID，新建文章则为""
}
interface IArticleEditNew {
  classify: string; //分类
  ID: string; //文章ID，新建文章则为""
  setNew: React.Dispatch<React.SetStateAction<IArticleEdit>>;
}

export function ArticleEdit(props: IArticleEditNew) {
  console.log("ArticleEdit入口:", props);
  const [text, setText] = useState("# Hello Editor");
  const [editTitle, setEditTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [flush, setFlush] = useState<boolean>(false);
  const [isCancelPublishOpen, setIsCancelPublishOpen] = useState(false);
  const [articleDetail, setArticleDetail] = useState<IArticle>(articleInit);
  const handleOk = () => {
    // const cancelId = articleDetail.ID === null ? "" : articleDetail.ID;
    console.log(props.ID)
    Service.cancelPublisArticle(props.ID)
      .then((res) => {
        console.log(res);
        success("取消发布成功");
        setFlush(!flush);
      })
      .catch(() => {
        error("取消发布失败");
      });
    setIsCancelPublishOpen(false);
  };
  const handleCancel = () => {
    setIsCancelPublishOpen(false);
  };
  useEffect(() => {
    if (props.ID !== "") {
      //选择已存在文章
      Service.getArticleDetail(props.ID).then((res) => {
        const articleBody = res.data.data;
        console.log(res.data.data);
        setArticleDetail(articleBody);
        setText(articleBody.body);
        setEditTitle(articleBody.title);
      });
    } else {
      setText("# Hello Editor");
      setEditTitle("");
      setArticleDetail(articleInit);
    }
  }, [props.ID, flush]);

  const handleEditTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditTitle(e.target.value);
  };

  const onUploadImg = async (
    files: Array<File>,
    callback: (urls: string[]) => void
  ) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append("file", file);
          axios
            .post(BASEURL + "/article/imgUpload", form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log("文章内上传图片", res);
              rev(res);
            })
            .catch((error) => rej(error));
        });
      })
    );

    callback(res.map((item: any) => item.data.data.url));
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
    if (editTitle === "") {
      //标题为空
      warning();
      return;
    }

    const temp: IArticle = {
      body: value,
      classification: props.classify,
      cover: null,
      ID: props.ID,
      releaseTime: null,
      title: editTitle,
      visibility: 0,
    };
    Service.saveArticleEdit(temp)
      .then((res) => {
        if (props.ID === "") {
          const temp: IArticleEdit = {
            classify: props.classify,
            ID: res.data.data.id,
          };
          props.setNew(temp);
        }
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
                value={editTitle}
                style={{ fontSize: "large" }}
                bordered={false}
                placeholder="请输入标题"
                showCount
                maxLength={15}
                onChange={handleEditTitleChange}
              />
            </div>
            <Button
              type="primary"
              onClick={() => {
                if (articleDetail.visibility === 0) {
                  if (articleDetail.ID !== null && articleDetail.ID !== "") {
                    setOpen(true);
                  } else {
                    warning("请先填写标题并保存");
                  }
                } else {
                  setIsCancelPublishOpen(true);
                }
              }}
            >
              {articleDetail.visibility === 0 ? "发布文章" : "取消发布"}
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
        <Modal
          okText="确认"
          cancelText="取消"
          title="确认取消发布吗？"
          open={isCancelPublishOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        />
      </Layout>
      <Drawer
        title="文章发布"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <ArticlePublishForm
          setDisplay={setFlush}
          display={flush}
          body={text}
          classify={props.classify}
          successFunc={success}
          failFunc={error}
          title={editTitle}
          id={props.ID}
        />
      </Drawer>
    </>
  );
}

interface IArticlePublishFormProps {
  body: string;
  classify: string;
  title: string;
  id: string;
  successFunc: (text: string) => void;
  failFunc: (text: string) => void;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  display: boolean;
}

function ArticlePublishForm(props: IArticlePublishFormProps) {
  //TODO:bug——title的值无法传进抽屉
  const [lastTitle, setLastTitle] = useState(props.title);
  const navigate = useNavigate();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  interface IPublishForm {
    title: string;
    cover: any[];
  }
  const onFinish = (values: IPublishForm) => {
    let fileBase64 = null;
    if (values.cover !== undefined) {
      fileBase64 = values.cover[0].thumbUrl;
    }
    const articleInfo: IArticle = {
      body: props.body,
      classification: props.classify,
      cover: fileBase64,
      ID: props.id,
      releaseTime: null,
      title: values.title,
      visibility: 0, //即使发送给后端也不应该获取
    };
    Service.publishArticle(articleInfo)
      .then((res) => {
        props.successFunc("发布成功");
        props.setDisplay(!props.display)
        console.log(res);
        setTimeout(() => {
          navigate("edit", {
            replace: true,
            state: { classify: props.classify },
          });
        }, 3000);
      })
      .catch(() => props.failFunc("发布失败"));
  };
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{ title: lastTitle }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="title"
        label="标题"
        rules={[{ required: true, message: "请输入标题!" }]}
      >
        <Input placeholder="请输入标题" showCount maxLength={15} />
      </Form.Item>

      <Form.Item
        name="cover"
        label="文章缩略图"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
