import React from "react";
import Carrusel from "./Carrusel";
import ItemListContainer from "./ItemListContainer";
import styles from "../styles/home.module.scss";
import TikTok from "./TikTok";
import SocialNetworks from "./SocialNetworks";

const Home = () => {
  return (
    <div className={styles["home-container"]}>
      <Carrusel />
      <ItemListContainer />
      <TikTok />
      <SocialNetworks />
    </div>
  );
};

export default Home;
