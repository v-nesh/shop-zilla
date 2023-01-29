import styles from "./OrderDetail.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "./../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/loading-circle.gif";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order details</h2>
        <div>
          <Link to="/order-history">Go back to order</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="loading.." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID: </b>
              {order.id}
            </p>
            <p>
              <b>Order Amount: </b> {order.orderAmount}
            </p>
            <p>
              <b>Order Status: </b>
              {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>product</th>
                  <th>price</th>
                  <th>Quanitiy</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>{name}</p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "150px" }}
                        />
                      </td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icon}>
                        <Link to={`/review-products/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Products
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetail;
