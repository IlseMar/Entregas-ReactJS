import React from "react";
import Carrusel from "./Carrusel";
import ItemListContainer from "./ItemListContainer";
import styles from "../styles/home.module.scss";

const Home = () => {
  return (
    <div className={styles["home-container"]}>
      <Carrusel />
      <ItemListContainer />
    </div>
  );
};

export default Home;
