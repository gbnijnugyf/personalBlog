import { Breadcrumb, Carousel, Menu, theme } from "antd";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";
import { menuMainDetailSider } from "../../menu/menuProps";
import "./css/index.css";
import { useEffect } from "react";

export function Teach1Page() {
  return <div className="teachPage">Teach1Page</div>;
}
export function Teach2Page() {
  return <div className="teachPage">Teach2Page</div>;
}
export function Teach3Page() {
  return <div className="teachPage">Teach3Page</div>;
}

export function DetailPage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => navigate("./teach1"));
  // navigate("./teach1")
  return (
    <>
      <div className="container-detailPage">
        <Carousel className="carousel" autoplay>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
        <Layout>
          <Content style={{ padding: "0 5vw" }}>
            <Breadcrumb style={{ margin: "2vh 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <Layout style={{ padding: "2% 0", background: colorBgContainer }}>
              <Sider
                style={{ background: colorBgContainer }}
                width={200}
                collapsible={true}
              >
                <Menu
                  mode="inline"
                  style={{ height: "100%" }}
                  items={menuMainDetailSider}
                  onClick={(props) =>
                    props.key.length !== 0 ? navigate(props.key) : null
                  }
                />
              </Sider>
              <Content style={{ padding: "0 2vw", minHeight: 280 }}>
                <Outlet />
              </Content>
            </Layout>
          </Content>
          <Footer>
            个人技术分享<br/>
            <a style={{marginRight:"10px"}} href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">
            备案号
            </a>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
              粤ICP备2023105609号
            </a>
          </Footer>
        </Layout>
      </div>
    </>
  );
}
