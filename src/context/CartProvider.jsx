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

  const totalPrice = cart.reduce((acc, product) => acc + product.costoTotal, 0);

  return (
    <Cart.Provider
      value={{
        cart,
        addCart,
        updateQuantity,
        clearCart,
        removeFromCart, // Añadido aquí
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartProvider;

// import { createContext, useState } from "react";

// //1. Crear el contexto
// export const Cart = createContext();

// //2. Crear el componente que va a proveer ese contexto <NombreProvider>
// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [quantity, setQuantity] = useState(0);

//   const addCart = (product, productQuantity) => {
//     //Ojo con hacer push al state. Se hace push a otra variable auxiliar.
//     //Los states son inmutables.
//     const productInCart = isInCart(product.id);
//     console.log(productInCart);
//     let cartUpdated = [...cart];
//     if (productInCart) {
//       cartUpdated = cart.map((cartProduct) => {
//         if (cartProduct.id === product.id) {
//           return {
//             ...cartProduct,
//             quantity: cartProduct.quantity + productQuantity,
//           };
//         }
//         return cartProduct;
//       });
//     } else {
//       cartUpdated.push({ ...product, quantity: productQuantity });
//     }

//     setCart(cartUpdated);
//     // setQuantity(cartUpdated.length)
//   };

//   //Devuelve true o false dependiendo si esta o no en el cart
//   const isInCart = (productId) => {
//     return cart.some((cartProduct) => cartProduct.id === productId);
//   };

//   return (
//     <Cart.Provider value={{ cart, addCart, quantity }}>
//       {children}
//     </Cart.Provider>
//   );
// };

// export default CartProvider;
