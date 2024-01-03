import React from "react";
import { Route, Routes, Link } from "react-router-dom";

export default function ItemList(props) {
  const items = props.itemList.items;

  return (
    <div className="itemList">
      {items?.map((item) => (
        <div key={item._id} className="itemTile">
          <div className="itemImg">
            <img src={item.img} alt={item.name} />
          </div>
          <div>
            {item.limited ? (
              <span className="badge">Limited</span>
            ) : (
              <span className="noBadge">...........</span>
            )}
          </div>
          <div className="itemName">
            <h3>{item.name}</h3>
          </div>
          <div className="itemPrice">
            {item.discount ? (
              <div>
                <p className="strikethrough">{item.price.toFixed(2)} €</p>
                <span className="discountedPrice">
                  {(item.price * 0.9).toFixed(2)} €
                </span>
                <span className="discountValue">-10%</span>
              </div>
            ) : (
              <span>{item.price.toFixed(2)} € </span>
            )}{" "}
          </div>
          <div className="button">
            <Link to={`/${item._id}`}>
              <p>Details</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
