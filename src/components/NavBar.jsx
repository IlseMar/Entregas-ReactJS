import { NavLink } from "react-router-dom";
import styles from "../styles/navbar.module.scss";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className={styles.elementosNav}>
      <h1 className={styles.tituloNav}>CHORMATICA</h1>
      <ul className={styles.list}>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.isActive : styles.notActive;
            }}
            to={"/"}
          >
            INICIO
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.isActive : styles.notActive;
            }}
            to={"/category/fundas"}
          >
            FUNDAS
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.isActive : styles.notActive;
            }}
            to={"/category/espejos"}
          >
            ESPEJOS
          </NavLink>
        </li>
        <CartWidget />
      </ul>
    </nav>
  );
};

export default NavBar;
