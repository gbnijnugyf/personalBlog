import { Dropdown, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  menuHeaderRItems,
  menuHeaderProps,
  IMenuProps,
  dynamicMenuHeaderProps,
} from "../../menu/menuProps";
import "./css/index.css";
import { SearchTest1 } from "./search";
import { Service } from "../../globe/service";

export function MainPage() {
  const [headerMenu, setHeaderMenu] = useState<IMenuProps[]>();

  const navigate = useNavigate();
  useEffect(() => {
    Service.getClassify().then((res) => {
      console.log(res.data.data);
      const promises = res.data.data.map((item) => {
        return {
          key: item,
          label: item,
        };
      });
      Promise.all(promises).then((res) => {
        const headerMenuTemp = dynamicMenuHeaderProps(res);
        setHeaderMenu(headerMenuTemp);
      });
    });
    navigate("detail");

    // Promise.all(promise).then((res)=>{console.log})
  }, []);

  return (
    <>
      <Layout className="layout">
        <Header className="menu">
          <Menu
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["detail"]}
            items={headerMenu}
            className="menu-center"
            onClick={(props) => {
              if (props.key.length !== 0) {
                console.log(props.key);
                navigate(props.key, { replace: true });
              }
            }}
          />
          {/* <MySearch /> */}
          <SearchTest1 />
          <Dropdown menu={{ items: menuHeaderRItems }} className="menu-right">
            <a onClick={(e) => e.preventDefault()}>Setting</a>
          </Dropdown>
          {/* <Menu
            mode="horizontal"
            items={menuHeaderPropsR}
            className="menu-right"
            onClick={(props) => {
              if (props.key.length !== 0) {
                console.log(props.key);

                navigate(props.key, { replace: true });
              }
            }}
          /> */}
        </Header>
        <Content>
          <div className="content" style={{ background: "colorBgContainer" }}>
            <Outlet />
          </div>
        </Content>
        <Footer className="footer">
          Personal Blog ©2023 Created by gbnijnugyf
        </Footer>
      </Layout>
    </>
  );
}
