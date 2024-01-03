import React from "react";
import { Link, useParams } from "react-router-dom";

export default function ItemDetail({ itemList }) {
  const { id } = useParams();
  const items = itemList.items;
  const item = items?.find((item) => item._id === id);

  return (
    <div className="itemDetail">
      <>
        <h1 className="itemDetailName">{item.name}</h1>
        <p className="itemDetailBrand">{item.brand}</p>

        <img className="itemDetailImage" src={item.img} alt={item.name} />
        {item.limited && <span className="badge">Limited</span>}
        <p className="itemDetailDescription">{item.description}</p>
        {item.discount ? (
          <>
            <p className="itemDetailStrikethrough">{item.price.toFixed(2)} €</p>
            <div>
              <span className="itemDetailPrice">
                {(item.price * 0.85).toFixed(2)} €
              </span>
              <span className="discountValueDetail">-10%</span>
            </div>
          </>
        ) : (
          <p className="itemDetailPrice">{item.price.toFixed(2)} €</p>
        )}
      </>
      <div className="backButton">
        <Link to={"/"}>
          <p>Back</p>
        </Link>
      </div>
    </div>
  );
}
