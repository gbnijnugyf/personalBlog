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
import "./css/friendEdit.css";
import { FriendPage } from "../main/friend";
import { useEffect, useState } from "react";
import { IFriendLink } from "../../globe/inter";
import { link } from "fs";
import { Service } from "../../globe/service";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

export function FriendEditPage() {
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [friendLinkList, setFriendLinkList] = useState<IFriendLink[]>();
  const [display, setDisplay] = useState<boolean>(false);
  useEffect(() => {
    Service.getFriendLink().then((res) => {
      const list: IFriendLink[] = res.data.data;
      setFriendLinkList(list);
    });
  }, [display]);

  function success(text: string = "添加成功") {
    messageApi.open({
      type: "success",
      content: text,
    });
  }
  function error(text: string = "添加失败") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }
  return (
    <>
      <Layout style={{backgroundColor:"white"}}>
        {contextHolder}
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          添加友情链接
        </Button>
        <FriendPage admin={true} data={friendLinkList} />
        <Drawer
          title="添加友情链接"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <FriendPublishForm
            successFunc={success}
            failFunc={error}
            setDisplay={setDisplay}
            dispaly={display}
          />
        </Drawer>
      </Layout>
    </>
  );
}

interface IFriendPublishFormProps {
  successFunc: () => void;
  failFunc: () => void;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  dispaly: boolean;
}
function FriendPublishForm(props: IFriendPublishFormProps) {
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
    linkName: string;
    description: string;
    url: string;
    cover: any[];
  }
  const onFinish = (values: IPublishForm) => {
    let fileBase64 = null;
    console.log("Received values of form: ", values);
    if (values.cover !== undefined) {
      fileBase64 = values.cover[0].thumbUrl;
      // console.log("image: ", values.cover[0].thumbUrl);
    }
    const linkInfo: IFriendLink = {
      cover: fileBase64,
      description: values.description,
      name: values.linkName,
      url: values.url,
    };
    Service.addFriendLink(linkInfo)
      .then((res) => {
        console.log(res);
        props.setDisplay(!props.dispaly);
        props.successFunc();
      })
      .catch(() => {
        props.failFunc();
      });
  };
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="linkName" label="链接名" rules={[{ required: true }]}>
        <Input placeholder="请输入链接名" showCount maxLength={15} />
      </Form.Item>
      <Form.Item name="linkUrl" label="链接地址" rules={[{ required: true }]}>
        <Input placeholder="请输入链接地址" maxLength={9999} />
      </Form.Item>
      <Form.Item
        name="linkDescribe"
        label="链接描述"
        rules={[{ required: true }]}
      >
        <TextArea
          showCount
          rows={4}
          placeholder="maxLength is 200"
          maxLength={200}
        />
      </Form.Item>

      <Form.Item
        name="cover"
        label="链接缩略图"
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
