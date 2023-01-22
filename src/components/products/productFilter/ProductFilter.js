import styles from "./productFilter.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import { useEffect, useState } from "react";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
} from "../../../redux/slice/filterSlice";

//
//
const ProductFilter = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");

  const products = useSelector(selectProducts);
  const allCategories = [
    "ALL",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "ALL",
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  const filteredProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filteredProducts(cat)}
            >
              &#8250;{cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>1500</p>
        <div className={styles.price}>
          <input type="range" name="price" min="100" max="1000" />
        </div>
        <br />
        <button className="--btn --btn-danger">clear filter</button>
      </div>
    </div>
  );
};

export default ProductFilter;
