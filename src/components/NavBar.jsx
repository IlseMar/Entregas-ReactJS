import React, { useContext, useState } from "react";
import styles from "../styles/navbar.module.scss";
import { NavLink } from "react-router-dom";
import Switch from "./Switch";
import { Theme } from "../context/ThemeProvider";
import CartWidget from "./CartWidget";

const NavBar = () => {
  const { dark, setDark } = useContext(Theme);

  return (
    <nav
      className={`${styles.elementosNav} ${
        dark ? styles["elementosNav-dark"] : ""
      }`}
    >
      <h1 className={styles.tituloNav}>CHORMATICA</h1>
      <ul className={styles.list}>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? styles.isActive
                : `${styles.notActive} ${dark ? styles["notActive-dark"] : ""}`;
            }}
            to={"/"}
          >
            INICIO
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? styles.isActive
                : `${styles.notActive} ${dark ? styles["notActive-dark"] : ""}`;
            }}
            to={"/category/fundas"}
          >
            FUNDAS
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? styles.isActive
                : `${styles.notActive} ${dark ? styles["notActive-dark"] : ""}`;
            }}
            to={"/category/espejos"}
          >
            ESPEJOS
          </NavLink>
        </li>
        <li>
          <Switch checked={dark} setChecked={setDark} />
        </li>
        <CartWidget />
      </ul>
    </nav>
  );
};

export default NavBar;
