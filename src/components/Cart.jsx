import React, { useContext, useState } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import CartItem from "./CartItem";
import styles from "../styles/cart.module.scss";
import { NavLink } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const { cart, totalQuantity, totalPrice, clearCart } =
    useContext(CartContext);
  const [buyerData, setBuyerData] = useState(null);

  const handleFormSubmit = (data) => {
    setBuyerData(data);
  };

  const handlePurchase = async () => {
    if (!buyerData) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa el formulario antes de finalizar la compra.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const productsToOrder = cart.map((product) => ({
      id: product.id,
      title: product.title || "Título desconocido",
      unidades: product.unidades || 0,
      costoTotal: product.costoTotal || 0,
    }));

    const order = {
      buyer: buyerData,
      products: productsToOrder,
      total: totalPrice,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      Swal.fire({
        title: "¡Compra realizada con éxito!",
        text: `Gracias, ${buyerData.name}. Su ID de orden es: ${docRef.id}. Le haremos llegar todos los detalles a ${buyerData.email}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      clearCart();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al procesar su compra. Por favor, intente de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className={styles.container}>
      {cart.length ? (
        <>
          <div className={styles.cartSection}>
            {cart.map((cartItem) => (
              <CartItem item={cartItem} key={cartItem.id} />
            ))}
          </div>

          <div className={styles.formSection}>
            <CheckoutForm onFormSubmit={handleFormSubmit} />
          </div>

          <div className={styles.summarySection}>
            <h2>Carrito de compras</h2>
            <p>Total de productos: {totalQuantity}</p>
            <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
            <button onClick={handlePurchase} className={styles.purchaseButton}>
              Finalizar compra
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>No hay productos en el carrito</h1>
          <NavLink to={"/"}>Volver al inicio</NavLink>
        </>
      )}
    </div>
  );
};

export default Cart;
