import { Dropdown, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  menuHeaderRItems,
  IMenuProps,
  dynamicMenuHeaderProps,
} from "../../menu/menuProps";
import "./css/index.css";
import { SearchTest1 } from "./search";
import { Service } from "../../globe/service";
import { UserSwitchOutlined } from "@ant-design/icons";
import { ITotalNum } from "../../globe/inter";

export function MainPage() {
  const [headerMenu, setHeaderMenu] = useState<IMenuProps[]>();
  const [totalNum, setTotalNum] = useState<ITotalNum|null>();
  const navigate = useNavigate();
  useEffect(() => {
    Service.getClassify().then((res) => {
      const promises = res.data.data.map((item) => {
        return {
          key: item.name,
          label: item.name,
        };
      });
      Promise.all(promises).then((resp) => {
        const headerMenuTemp = dynamicMenuHeaderProps(resp);
        setHeaderMenu(headerMenuTemp);
      });
    });
    Service.getTotalData().then(res=>{
      if(res.data.status !== 0){
        setTotalNum(res.data.data)
      }
    }).catch(()=>setTotalNum(null))
  }, []);

  return (
    <>
      <Layout className="layout">
        <Header className="menu">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["detail"]}
            items={headerMenu}
            className="menu-center"
            onClick={(props) => {
              if (props.key.length !== 0) {
                if (props.keyPath.length > 1) {
                  navigate("detail", {
                    replace: true,
                    state: { className: props.keyPath[0] },
                  });
                } else {
                  if (props.key === "detail") {
                    navigate(props.key, {
                      replace: true,
                      state: { className: "" },
                    });
                  } else {
                    navigate(props.key, { replace: true });
                  }
                }
              }
            }}
          />
          <SearchTest1 />
          <Dropdown menu={{ items: menuHeaderRItems }} className="menu-right">
            <div
              style={{ cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            >
              <UserSwitchOutlined style={{ fontSize: "145%" }} />
            </div>
          </Dropdown>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">
          {totalNum !== null ? (
            <div>
              总浏览数:{totalNum?.totalView}；总评论数:{totalNum?.totalComment}
            </div>
          ) : null}
          <div>Personal Blog ©2023 Created by gbnijnugyf</div>
        </Footer>
      </Layout>
    </>
  );
}
