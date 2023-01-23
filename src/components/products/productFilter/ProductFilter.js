import styles from "./productFilter.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import { useEffect, useState } from "react";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMinPrice,
  selectMaxPrice,
} from "./../../../redux/slice/productSlice";

//
//
const ProductFilter = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const [price, setPrice] = useState(3000);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

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

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const clearFilters = () => {
    setCategory("ALL");
    setBrand("ALL");
    setPrice(maxPrice);
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
        <p>{`${price}`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilters}>
          Clear filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
