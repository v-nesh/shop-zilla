import styles from "./Auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "./../../components/card/Card";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const navigate = useNavigate();

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for reset link..!");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset</h2>

            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset password
              </button>
              <span className={styles.links}>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </span>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
