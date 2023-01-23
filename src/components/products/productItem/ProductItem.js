import styles from "./ProductItem.module.scss";
import Card from "./../../card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  CALACULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  //
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortEndText = text.substring(0, n).concat("...");
      return shortEndText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALACULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 100)}</p>}

        <button
          className="--btn --btn-primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
