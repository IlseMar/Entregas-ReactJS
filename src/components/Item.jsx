import React from "react";
import styles from "../styles/item.module.scss";
import { NavLink } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className={styles.container} alt={item.title}>
      <img src={item.pictureUrl} />
      <h2>{item.title}</h2>
      <span className={styles.productInfo}>{item.description}</span>
      <NavLink to={`/detail/${item.id}`}>
        <button className={styles.btnDetail}>
          <span className={styles.textDetail}>Detalles</span>
        </button>
      </NavLink>
    </div>
  );
};

export default Item;
