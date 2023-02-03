import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
// import { useState } from "react";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "./../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "./../../../customHooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const products = useSelector(selectProducts);
  const filterdProducts = useSelector(selectFilterProducts);
  //get Current Product Page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterdProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Do you want delet this product",
      "Delete",
      "Cancel",
      function okCb() {
        //
        deleteProduct(id, imageURL);
      },
      function cancerCb() {
        //
        console.log("cancel");
      },
      {
        width: "400px",
        borderRadius: "15px",
        titleColor: "red",
        okButtonBackground: "black ",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("products deleted successfully ");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Product</h2>
        <div className={styles.search}>
          <p>
            <b>{currentProducts.length}</b> Products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {currentProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, category, imageURL } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                        &nbsp;
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => confirmDelete(id, imageURL)}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filterdProducts.length}
        />
      </div>
    </>
  );
};

export default ViewProducts;
