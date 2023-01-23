import { useState } from "react";
import styles from "./Auth.module.scss";
import Loginimg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { auth } from "../../firebase/config";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectpreviousURL } from "./../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const navigate = useNavigate();
  const previousURL = useSelector(selectpreviousURL);
  //
  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        setIsLoading(false);
        toast.success("Login Successfully");
        redirectUser();
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  //google Login
  const provider = new GoogleAuthProvider();
  const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={Loginimg} alt="login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Log In</h2>

            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Log in
              </button>
              <div className={styles.link}>
                <Link to="/reset">Reset password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signinWithGoogle}
            >
              <FaGoogle color="#fff" /> Log in with Google
            </button>
            <span className={styles.register}>
              <p>Dont have an account?</p> &nbsp;
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
