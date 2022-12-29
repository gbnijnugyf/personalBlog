import Icon, { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import "./css/index.css"

interface IOnFinishProps {
    password: string;
    remember: boolean;
    studID: string;
}

function StudentLogin() {//学生登录
    function onFinish(values: IOnFinishProps) {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="stud-login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="studID"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入学工号"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
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
function TeacherLogin() {//教师登录
    function onFinish(values: IOnFinishProps) {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="stud-login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="studID"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入教工号"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
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
    )

}
function AdminLogin() {//管理员登录
    function onFinish(values: IOnFinishProps) {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="stud-login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="studID"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入管理员帐号"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
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
    )
}

export function LoginPage() {

    function callback(key: string) {
        console.log(key);
    }
    return (
        <>
            <Layout className="Login-layout">
                统一身份认证

                <Tabs type="card" defaultActiveKey="1" onChange={callback} className="LoginPannel">
                    <TabPane tab="学生登录" key="1">
                        <StudentLogin />
                    </TabPane>
                    <TabPane tab="教师登录" key="2">
                        <TeacherLogin />
                    </TabPane>
                    <TabPane tab="管理员登录" key="3">
                        <AdminLogin />
                    </TabPane>
                </Tabs>
            </Layout>
        </>
    )
}