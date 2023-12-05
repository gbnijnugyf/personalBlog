import { Breadcrumb, Card, Carousel, Menu, theme, Image } from "antd";
import Layout, { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";
import { menuMainDetailSider } from "../../menu/menuProps";
import "./css/index.css";
import { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import { CardArray } from "./card";
import { Service } from "../../globe/service";
import { IArticleList } from "../../globe/inter";


export function DetailPage() {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const [cardArr, setCardArr] = useState<IArticleList[][]>([]);
  const maxNum = 8; //单页

  //将文章列表转换为一组columns个的二维数组
  function convertTo2DArray(arr: any[], columns: number): any[][] {
    const result: any[][] = [];
    const rows = Math.ceil(arr.length / columns);

    for (let i = 0; i < rows; i++) {
      const row = arr.slice(i * columns, (i + 1) * columns);
      result.push(row);
    }

    return result;
  }

  useEffect(() => {
    Service.getArticleList('').then((res) => {
      // console.log(res.data.data)
      const dataArr = convertTo2DArray(res.data.data, maxNum);
      console.log(dataArr);
      setCardArr(dataArr);
    });
  }, []);

  return (
    <>
      <div className="container-detailPage">
        <Carousel className="my-carousel">
          {cardArr.length > 0 ? (
            cardArr.map((pageArr) => {
              return (
                <>
                  <CardArray list={pageArr} />
                </>
              );
            })
          ) : (
            <p>暂无可见文章</p>
          )}
        </Carousel>
      </div>
    </>
  );
}
