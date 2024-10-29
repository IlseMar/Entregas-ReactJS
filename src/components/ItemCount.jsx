import React, { useState } from "react";
import styles from "../styles/itemcount.module.scss";

const ItemCount = ({ initial = 1, onQuantityChange }) => {
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
