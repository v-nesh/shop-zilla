import React, { useEffect, useState } from "react";
import styles from "./OrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "./../../../customHooks/useFetchDocument";
import spinnerImg from "../../../assets/loading-circle.gif";
import ChangeOrderStatus from "./../changeOrderStatus/ChangeOrderStatus";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={`${styles.table}`}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">Go back to order</Link>
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
            <p>
              <b>Shipping address: </b>
              {order.shippingAddress.line1},{order.shippingAddress.city},
              {order.shippingAddress.state},
              <br />
              {order.shippingAddress.country}.
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
