import styles from "./CheckoutSummary.module.scss";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  //

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your Cart</p>
            <button className="--btn">
              <Link to="/products">back to shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`cart items(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>SubTotal:</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} className={styles.card}>
                  <h4>Product {name}:</h4>
                  <p>Quantity : {cartQuantity}</p>
                  <p>Unit Price: {price}</p>
                  <p>Set Price: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
