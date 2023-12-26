import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  List,
  Image,
  Popover,
  Modal,
  Input,
  message,
} from "antd";
import { AddComment, CommentPage, ISetPreID } from "./comment";
import "./css/about.css";
import { Service } from "../../globe/service";
import { IPersonal } from "../../globe/inter";

const datainit: IPersonal[] = Array.from({ length: 1 }).map((_, i) => ({
  nickname: `个人信息`,
  email: "!",
  avator: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "苦逼程序员一个",
}));

export function About() {
  console.log(window.location.href);
  const [open, setOpen] = useState(false);
  const [subscribeDialog, setSubscribeDialog] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IPersonal[]>(datainit);

  useEffect(() => {
    Service.getPersonInfo().then((res) => {
      if (res.data.status !== 0) {
        const temp: IPersonal[] = [];
        temp.push(res.data.data);
        setData(temp);
      }
    });
  }, []);

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
  const handleOk = () => {
    console.log(email);
    if (email !== "") {
      Service.subscribeBlog({ email: email })
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            success("订阅成功");
          } else {
            error("订阅失败");
          }
        })
        .catch(() => error("订阅失败"));
    }

    setSubscribeDialog(false);
  };
  const handleCancel = () => {
    setSubscribeDialog(false);
  };
  const onClose = () => {
    setOpen(false);
  };
  const preinit: ISetPreID = {
    id: "",
    nickName: "",
  };

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
              <Popover content={"给博主留言"}>
                <Button
                  icon={<MessageOutlined />}
                  key="list-vertical-message"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  点击留言
                </Button>
              </Popover>,
              <Popover content={"订阅后博主发布文章您将会收到邮件"}>
                <Button
                  icon={<MessageOutlined />}
                  key="list-vertical-message"
                  onClick={() => {
                    setSubscribeDialog(true);
                  }}
                >
                  点击订阅
                </Button>
              </Popover>,
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
      <CommentPage
        articleId={"-1"}
        admin={false}
        flush={display}
        msgOrComment={1}
      />
      <Modal
        title="订阅"
        open={subscribeDialog}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          required={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="输入邮箱"
        />
      </Modal>
      <Drawer title={"留言"} placement="right" onClose={onClose} open={open}>
        <AddComment
          pre={preinit}
          articleID={""}
          setOpen={setOpen}
          display={display}
          setDisplay={setDisplay}
          msgOrComment={1}
        />
      </Drawer>
    </>
  );
}
