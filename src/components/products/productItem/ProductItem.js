import styles from "./ProductItem.module.scss";
import Card from "./../../card/Card";
import { Link } from "react-router-dom";

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortEndText = text.substring(0, n).concat("...");
      return shortEndText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
