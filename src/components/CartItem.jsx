import React, { useContext } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import ItemCount from "./ItemCount"; // Asegúrate de importar el componente de contador
import styles from "../styles/cartItem.module.scss";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Función para actualizar la cantidad en el contexto
  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className={styles.cartItem}>
      <img src={item.pictureUrl} alt={item.title} />
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <p>Cantidad: {item.quantity}</p>

      {/* Componente de contador para cambiar la cantidad */}
      <ItemCount
        itemId={item.id}
        initial={item.quantity}
        onQuantityChange={handleQuantityChange}
      />

      <button
        onClick={() => removeFromCart(item.id)}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </div>
  );
};

export default CartItem;

// import React from "react";
// import styles from "../styles/cartItem.module.scss";

// const CartItem = ({ item }) => {
//   return (
//     <div className={styles.cartItem}>
//       <img src={item.pictureUrl} />
//       <h1>{item.title}</h1>
//       <p>{item.description}</p>
//       <p>{item.price}</p>
//       <p>{item.quantity}</p>
//       <button>Delete</button>
//     </div>
//   );
// };

// export default CartItem;
