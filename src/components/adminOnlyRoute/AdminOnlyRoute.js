import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "admin@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>YOUR NOT ALLOWED TO VIEW THIS PAGE</p>
        <br />
        <Link to="/">
          <button className="--btn --btn-danger">Go back</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "admin@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
