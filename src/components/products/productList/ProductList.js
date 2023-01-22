import styles from "./ProductList.module.scss";
import { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "./../../search/Search";
import ProductItem from "./../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
  SORT_PRODUCT,
} from "../../../redux/slice/filterSlice";

///
///
const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filterdProduct = useSelector(selectFilterProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCT({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="red" onClick={() => setGrid(true)} />
          <FaListAlt size={22} color="blue" onClick={() => setGrid(false)} />
          <p>
            <b>{filterdProduct.length} Products Found</b>
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.sort}>
          <label>Sort by</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid} ` : `${styles.list}`}>
        {filterdProduct.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {filterdProduct.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} products={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
