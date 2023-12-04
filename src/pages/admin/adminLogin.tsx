import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, Modal, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import "./css/adminLogin.css";
import { useState } from "react";
import { ILoginProps } from "../../globe/inter";
import { Service } from "../../globe/service";

function AdminLogin() {
  //管理员登录
  function onFinish(values: ILoginProps) {
    if (values!==undefined){
      console.log("1")
    }else{
      console.log("2")
    }
    console.log("Received values of form: ", values);
    Service.adminLogin(values).then((res)=>{
      if(res.data.data==='successful'){
        
      }
    })
  }

  return (
    <Form
      name="normal_login"
      className="stud-login-form"
      initialValues={{ remember: false }}
      onFinish={onFinish}
    >
      <Form.Item
        name="personID"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入管理员帐号"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export function LoginPage() {
  function callback(key: string) {
    console.log(key);
  }
  return (
    <>
      <Tabs
        type="card"
        defaultActiveKey="1"
        onChange={callback}
        className="LoginPannel"
      >
        <TabPane tab="管理员登录" key="1">
          <AdminLogin />
        </TabPane>
      </Tabs>
    </>
  );
}

interface IRegister {
  userId: string;
  password: string;
  email: string;
}
interface ICollectionCreateFormProps {
  open: boolean;
  onCreate: (values: IRegister) => void;
  onCancel: () => void;
}

function CollectionCreateForm({
  open,
  onCreate,
  onCancel,
}: ICollectionCreateFormProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="开创你的博客"
      okText="注册"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="userId"
          label="昵称"
          rules={[{ required: true, message: "请输入昵称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: "email",
              message: "邮箱格式不正确",
            },
            {
              required: true,
              message: "请输入邮箱",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

const Temp: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        注册
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
