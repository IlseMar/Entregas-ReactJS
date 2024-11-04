import { NavLink } from "react-router-dom";
import cart from "../assets/img/logos/carrito.png";
import styles from "../styles/cartWidget.module.scss";
import { useContext } from "react";
import { Cart as CartContext } from "../context/CartProvider";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);
  return (
    <NavLink to="/cart" className={styles.cartLink}>
      <img className={styles.cart} src={cart} alt="cart" />
      <span>{totalQuantity}</span>
    </NavLink>
  );
};

export default CartWidget;
