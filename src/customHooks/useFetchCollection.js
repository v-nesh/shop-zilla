import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection } from "firebase/firestore";
import { db } from "./../firebase/config";
import { query } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

const useFetchCollection = (collectionName) => {
  //
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const getCollection = () => {
  //   setIsLoading(true);

  //   try {
  //     const docRef = collection(db, collectionName);
  //     const q = query(docRef, orderBy("createdAt", "desc"));
  //     onSnapshot(q, (snapshot) => {
  //       const allData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(allData);
  //       setData(allData);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    setIsLoading(true);

    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }, [collectionName]);

  return { data, isLoading };
};

export default useFetchCollection;
