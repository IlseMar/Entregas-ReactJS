import { createContext, useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export const Cart = createContext();

const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (product, productQuantity) => {
    const productInCart = isInCart(product.id);
    let cartUpdated = [...cart];

    if (productInCart) {
      cartUpdated = cart.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            unidades: cartProduct.unidades + productQuantity,
          };
        }
        return cartProduct;
      });
    } else {
      const unitPrice = parseFloat(product.precio) || 0;
      cartUpdated.push({ ...product, unidades: productQuantity });
    }

    setCart(cartUpdated);
  };

  const updateQuantity = (productId, quantity) => {
    const cartUpdated = cart.map((cartProduct) =>
      cartProduct.id === productId
        ? { ...cartProduct, unidades: quantity }
        : cartProduct
    );
    setCart(cartUpdated);
  };

  const clearCart = () => {
    setCart([]); // Vacía el carrito
    localStorage.removeItem("cart");
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const isInCart = (productId) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const totalQuantity = cart.reduce(
    (acc, product) => acc + product.unidades,
    0
  );

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.costoTotal * product.unidades,
    0
  );

  const saveCartToFirestore = async () => {
    try {
      for (const product of cart) {
        await addDoc(collection(db, "products"), {
          title: product.title,
          price: product.costoTotal,
          description: product.description || "Descripción no disponible",
          pictureUrl: product.pictureUrl || "URL no disponible",
          stock: product.unidades || 1,
          category: product.category || "Sin categoría",
        });
      }
      console.log("Carrito guardado en Firestore exitosamente.");
      clearCart(); // Opcional: limpiar el carrito después de guardar
    } catch (error) {
      console.log("Error al guardar el carrito en Firestore: ", error);
    }
  };

  return (
    <Cart.Provider
      value={{
        cart,
        addCart,
        updateQuantity,
        clearCart,
        removeFromCart,
        totalQuantity,
        totalPrice,
        saveCartToFirestore,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartProvider;
