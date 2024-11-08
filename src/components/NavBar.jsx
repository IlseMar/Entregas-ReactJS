import React, { useContext, useState } from "react";
import styles from "../styles/navbar.module.scss";
import { NavLink } from "react-router-dom";
import { Theme } from "../context/ThemeProvider";

const NavBar = () => {
  const { dark, setDark } = useContext(Theme);

  return (
    <nav
      className={`${styles.elementosNav} ${
        dark ? styles["elementosNav-dark"] : ""
      }`}
    >
      <NavLink className={styles.tituloLink} to={"/"}>
        <h1 className={styles.tituloNav}>CHORMATICA</h1>
      </NavLink>
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
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? styles.isActive
                : `${styles.notActive} ${dark ? styles["notActive-dark"] : ""}`;
            }}
            to={"/about"}
          >
            ACERCA DE
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
