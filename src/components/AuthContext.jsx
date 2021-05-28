import moment from "moment";
import React, { useContext, useState, useEffect, useRef } from "react";
import fire from "../config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [id, setID] = useState("");
  const [details, setDetails] = useState(null);

  const signup = async (email, password, username) => {
    // return fire.auth().createUserWithEmailAndPassword(email, password);
    await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        return u.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    const data = {
      email: email,
      password: password,
      username: username,
      status: "",
      city: "",
      country: "",
      photourl: "",
      totalreviews: 0,
      totalphotos: 0,
      joindate: moment().format("L"),
    };
    const ref = fire.firestore().collection("User");
    await ref
      .doc(email)
      .set(data)
      .then((v) => {
        console.log("done");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  function login(email, password) {
    return fire.auth().signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return fire.auth().signOut();
  }

  function resetPassword(email) {
    return fire.auth().sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function fetchVendors() {
    const response = fire.firestore().collection("Vendor");
    return response;
  }
  function addVendor(data) {
    const response = fire.firestore().collection("Vendor");
    response
      .doc(data.id)
      .set(data)
      .then((v) => {
        console.log("done");
      });
  }
  function addNewItem(data) {
    const response1 = fire
      .firestore()
      .collection(`Vendor/${data.vendorId}/VendorItems`);
    response1
      .doc(data.id)
      .set(data)
      .then((v) => {
        console.log("done");
      });
    const response2 = fire.firestore().collection("VendorItems");
    response2
      .doc(data.id)
      .set(data)
      .then((v) => {
        console.log("done");
      });
  }
  function postReview(data) {
    const response1 = fire
      .firestore()
      .collection(`Vendor/${data.vendorId}/VendorReviews`);
    const response2 = fire.firestore().collection("VendorReviews");
    response1
      .doc(data.id)
      .set(data)
      .then((v) => {
        console.log("done");
      });
    response2
      .doc(data.id)
      .set(data)
      .then((v) => {
        console.log("done");
      });
    function userDetails(data) {
      const response1 = fire.firestore().collection("User");
      response1
        .doc(data.id)
        .set(data)
        .then((v) => {
          console.log("done");
        });
    }
  }
  const getUserGeolocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/35651dd0-7ac4-11eb-8099-0d44d45b74ca"
    )
      .then((response) => response.json())
      .then((data) => setDetails(data));
    return details;
  };
  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    fetchVendors,
    addVendor,
    addNewItem,
    postReview,
    getUserGeolocationDetails,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
