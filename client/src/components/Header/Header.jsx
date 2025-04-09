import mainLogo from "../../assets/icons/mainLogo.svg";
import basket from "../../assets/icons/basket.svg";
import Nav from "../elements/nav/index.jsx";

import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
function Header() {
  const { totalQuantity } = useSelector((state) => state.basket);
  return (
    <header className={styles.Header}>
      <NavLink className={styles.mainLogo} to="/">
        <img src={mainLogo} alt="logo" />
      </NavLink>

      <Nav />
      <NavLink className={styles.basketIco} to="/basket">
        <img src={basket} alt="basket" />
        <svg
          className="count"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            top: "-4px",
            right: "24px",
          }}
        >
          <g clipPath="url(#clip0_8015_548)">
            <circle cx="13" cy="13" r="13" fill="#0D50FF" />
            <text
              x="13"
              y="13"
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="16"
              fontFamily="Arial"
              fontWeight="bold"
            >
              {totalQuantity}
            </text>
          </g>
          <defs>
            <clipPath id="clip0_8015_548">
              <rect width="26" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </NavLink>
    </header>
  );
}
export default Header;
