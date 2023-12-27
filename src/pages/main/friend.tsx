import { List, Image, Button } from "antd";
import "./css/friend.css";
import { useEffect, useState } from "react";
import { IFriendLink } from "../../globe/inter";
import { Service } from "../../globe/service";

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
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image width={210} height={150} alt="logo" src={item.cover} />
              }
              description={
                <>
                  <p>{item.description}</p> <a href={item.url} target="_blank" rel="noreferrer">{item.url}</a>
                </>
              }
            />
            {props.admin ? <Button onClick={() => {}}>编辑</Button> : null}
          </List.Item>
        )}
      />
    </>
  );
}
