// import React from 'react';
// import logo from './logo.svg';
import ReactMarkdown from "react-markdown";
import "./css/App.css";
import { Routers } from "./routers/router";
import remarkGfm from "remark-gfm";
// import { useNavigate } from 'react-router-dom';
// import { Layout } from 'antd';
// import { Content, Footer, Header } from 'antd/es/layout/layout';
// import Sider from 'antd/es/layout/Sider';

function DevTools() {
  return (
    <div style={{ position: "absolute", zIndex: 9999 }}>
      {/* <span>develop version</span> */}
      <button
        onClick={() => {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          } else {
            localStorage.setItem("token", "123");
          }
          window.location.href = "/";
        }}
      >
        {localStorage.getItem("token") ? "删除token" : "生成token"}
      </button>
    </div>
  );
}

function App() {
  // const navigate = useNavigate();

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Routers />
      {/* </header> */}
    </div>
  );
}

export default App;
