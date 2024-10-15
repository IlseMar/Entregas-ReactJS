import React from "react";
import styles from "../styles/footer.module.scss";
import logoInsta from "../assets/img/logos/Instagram.png";
import logoFace from "../assets/img/logos/Facebook.png";
import logoTik from "../assets/img/logos/TikTok.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <NavLink
        // style="text-decoration: none"
        className={styles.logos}
        to="https://www.instagram.com/chromati.ca/"
        target="_blank"
      >
        <img src={logoInsta} alt="Instagram" />
      </NavLink>
      <NavLink
        // style="text-decoration: none"
        className={styles.logos}
        to="https://www.facebook.com/profile.php?id=100076318662834&mibextid=ZbWKwL"
        target="_blank"
      >
        <img src={logoFace} alt="facebook" />
      </NavLink>
      <NavLink
        className={styles.logos}
        to="https://www.tiktok.com/@chromati.ca?pid=video_embed&referer_video_id=7347371493220764934&videoId=7347371493220764934&type=video&referer_url=127.0.0.1:5500/index.html&refer=embed&embed_source=121374463,121433650,121404359,121331973,120811592,120810756,72248228;null;embed_name"
        target="_blank"
      >
        <img src={logoTik} alt="tiktok" />
      </NavLink>
    </footer>
  );
};

export default Footer;
