import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const turnOfMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function closeMenu() {
    setIsMenuOpen(false);
  }
  return (
    <nav className={styles.navContainer}>
      <div className={styles.hamburger} onMouseEnter={turnOfMenu}>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </div>

      <div
        className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}
        onMouseLeave={closeMenu}
      >
        <NavLink className={styles.link} to="/" onClick={turnOfMenu}>
          Main Page
        </NavLink>
        <NavLink className={styles.link} to="/categories" onClick={turnOfMenu}>
          Categories
        </NavLink>
        <NavLink
          className={styles.link}
          to="/all_products"
          onClick={turnOfMenu}
        >
          All products
        </NavLink>
        <NavLink className={styles.link} to="/discounts" onClick={turnOfMenu}>
          All sales
        </NavLink>
      </div>
    </nav>
  );
}
