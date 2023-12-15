import { Carousel } from "antd";
import {  useLocation } from "react-router-dom";

import "./css/index.css";
import { useEffect, useState } from "react";
import { CardArray } from "./card";
import { Service } from "../../globe/service";
import { IArticleList } from "../../globe/inter";

export function DetailPage() {
  const location = useLocation();
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
    if (location.state.className === "") {
      Service.getArticleList("all").then((res) => {
        const dataArr = convertTo2DArray(res.data.data, maxNum);
        console.log(dataArr);
        setCardArr(dataArr);
      });
    } else {
      Service.getArticleList(location.state.className).then((res) => {
        const dataArr = convertTo2DArray(res.data.data, maxNum);
        console.log("class", dataArr);
        setCardArr(dataArr);
      });
    }
  }, [location]);

  return (
    <>
      <div className="container-detailPage">
        {location.state.className !== "" ? (
          <h1
            style={{
              fontSize: "large",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {location.state.className}
          </h1>
        ) : null}
        <Carousel className="my-carousel" autoplay={true}>
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
