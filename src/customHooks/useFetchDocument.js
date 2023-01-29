import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc } from "firebase/firestore";
import { db } from "./../firebase/config";
import { getDoc } from "firebase/firestore";

const useFetchDocument = (collectionName, documentID) => {
  const [document, setDocument] = useState(null);

  const getDocument = async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);
    //
    if (docSnap.exists()) {
      // console.log("Document Dat:", docSnap.data());
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };
      setDocument(obj);
    } else {
      toast.error("Document not found");
    }
  };
  useEffect(() => {
    getDocument();
  }, []);

  return { document };
};

export default useFetchDocument;
