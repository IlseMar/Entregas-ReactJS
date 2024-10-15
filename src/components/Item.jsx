import React from "react";
import styles from "../styles/item.module.scss";
import { NavLink } from "react-router-dom";

/*{
  "id": 1,
  "title": "Fundas, diseños básicos",
  "basePrice": 100,
  "category": "fundas",
  "description": "Fundas para celular con diseños personalizados sencillos, con pocos detalles",
  "pictureUrl": "http://127.0.0.1:5502/assets/img/fundas/chromatica-funda-basica.png"
}*/

const Item = ({ item }) => {
  return (
    <div className={styles.container} alt={item.title}>
      <img src={item.pictureUrl} />
      <h2>{item.title}</h2>
      <span className={styles.productInfo}>{item.description}</span>
      <span>{item.basePrice}</span>
      <NavLink to={`/detail/${item.id}`}>
        <button className={styles.btnDetail}>
          <span className={styles.textDetail}>Detalles</span>
        </button>
      </NavLink>
    </div>
  );
};

export default Item;
