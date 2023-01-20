import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaOpencart, FaTimes, FaUserAlt } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import styles from "./Header.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Shop<span>Zilla</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart &nbsp;
      <FaOpencart size={20} />
      <p>5</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [dipalyName, setDispalyName] = useState("");

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //monitoring signed user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setDispalyName(user.displayName);
      } else {
        setDispalyName("");
      }
    });
  }, []);

  return (
    <header>
      <div className={styles.header}>
        {/* Logo */}
        {logo}
        {/* Nav */}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]}
                 ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={14} color="#f3f3f3" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink className={activeLink} to="/login">
                Login
              </NavLink>
              <a href="#/">
                <FaUserAlt size={16} /> Hi, {dipalyName}
              </a>
              <NavLink className={activeLink} to="/register">
                Register
              </NavLink>
              <NavLink className={activeLink} to="/order-history">
                My Orders
              </NavLink>
              <NavLink to="/" onClick={logoutUser}>
                Log out
              </NavLink>
            </span>
            {/* cart */}
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}

          <HiOutlineMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
