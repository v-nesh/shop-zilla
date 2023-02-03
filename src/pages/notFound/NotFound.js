import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404 Not Found</h2>
        <p>OOPS Page Not Found</p>
        <button className="--btn --btn-primary">
          <Link to="/">Back To Home Page</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
