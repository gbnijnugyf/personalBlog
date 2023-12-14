import { Avatar, List } from "antd";
import "./css/friend.css";
import { useEffect, useState } from "react";
import { IFriendLink } from "../../globe/inter";
import { Service } from "../../globe/service";
import { UserOutlined } from "@ant-design/icons";

export function FriendPage() {
  const [friendLinkList, setFriendLinkList] = useState<IFriendLink[]>();
  useEffect(() => {
    Service.getFriendLink().then((res) => {
      const list: IFriendLink[] = res.data.data;
      setFriendLinkList(list);
    });
  }, []);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={friendLinkList}
        renderItem={(item, index) => (
          <List.Item extra={<img width={272} alt="logo" src={item.cover} />}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              // title={<a href="https://ant.design">{item.title}</a>}
              description={
                <>
                  <p>{item.description }</p> <a href={item.url}>{item.url}</a>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}
