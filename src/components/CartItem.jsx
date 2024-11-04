import React, { useContext } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import ItemCount from "./ItemCount";
import styles from "../styles/cartItem.module.scss";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.diseño} className={styles.productImage} />

      <div className={styles.productDetails}>
        <h1>{item.diseño}</h1>
        <p>Modelo: {item.modelo}</p>
        <p>Precio unitario: ${item.precioUnitario}</p>
        <p>Precio total: ${item.precioUnitario * item.unidades}</p>
        <p>Cantidad: {item.unidades}</p>
      </div>

      <ItemCount
        itemId={item.id}
        initial={item.unidades}
        onQuantityChange={handleQuantityChange}
      />

      <button
        onClick={() => removeFromCart(item.id)}
        className={styles.deleteButton}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
