import React, { useState } from "react";
import styles from "../styles/item.module.scss";
import { NavLink } from "react-router-dom";

const Item = ({ item }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const button = e.currentTarget;
    const x = -50 + (e.pageX - button.offsetLeft - 300 / 2) / 3;
    const y = -10 + (e.pageY - button.offsetTop - 100 / 2) / 3;
    setCoords({ x, y });
  };

  return (
    <div className={styles.container} alt={item.title}>
      <img src={item.pictureUrl} alt={item.title} />
      <h2 className={styles.title}>{item.title}</h2>
      <span className={styles.productInfo}>{item.description}</span>
      <NavLink to={`/detail/${item.id}`}>
        <button
          className={styles.button}
          onMouseMove={handleMove}
          onTouchMove={(e) => handleMove(e.changedTouches[0])}
        >
          <div className={styles.pattern}>
            <div
              className={`${styles.target} ${styles.inner} ${styles.bg4}`}
              style={{
                "--x": `${coords.x}px`,
                "--y": `${coords.y}px`,
              }}
            ></div>
          </div>
          <div className={styles.text}>Detalles</div>
        </button>
      </NavLink>
    </div>
  );
};

export default Item;
