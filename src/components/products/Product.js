import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "./../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
  GET_PRICE_RANGE,
} from "../../redux/slice/productSlice";

import { useEffect, useState } from "react";
import SpiningImage from "../../assets/loading-circle.gif";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [data, dispatch]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={SpiningImage}
              alt="loading"
              style={{ width: "30px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="red" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
