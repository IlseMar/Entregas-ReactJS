import React from "react";
import styles from "../styles/socialNetworks.module.scss";
import instagramLogo from "../assets/img/logos/Instagram.png";

const SocialNetworks = () => {
  return (
    <section className={styles.cajaCompartir}>
      <div className={styles.fondoBlanco}>
        <h3 className={styles.obj1}>COMPÁRTENOS TU EXPERIENCIA</h3>
        <h4 className={styles.obj2}>Etiquétanos en Instagram</h4>
        <a
          style={{ textDecoration: "none" }}
          href="https://www.instagram.com/chromati.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className={styles.obj3}>
            <img src={instagramLogo} alt="Instagram logo" />
            <h5 className={styles.botonIg}>@chromati.ca</h5>
          </button>
        </a>
      </div>
    </section>
  );
};

export default SocialNetworks;
