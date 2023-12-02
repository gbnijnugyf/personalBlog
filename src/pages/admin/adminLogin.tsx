import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, Modal, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import "./css/adminLogin.css";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { useState } from "react";
import { Header } from "antd/es/layout/layout";

interface IOnFinishProps {
  password: string;
  remember: boolean;
  personID: string;
}

function PersonalLogin() {
  //学生登录
  const [value, setValue] = useState<IOnFinishProps>({
    password: "",
    remember: false,
    personID: "",
  });

  function onFinish() {
    //点击登录，提交表单
    console.log("Received values of form: ", value);
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      password: e.target.value,
      remember: value.remember,
      personID: value.personID,
    });
  }
  function onChangePersonID(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({
      password: value.password,
      remember: value.remember,
      personID: e.target.value,
    });
  }
  function isRemember(e: CheckboxChangeEvent) {
    setValue({
      password: value.password,
      remember: e.target.checked,
      personID: value.personID,
    });
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
          placeholder="请输入用户名"
          onChange={onChangePersonID}
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
          onChange={onChangePassword}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" noStyle>
          <Checkbox onChange={isRemember}>记住密码</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <div className="two-button">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <Temp />
        </div>
      </Form.Item>
    </Form>
  );
}
function FriendsLogin() {
  //教师登录
  function onFinish(values: IOnFinishProps) {
    console.log("Received values of form: ", values);
  }

  return (
    <Form
      name="normal_login"
      className="stud-login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="personID"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入用户名"
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
        <Form.Item name="remember" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
function AdminLogin() {
  //管理员登录
  function onFinish(values: IOnFinishProps) {
    console.log("Received values of form: ", values);
  }

  return (
    <Form
      name="normal_login"
      className="stud-login-form"
      initialValues={{ remember: true }}
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
        <Form.Item name="remember" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>
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
        <TabPane tab="管理员登录" key="3">
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
      title="开创你的秘密基地"
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
