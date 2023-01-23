import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartTotalAmount,
  selectCartItems,
  selectCartTotalQuantity,
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALACULATE_SUBTOTAL,
  CALACULATE_TOTAL_QUANTITY,
  SAVE_URL,
} from "./../../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "./../../components/card/Card";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

//
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //incease Cart
  const increaseCart = (cart) => {
    //
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };
  const url = window.location.href;

  useEffect(() => {
    dispatch(CALACULATE_SUBTOTAL());
    dispatch(CALACULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  const checkOut = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>your cart is Empty</p> <br />
            <div>
              <Link to="/#products">Countine Shoping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">Countinue Shopping</Link>
                </div>
                <br />
                <Card className={styles.card}>
                  <p>
                    <b>{`cart Items(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Sub Total:</h4>
                    <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax and shipping calculated at</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={checkOut}
                  >
                    Check out
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
