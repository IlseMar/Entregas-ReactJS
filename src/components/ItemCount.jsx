import React, { useState } from "react";
import classNames from "classnames";
import styles from "../styles/itemcount.module.scss";

const ItemCount = ({ initial = 1, onQuantityChange, className }) => {
  const [count, setCount] = useState(initial);

  const increment = (event) => {
    event.stopPropagation();
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  const decrement = (event) => {
    event.stopPropagation();
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange(newCount);
    }
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.operators}>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default ItemCount;
