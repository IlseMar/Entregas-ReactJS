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
  const [message, setMessage] = useState("");

  const handlePurchase = async () => {
    // Verificación para evitar productos con campos undefined
    const productsToOrder = cart.map((product) => ({
      id: product.id,
      title: product.title || "Título desconocido", // Proporciona un valor predeterminado
      unidades: product.unidades || 0,
      costoTotal: product.costoTotal || 0,
    }));

    const order = {
      buyer: {
        name: "Jhon",
        lastName: "Doe",
        email: "jhon@example.com",
      },
      products: productsToOrder,
      total: totalPrice,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      console.log("Orden creada con ID: ", docRef.id);
      setMessage("¡Compra realizada con éxito! Gracias por su compra.");
      clearCart(); // Vacía el carrito después de la compra
    } catch (error) {
      console.error("Error al crear la orden: ", error);
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
