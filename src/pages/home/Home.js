import React, { useEffect } from "react";
// import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import Product from "../../components/products/Product";
import Slider from "../../components/slider/Slider";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  }, [url]);

  return (
    <div>
      {/* <Slider /> */}
      <Product />
      {/* <AdminOnlyRoute /> */}
    </div>
  );
};

export default Home;
