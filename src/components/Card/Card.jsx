import "./Card.css";
import { Spin } from "antd";

const Card = ({ card, isLoading }) => {
  return (
    <>
      <div className="card">
        <Spin spinning={isLoading}>
          <div className="card__product">
            {card?.result?.map((e, i) => (
              <div key={e.id + i} className="card__item">
                <ul>
                  <li>{e.product}</li>
                  <li>Brand: {e.brand}</li>
                  <li>Price: {e.price}</li>
                </ul>
              </div>
            ))}
          </div>
        </Spin>
      </div>
    </>
  );
};
export default Card;
