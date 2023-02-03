import React, { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import styles from "./OrderHistory.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import { selectUserID } from "./../../redux/slice/authSlice";
import Loader from "./../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  // const orderHistory = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>your order history</h2>
        <p>open on order to leave a Product Review</p>
        <>{isLoading && <Loader />}</>
        <div className={styles.table}>
          {filteredOrders.length === 0 ? (
            <p>no order Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/n</th>
                  <th>Date</th>
                  <th>Order Id</th>
                  <th>Order Amount</th>
                  <th>Order status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>
                        {"$"}
                        {orderAmount}
                      </td>
                      <td>
                        <p
                          className={
                            orderStatus !== "Deliverd"
                              ? `${styles.pending}`
                              : `${styles.deliverd}`
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
