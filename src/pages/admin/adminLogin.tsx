import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Tabs,
  message,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import "./css/adminLogin.css";
import { ILoginProps } from "../../globe/inter";
import { Service } from "../../globe/service";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const navigate = useNavigate();
  //管理员登录
  const [messageApi, contextHolder] = message.useMessage();
  function error(text: string = "账号或密码错误") {
    messageApi.open({
      type: "error",
      content: text,
    });
  }
  function onFinish(values: ILoginProps) {
    Service.adminLogin(values).then((res) => {
      console.log(res);
      if (res.data.status === 0) {
        error();
        return;
      } else {
        const token = res.data.data;
        localStorage.setItem("token", token);
        navigate("/admin/main/article");
      }
    });
  }

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="stud-login-form"
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入管理员帐号"
          />
        </Form.Item>
        <Form.Item
          name="passWord"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export function LoginPage() {
  function callback(key: string) {}
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
