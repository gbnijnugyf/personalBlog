import { Card } from "antd";
import Meta from "antd/es/card/Meta";

export function CardArray() {
  return (
    <>
      <div className="carousel-content">
        <div className="carousel-content-text">
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
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              </div>
            }
            onClick={() => console.log("1")}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <div className="carousel-content-item">article</div>
          <div className="carousel-content-item">article</div>
          <div className="carousel-content-item">article</div>
          <div className="carousel-content-item">article</div>
          <div className="carousel-content-item">article</div>
          <div className="carousel-content-item">article</div>
          <div className="carousel-content-item">article</div>
        </div>
      </div>
    </>
  );
}
