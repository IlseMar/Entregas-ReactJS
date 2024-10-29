import React, { useContext, useState } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import CartItem from "./CartItem";
import styles from "../styles/cart.module.scss";
import { NavLink } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const Cart = () => {
  const { cart, totalQuantity, totalPrice, clearCart } =
    useContext(CartContext);
  const [message, setMessage] = useState(""); // Estado para mensajes de confirmación o error

  const handlePurchase = async () => {
    const order = {
      buyer: {
        name: "Jhon",
        lastName: "Doe",
        email: "jhon@example.com",
      },
      products: cart,
      total: totalPrice,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Orden creada con ID: ", docRef.id);
      setMessage("¡Compra realizada con éxito! Gracias por su compra.");
      clearCart(); // Vacía el carrito después de la compra
    } catch (error) {
      console.log("Error al crear la orden: ", error);
      setMessage(
        "Hubo un error al procesar su compra. Por favor, intente de nuevo."
      );
    }
  };

  return (
    <div className={styles.container}>
      {cart.length ? (
        <>
          <h2>Carrito de compras</h2>
          <p>Total de productos: {totalQuantity}</p>
          <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
          {cart.map((cartItem) => (
            <CartItem item={cartItem} key={cartItem.id} />
          ))}
          <button onClick={handlePurchase} className={styles.purchaseButton}>
            Finalizar compra
          </button>
          {message && <p className={styles.message}>{message}</p>}
        </>
      ) : (
        <>
          <h1>No hay productos en el carrito</h1>
          <NavLink to={"/"}>Volver al inicio</NavLink>
          {message && <p className={styles.message}>{message}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;

// import React, { useContext } from "react";
// import { Cart as CartContext } from "../context/CartProvider";
// import CartItem from "./CartItem";
// import styles from "../styles/cart.module.scss";
// import { NavLink } from "react-router-dom";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase/config";
// import endPurchase from "../service/endPurchase";

// const Cart = () => {
//   const { cart } = useContext(CartContext);
//   console.log({ cart });

//   const handlePurchase = () => {
//     const order = {
//       buyer: {
//         name: "Jhon",
//         lastName: "Doe",
//         email: "jhon",
//       },
//       products: cart,
//       total: 1245, //reemplazar por un método correspondiente (reduce, useMemo),
//       timestamp: serverTimestamp(),
//     };
//     (async () => {
//       try {
//         // Add a new document with a generated id.
//         const docRef = await addDoc(collection(db, "orders"), order);
//         console.log("Document written with ID: ", docRef.id);
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   };

//   return (
//     <div className={styles.container}>
//       {cart.length ? (
//         <>
//           {cart.map((cartItem) => {
//             return <CartItem item={cartItem} key={cartItem.id} />;
//           })}
//           <button onClick={() => endPurchase(cart)}>End purchase</button>
//         </>
//       ) : (
//         <>
//           <h1>No hay productos en el cart</h1>
//           <NavLink to={"/"}>Home</NavLink>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
