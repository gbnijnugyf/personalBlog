import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PageContainer, ProLayout } from "@ant-design/pro-layout";
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <ProLayout> */}
          <Layout className='layout'>
            <Header>Header</Header>
            <Layout>
              <Sider>Sider</Sider>
              <Content>Content</Content>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        {/* </ProLayout> */}
        fsdd
      </header>
    </div>
  );
}

export default App;
