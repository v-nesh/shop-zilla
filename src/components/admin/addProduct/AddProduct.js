import styles from "./AddProduct.module.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import Card from "../../card/Card";
import { storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./../../../firebase/config";
import { useNavigate } from "react-router-dom";
import Loader from "./../../loader/Loader";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronic" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    ...initialState,
  });
  const [uploadProgress, setuploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `shopZill/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image Upload Successfully");
        });
      }
    );
  };

  //
  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Uploaded Successfully");
      setuploadProgress(0);
      setProduct({ ...initialState });
      navigate("admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>Add new Product</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>
            <label>Product name:</label>
            <input
              name="name"
              type="text"
              placeholder="product name"
              value={product.name}
              required
              onChange={(e) => handleChange(e)}
            />
            <label>Product Image</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="product image"
                name="img"
                onChange={(e) => handleImgChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  required
                  name="imageURL"
                  value={product.imageURL}
                  placeholder="image Url"
                  disabled
                />
              )}
            </Card>
            <label>Product Price</label>
            <input
              name="price"
              type="number"
              placeholder="product price"
              value={product.price}
              required
              onChange={(e) => handleChange(e)}
            />
            <label>Product Category</label>
            <select
              name="category"
              value={product.category}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="" disabled>
                Choose Product Category
              </option>
              {categories.map((cate) => {
                return (
                  <option key={cate.id} value={cate.name}>
                    {cate.name}
                  </option>
                );
              })}
            </select>
            <label>Product Company</label>
            <input
              name="brand"
              type="text"
              placeholder="product company/ Brand"
              value={product.brand}
              required
              onChange={(e) => handleChange(e)}
            />
            <label>Product Description</label>
            <textarea
              name="desc"
              value={product.desc}
              onChange={(e) => handleChange(e)}
              required
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Save product
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
