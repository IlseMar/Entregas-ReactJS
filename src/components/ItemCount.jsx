import React, { useState } from "react";
import styles from "../styles/itemcount.module.scss";

const ItemCount = ({ itemId, initial = 1, onQuantityChange, addCart }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  // const handleAddToCart = () => {
  //   addCart(count); // Llama a addCart al hacer clic
  // };

  return (
    <div className={styles.container}>
      <div className={styles.operators}>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default ItemCount;
