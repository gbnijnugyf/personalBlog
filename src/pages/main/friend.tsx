import { Avatar, List, Image, Button } from "antd";
import "./css/friend.css";
import { useEffect, useState } from "react";
import { IFriendLink } from "../../globe/inter";
import { Service } from "../../globe/service";
import { UserOutlined } from "@ant-design/icons";

interface IFriendPage {
  admin: boolean;
  data: IFriendLink[] | undefined;
}
export function FriendPage(props: IFriendPage) {
  const [friendLinkList, setFriendLinkList] = useState<IFriendLink[]>();
  useEffect(() => {
    if (props.admin === true && props.data !== undefined) {
      setFriendLinkList(props.data);
    } else {
      Service.getFriendLink().then((res) => {
        const list: IFriendLink[] = res.data.data;
        setFriendLinkList(list);
      });
    }
  }, [props.data]);
  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={friendLinkList}
        renderItem={(item, index) => (
          <List.Item extra={<Image width={272} alt="logo" src={item.cover} />}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              // title={<a href="https://ant.design">{item.title}</a>}
              description={
                <>
                  <p>{item.description}</p> <a href={item.url}>{item.url}</a>
                </>
              }
            />
            {props.admin?<Button
              onClick={() => {
              }}
            >
              编辑
            </Button>:null}
          </List.Item>
        )}
      />
    </>
  );
}
