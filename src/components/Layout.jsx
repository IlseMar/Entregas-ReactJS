import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/layout.module.scss";
import { useContext } from "react";
import { Theme } from "../context/ThemeProvider";
import Home from "./Home";

const Layout = ({ children }) => {
  const { dark } = useContext(Theme);

  return (
    <>
      <NavBar />
      <div className={styles[`main-container-${dark ? "dark" : "light"}`]}>
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
