import React from "react";
import { FaMoon, FaStar } from "react-icons/fa";
import styles from "../styles/switch.module.scss";

const Switch = ({ checked, setChecked }) => {
  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <span className={styles.slider}>
          {checked ? (
            <FaStar className={styles.icon} />
          ) : (
            <FaMoon className={styles.icon} />
          )}
        </span>
      </label>
    </div>
  );
};

export default Switch;
