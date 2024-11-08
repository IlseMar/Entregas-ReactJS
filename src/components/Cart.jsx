import React, { useContext, useState, useEffect } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import CartItem from "./CartItem";
import styles from "../styles/cart.module.scss";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2";
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const { cart, totalQuantity, totalPrice, clearCart } =
    useContext(CartContext);
  const [buyerData, setBuyerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      Swal.fire({
        title: "No hay productos en el carrito",
        text: "Vuelve a la tienda para agregar productos.",
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Volver al inicio",
      }).then(() => {
        navigate("/");
      });
    }
  }, [cart, navigate]);

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
        text: `Gracias, ${buyerData.name}. 
        Tu ID de orden es: ${docRef.id}. 
        Te haremos llegar todos los detalles a ${buyerData.email}`,
        icon: "success",
        confirmButtonText: "Aceptar",
        width: 400,
        padding: "1em",
        color: "#716add",
        background: "#fff",
        backdrop: `rgba(0,0,123,0.4) url("../assets/gift/PYh.gif") `,
      });
      clearCart();
      navigate("/");
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
        // Todo lo manejará SweetAlert
        <></>
      )}
    </div>
  );
};

export default Cart;
