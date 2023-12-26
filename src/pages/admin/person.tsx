import { EditOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  List,
  Image,
  Modal,
  Input,
  Form,
  message,
  Upload,
  Space,
} from "antd";
import "./css/person.css";
import { Service } from "../../globe/service";
import { ILoginProps, IPersonal } from "../../globe/inter";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const datainit: IPersonal[] = Array.from({ length: 1 }).map((_, i) => ({
  nickname: `个人信息`,
  email: "!",
  avator: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "苦逼程序员一个",
}));

export function Person() {
  const [open, setOpen] = useState(false);
  const [openPwd, setOpenPwd] = useState(false);
  const [display, setDisplay] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IPersonal[]>(datainit);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancelPwd = () => {
    setOpenPwd(false);
  };
  useEffect(() => {
    Service.getPersonInfo().then((res) => {
      if (res.data.status !== 0) {
        const temp: IPersonal[] = [];
        temp.push(res.data.data);
        setData(temp);
      }
    });
  }, [display]);

  function success(text: string = "成功") {
    messageApi.open({
      type: "success",
      content: text,
    });
  }
  function error(text: string = "失败") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }

  return (
    <>
      {contextHolder}
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.nickname}
            actions={[
              <Button
                icon={<EditOutlined />}
                key="list-vertical-message"
                onClick={() => {
                  setOpen(true);
                }}
              >
                点击编辑
              </Button>,
              <Button
                icon={<EditOutlined />}
                key="list-vertical-pwd"
                onClick={() => {
                  setOpenPwd(true);
                }}
              >
                修改账号密码
              </Button>,
            ]}
            extra={
              <Image
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} src={item.avator} />}
              title={<div>{item.nickname}</div>}
              description={item.email}
            />
            {item.description}
          </List.Item>
        )}
      />
      <Modal
        title="编辑个人信息"
        open={open}
        footer={[]}
        onCancel={handleCancel}
      >
        <PersonEditForm
          successFunc={success}
          failFunc={error}
          setDisplay={setDisplay}
          display={display}
          data={data}
        />
      </Modal>
      <Modal
        title="编辑账号密码"
        open={openPwd}
        footer={[]}
        onCancel={handleCancelPwd}
      >
        <PwdEditForm successFunc={success} failFunc={error} />
      </Modal>
    </>
  );
}

interface IPersonEditFrom {
  data: IPersonal[];
  successFunc: (text: string) => void;
  failFunc: (text: string) => void;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  display: boolean;
}
function PersonEditForm(props: IPersonEditFrom) {
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
    nickname: string;
    description: string;
    email: string;
    cover: any[];
  }
  const onFinish = (values: IPublishForm) => {
    let fileBase64 = null;
    if (values.cover !== undefined) {
      fileBase64 = values.cover[0].thumbUrl;
    }
    const personInfo: IPersonal = {
      avator: fileBase64,
      description: values.description,
      email: values.email,
      nickname: values.nickname,
    };
    console.log(personInfo);
    Service.editPersonInfo(personInfo)
      .then((res) => {
        if (res.data.status !== 0) {
          props.successFunc("编辑成功");
          props.setDisplay(!props.display);
        } else {
          props.failFunc("编辑失败");
        }
      })
      .catch(() => props.failFunc("编辑失败"));
  };
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        nickname: props.data[0].nickname,
        description: props.data[0].description,
        email: props.data[0].email,
      }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="nickname"
        label="昵称"
        rules={[{ required: true, message: "请输入昵称!" }]}
      >
        <Input placeholder="请输入昵称" showCount maxLength={15} />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true },
          {
            pattern:
              /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "邮箱格式不正确",
          },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item
        name="description"
        label="个人介绍"
        rules={[{ required: true, message: "请输入个人介绍!" }]}
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
        label="上传头像"
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

interface IPwdEditForm {
  successFunc: (text: string) => void;
  failFunc: (text: string) => void;
}
function PwdEditForm(props: IPwdEditForm) {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const navigate = useNavigate();
  const onFinish = (values: ILoginProps) => {
    const pwdInfo: ILoginProps = {
      userName: values.userName,
      passWord: values.passWord,
    };
    console.log(pwdInfo);
    Service.editPwd(pwdInfo)
      .then((res) => {
        if (res.data.status !== 0) {
          props.successFunc("编辑成功");
          localStorage.removeItem("token");
          navigate("/admin/login");
          console.log(res);
        } else {
          props.failFunc("编辑失败");
        }
      })
      .catch(() => props.failFunc("编辑失败"));
  };
  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="userName"
        label="账号"
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item name="passWord" label="密码" rules={[{ required: true }]}>
        <Input placeholder="请输入密码" type="password" />
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
