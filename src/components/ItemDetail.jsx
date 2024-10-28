import React, { useContext, useState } from "react";
import ItemCount from "./ItemCount";
import { Cart } from "../context/CartProvider";
import { NavLink } from "react-router-dom";

const ItemDetail = ({ product }) => {
  const { addCart } = useContext(Cart);
  const [itemCountVisibility, setItemCountVisibility] = useState(true);
  console.log(product);

  const handleCart = (quantity) => {
    setItemCountVisibility(false);
    addCart(product, 1);
  };

  return (
    <div>
      <h1>Item detail</h1>
      <img src={product.pictureUrl} style={{ width: 300 }} />
      <h2>{product.title}</h2>
      <h3>{product.basePrice}</h3>
      <span>{product.description2}</span>
      {itemCountVisibility ? (
        <ItemCount addCart={handleCart} />
      ) : (
        <button>
          <NavLink to={"/cart"}>Go cart</NavLink>
        </button>
      )}
    </div>
  );
};

export default ItemDetail;
