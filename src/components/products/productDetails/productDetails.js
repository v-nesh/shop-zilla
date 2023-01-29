import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinImg from "../../../assets/loading-circle.gif";
import styles from "./ProductDetails.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALACULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "./../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "./../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItems);

  const cart = cartItem.find((cart) => cart.id === id);
  const isCartAdded = cartItem.findIndex((cart) => {
    return cart.id === id;
  });
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews", id);
  const filteredReviews = data.filter((item) => item.productID === id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALACULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALACULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product detils</h2>
        <div>
          <Link to="/#products">Back to Products</Link>
        </div>
        {product === null ? (
          <img src={spinImg} alt="loading" />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn "
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>{cart.cartQuantity}</p>
                      <button
                        className="--btn "
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Review</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>No review for this product yet</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div className={styles.review} key={index}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
