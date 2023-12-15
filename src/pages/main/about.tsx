import {
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Avatar, Button, Drawer, List,Image} from "antd";
import { AddComment, ISetPreID } from "./comment";
import "./css/about.css"

const data = Array.from({ length: 1 }).map((_, i) => ({

  title: `个人信息`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "苦逼",
  content: "苦逼程序员一个",
}));

export function About() {
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };
  const preinit: ISetPreID = {
    id: "",
    nickName: "",
  };

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <Button
                icon={<MessageOutlined />}
                key="list-vertical-message"
                onClick={() => {
                  setOpen(true);
                }}
              >
                点击留言
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
              avatar={<Avatar icon={<UserOutlined />} src={item.avatar} />}
              title={<div>{item.title}</div>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Drawer title={"留言"} placement="right" onClose={onClose} open={open}>
        <AddComment
          pre={preinit}
          articleID={""}
          setOpen={setOpen}
          display={display}
          setDisplay={setDisplay}
          msgOrComment={0}
        />
      </Drawer>
    </>
  );
}
