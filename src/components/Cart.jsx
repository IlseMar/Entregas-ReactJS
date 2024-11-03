import React, { useContext, useState } from "react";
import { Cart as CartContext } from "../context/CartProvider";
import CartItem from "./CartItem";
import styles from "../styles/cart.module.scss";
import { NavLink } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2"; // Importar SweetAlert
import CheckoutForm from "./CheckoutForm";

const Cart = () => {
  const { cart, totalQuantity, totalPrice, clearCart } =
    useContext(CartContext);
  const [buyerData, setBuyerData] = useState(null); // Añadido para almacenar los datos del comprador

  const handleFormSubmit = (data) => {
    setBuyerData(data); // Guarda los datos del comprador
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
      console.log("Orden creada con ID: ", docRef.id);
      Swal.fire({
        title: "¡Compra realizada con éxito!",
        text: `Gracias, ${buyerData.name}. Su ID de orden es: ${docRef.id}. Le haremos llegar todos los detalles a ${buyerData.email}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      clearCart(); // Vacía el carrito después de la compra
    } catch (error) {
      console.error("Error al crear la orden: ", error);
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
          <h2>Carrito de compras</h2>
          <p>Total de productos: {totalQuantity}</p>
          <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
          {cart.map((cartItem) => (
            <CartItem item={cartItem} key={cartItem.id} />
          ))}
          <CheckoutForm onFormSubmit={handleFormSubmit} />
          <button onClick={handlePurchase} className={styles.purchaseButton}>
            Finalizar compra
          </button>
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

// import React, { useContext, useState } from "react";
// import { Cart as CartContext } from "../context/CartProvider";
// import CartItem from "./CartItem";
// import CheckoutForm from "./CheckoutForm";
// import styles from "../styles/cart.module.scss";
// import { NavLink } from "react-router-dom";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase/config";
// import Swal from "sweetalert2"; // Importar SweetAlert

// const Cart = () => {
//   const { cart, totalQuantity, totalPrice, clearCart } =
//     useContext(CartContext);
//   const [message, setMessage] = useState("");
//   const [buyerData, setBuyerData] = useState(null); // Añadido para almacenar los datos del comprador

//   const handleFormSubmit = (data) => {
//     setBuyerData(data); // Guarda los datos del comprador
//   };

//   const handlePurchase = async () => {
//     // Verificación para evitar productos con campos undefined
//     const productsToOrder = cart.map((product) => ({
//       id: product.id,
//       title: product.title || "Título desconocido",
//       unidades: product.unidades || 0,
//       costoTotal: product.costoTotal || 0,
//     }));

//     const order = {
//       buyer: buyerData, // Usa los datos del comprador
//       products: productsToOrder,
//       total: totalPrice,
//       timestamp: serverTimestamp(),
//     };

//     try {
//       const docRef = await addDoc(collection(db, "orders"), order);
//       console.log("Orden creada con ID: ", docRef.id);
//       setMessage(`¡Compra realizada con éxito! Gracias, ${buyerData.name}.
//       Su ID de orden es: ${docRef.id} Le haremos llegar toda su información al correo ${buyerData.email}`);
//       clearCart(); // Vacía el carrito después de la compra
//     } catch (error) {
//       console.error("Error al crear la orden: ", error);
//       setMessage(
//         "Hubo un error al procesar su compra. Por favor, intente de nuevo."
//       );
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {cart.length ? (
//         <>
//           <h2>Carrito de compras</h2>
//           <p>Total de productos: {totalQuantity}</p>
//           <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
//           {cart.map((cartItem) => (
//             <CartItem item={cartItem} key={cartItem.id} />
//           ))}
//           <CheckoutForm onFormSubmit={handleFormSubmit} />
//           <button onClick={handlePurchase} className={styles.purchaseButton}>
//             Finalizar compra
//           </button>
//           {message && <p className={styles.message}>{message}</p>}
//         </>
//       ) : (
//         <>
//           <h1>No hay productos en el carrito</h1>
//           <NavLink to={"/"}>Volver al inicio</NavLink>
//           {message && <p className={styles.message}>{message}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useContext, useState } from "react";
// import { Cart as CartContext } from "../context/CartProvider";
// import CartItem from "./CartItem";
// import CheckoutForm from "./CheckoutForm";
// import styles from "../styles/cart.module.scss";
// import Swal from "sweetalert2";
// import { NavLink } from "react-router-dom";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase/config";

// const Cart = () => {
//   const { cart, totalQuantity, totalPrice, clearCart } =
//     useContext(CartContext);
//   const [buyerData, setBuyerData] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFormSubmit = (data) => {
//     setBuyerData(data);
//   };

//   const handlePurchase = async () => {
//     if (!buyerData) {
//       Swal.fire({
//         title: "Datos incompletos",
//         text: "Por favor, completa todos los datos del formulario antes de finalizar la compra.",
//         icon: "warning",
//         confirmButtonText: "Aceptar",
//         timer: 3000,
//       });
//       return;
//     }

//     const productsToOrder = cart.map((product) => ({
//       id: product.id,
//       title: product.title || "Título desconocido",
//       unidades: product.unidades || 0,
//       costoTotal: product.costoTotal || 0,
//     }));

//     const order = {
//       buyer: {
//         name: buyerData.name,
//         email: buyerData.email,
//         paymentMethod: buyerData.paymentMethod,
//       },
//       products: productsToOrder,
//       total: totalPrice,
//       timestamp: serverTimestamp(),
//     };

//     try {
//       const docRef = await addDoc(collection(db, "orders"), order);
//       Swal.fire({
//         title: "¡Compra exitosa!",
//         text: "Gracias por su compra. Su orden ha sido creada.",
//         icon: "success",
//         confirmButtonText: "Aceptar",
//         timer: 3000,
//       });
//       clearCart();
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Hubo un problema al procesar su compra. Intente de nuevo.",
//         icon: "error",
//         confirmButtonText: "Aceptar",
//         timer: 3000,
//       });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {cart.length ? (
//         <>
//           <h2>Carrito de compras</h2>
//           <p>Total de productos: {totalQuantity}</p>
//           <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
//           {cart.map((cartItem) => (
//             <CartItem item={cartItem} key={cartItem.id} />
//           ))}

//           <CheckoutForm onFormSubmit={handleFormSubmit} />

//           <button onClick={handlePurchase} className={styles.purchaseButton}>
//             Finalizar compra
//           </button>
//           {message && <p className={styles.message}>{message}</p>}
//         </>
//       ) : (
//         <>
//           <h1>No hay productos en el carrito</h1>
//           <NavLink to={"/"}>Volver al inicio</NavLink>
//           {message && <p className={styles.message}>{message}</p>}
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
