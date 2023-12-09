import {
  Button,
  Drawer,
  Form,
  Input,
  Layout,
  Space,
  Upload,
  message,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { MdEditor } from "md-editor-rt";
import { useEffect, useRef, useState } from "react";
import "./css/articleEdit.css";
import "md-editor-rt/lib/style.css";
import axios from "axios";
import { BASEURL, IArticle } from "../../globe/inter";
import { Service } from "../../globe/service";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

interface IArticleEdit {
  classify: string; //分类
  ID: string; //文章ID，新建文章则为""
}

export function ArticleEdit(props: IArticleEdit) {
  const [text, setText] = useState("# Hello Editor");
  // const editTitle = useRef("");
  const [editTitle, setEditTitle] = useState("");
  // const location = useLocation();
  const [open, setOpen] = useState(false);
  const articleInit: IArticle = {
    body: "",
    classification: "",
    cover: null,
    ID: null,
    releaseTime: null,
    title: "",
    visible: 0,
  };
  const [articleDetail, setArticleDetail] = useState<IArticle>(articleInit);

  useEffect(() => {
    console.log("edit:", props.ID);
    if (props.ID !== "") {
      //选择已存在文章
      console.log(props.ID);
      Service.getArticleDetail(props.ID).then((res) => {
        console.log(res.data.data);
        const articleBody = res.data.data;
        setArticleDetail(articleBody);
        setText(articleBody.body);
        setEditTitle(articleBody.title);
        console.log(editTitle);
      });
    } else {
      setText("# Hello Editor");
      setEditTitle("");
      setArticleDetail(articleInit);
    }
  }, [props.ID]);

  const showDrawer = () => {
    // console.log(editTitle.current);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleEditTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    // editTitle.current = e.target.value;
    setEditTitle(e.target.value);
    // console.log(editTitle.current);
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
    if (editTitle === "") {
      //标题为空
      warning();
      return;
    }
    const temp: IArticle = {
      body: value,
      classification: props.classify,
      cover: null,
      ID: null,
      releaseTime: null,
      title: editTitle,
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
                value={editTitle}
                style={{ fontSize: "large" }}
                bordered={false}
                placeholder="请输入标题"
                showCount
                maxLength={15}
                onChange={handleEditTitleChange}
              />
            </div>
            <Button type="primary" onClick={showDrawer}>
              {articleDetail.visible === 0 ? "发布文章" : "取消发布"}
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
      <Drawer title="文章发布" placement="right" onClose={onClose} open={open}>
        <ArticlePublishForm
          body={text}
          classify={props.classify}
          successFunc={success}
          failFunc={error}
          title={editTitle}
        />
      </Drawer>
    </>
  );
}

interface IArticlePublishFormProps {
  body: string;
  classify: string;
  title: string;
  successFunc: (text: string) => void;
  failFunc: (text: string) => void;
}

function ArticlePublishForm(props: IArticlePublishFormProps) {
  //TODO:bug——title的值无法传进抽屉
  const [lastTitle, setLastTitle] = useState(props.title);
  console.log(lastTitle);
  const navigate = useNavigate();
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const normFile = (e: any) => {
    // return fileToBase64(e.file)
    console.log("Upload event:", e);
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
    console.log("Received values of form: ", values);
    if (values.cover !== undefined) {
      fileBase64 = values.cover[0].thumbUrl;
      // console.log("image: ", values.cover[0].thumbUrl);
    }
    const articleInfo: IArticle = {
      body: props.body,
      classification: props.classify,
      cover: fileBase64,
      ID: null,
      releaseTime: null,
      title: values.title,
      visible: 1,
    };
    Service.publishArticle(articleInfo)
      .then((res) => {
        console.log(res);
        props.successFunc("发布成功");
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
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
