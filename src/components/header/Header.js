import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaOpencart, FaTimes, FaUserAlt } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import styles from "./Header.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import ShowOnLogIn, { ShowOnLogOut } from "../hiddenLink/hiddenLink";
import AdminOnlyRoute from "../adminOnlyRoute/AdminOnlyRoute";
import { AdminOnlyLink } from "./../adminOnlyRoute/AdminOnlyRoute";
import { CALACULATE_TOTAL_QUANTITY } from "../../redux/slice/cartSlice";
import { selectCartTotalQuantity } from "./../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Shop<span>Zilla</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  //

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  //
  useEffect(() => {
    dispatch(CALACULATE_TOTAL_QUANTITY);
  }, []);

  const navigate = useNavigate();

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixNavbar);

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
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart &nbsp;
        <FaOpencart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
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
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
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
              <ShowOnLogOut>
                <NavLink className={activeLink} to="/login">
                  Login
                </NavLink>
              </ShowOnLogOut>
              <ShowOnLogIn>
                <a href="#/" style={{ color: "#ff7722" }}>
                  <FaUserAlt size={16} /> Hi, {displayName}
                </a>
              </ShowOnLogIn>
              <ShowOnLogIn>
                <NavLink className={activeLink} to="/order-history">
                  My Orders
                </NavLink>
              </ShowOnLogIn>
              <ShowOnLogIn>
                <NavLink to="/" onClick={logoutUser}>
                  Log out
                </NavLink>
              </ShowOnLogIn>
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
