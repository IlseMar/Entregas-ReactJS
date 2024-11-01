import { createContext, useState } from "react";

export const Cart = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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

  // const totalPrice = cart.reduce((acc, product) => acc + product.costoTotal, 0);

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
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartProvider;
