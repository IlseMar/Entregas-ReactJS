import React, { useContext } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import ItemCount from "./ItemCount";
import styles from "../styles/cartItem.module.scss";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <NavLink className={styles.link} to={`/detail/${item.id}`}>
      <div className={styles.cartItem}>
        <img
          src={item.image}
          alt={item.diseño}
          className={styles.productImage}
        />

        <div className={styles.productDetails}>
          <h1>{item.diseño}</h1>
          <p>Modelo: {item.modelo}</p>
          <p>Precio unitario: ${item.precioUnitario}</p>
          <p>Precio total: ${item.precioUnitario * item.unidades}</p>
          <p>Cantidad: {item.unidades}</p>
        </div>

        <ItemCount
          initial={item.unidades}
          onQuantityChange={handleQuantityChange}
          className={classNames(styles.itemCount, styles.number)}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromCart(item.id);
          }}
          className={styles.deleteButton}
        >
          Eliminar
        </button>
      </div>
    </NavLink>
  );
};

export default CartItem;
