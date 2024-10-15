import React from "react";

const ItemDetail = ({ product }) => {
  console.log(product);

  return (
    <div>
      <img src={product.pictureUrl} style={{ width: 300 }} />
      <h1>{product.title}</h1>
      <h2>{product.basePrice}</h2>
      <span>{product.description2}</span>
      {/*Item Count*/}
    </div>
  );
};

export default ItemDetail;
