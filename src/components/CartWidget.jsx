import cart from "../assets/cart.svg";
import styles from "../styles/navbar.module.scss";

const CartWidget = () => {
  return (
    <>
      <img className={styles.cart} src={cart} alt="cart" />
      <span>(3)</span>
    </>
  );
};

export default CartWidget;
