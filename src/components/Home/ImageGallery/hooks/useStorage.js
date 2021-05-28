import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import fire from "../../../../config";
import { useAuth } from "../../../AuthContext";
import firebase from "firebase";

const useStorage = (file, name) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(`VendorImages/${name}/${file.name}`);
    const collectionRef = projectFirestore.collection(
      `/VendorImages/${name}/images`
    );

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        // const createdAt = firestore.FieldValue.serverTimestamp();
        const data = {
          url: url,
          useremail: currentUser.email,
        };
        await collectionRef.doc().set(data);
        await fire
          .firestore()
          .collection("User")
          .doc(currentUser.email)
          .update({
            totalphotos: firebase.firestore.FieldValue.increment(1),
          });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
