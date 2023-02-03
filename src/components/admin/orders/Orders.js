import React, { useEffect } from "react";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import styles from "./Orders.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";

import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");

  const orders = useSelector(selectOrderHistory);
  // const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  // const orderHistory = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [data, dispatch]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={`${styles.order}`}>
        <h2>Order history</h2>
        <p>open on order to change order status</p>
        <>{isLoading && <Loader />}</>
        <div className={styles.table}>
          {orders.length === 0 ? (
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
                {orders.map((order, index) => {
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
    </>
  );
};

export default Orders;
