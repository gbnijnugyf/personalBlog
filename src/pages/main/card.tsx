import { Card } from "antd";
import { IArticleList } from "../../globe/inter";
import { useNavigate } from "react-router-dom";

export interface ICardArray {
  list: IArticleList[];
}

export function CardArray(props: ICardArray) {
  const navigate = useNavigate();
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
                    className="img"
                      alt="example"
                      src={card.cover}
                    />
                  </div>
                }
                onClick={() => {
                  navigate("/main/article", {
                    replace: true,
                    state: { id: card.ID },
                  });
                }}
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
