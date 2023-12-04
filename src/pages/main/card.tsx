import { Card } from "antd";
import { IArticleList } from "../../globe/inter";

export interface ICardArray{
  list:IArticleList[]
}

export function CardArray(props:ICardArray) {
  return (
    <>
      <div className="carousel-content">
        <div className="carousel-content-text">
          {props.list.map((card) => {
            return (
              <Card
                hoverable
                className="carousel-content-item"
                cover={
                  <div style={{ overflow: "hidden", height: "100%" }}>
                    <img
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                      alt="example"
                      src={card.cover}
                    />
                  </div>
                }
                onClick={() => {console.log(card.ID)}}
              >
                <p className="ant-card-text">
                  <div>{card.title}</div>
                </p>
              </Card>
            );
          })}
          
        </div>
      </div>
    </>
  );
}
