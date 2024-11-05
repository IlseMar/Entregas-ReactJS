import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/layout.module.scss";
import { useContext } from "react";
import { Theme } from "../context/ThemeProvider";
import CartWidget from "./CartWidget";
import Switch from "./Switch";

const Layout = ({ children }) => {
  const { dark, setDark } = useContext(Theme);

  return (
    <>
      <NavBar />
      <CartWidget />
      <Switch checked={dark} setChecked={setDark} />
      <div className={styles[`main-container-${dark ? "dark" : "light"}`]}>
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
