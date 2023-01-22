import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "./../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { useEffect } from "react";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data, dispatch]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};

export default Product;
