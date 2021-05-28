// import * as firebase from "firebase/app";
// import firebase from "firebase/app";
import fire from "../../../../config";
import firebase from "firebase";

import "firebase/storage";
import "firebase/firestore";
// var firebaseConfig = {
//   apiKey: "AIzaSyBb0d-aOMx5qPInRkJtXi-8lNM-ZDf31zE",
//   authDomain: "city-spot-1caff.firebaseapp.com",
//   projectId: "city-spot-1caff",
//   storageBucket: "city-spot-1caff.appspot.com",
//   messagingSenderId: "1073439778234",
//   appId: "1:1073439778234:web:c25afbaa9ad5b89c80a983",
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const projectStorage = fire.storage();
const projectFirestore = fire.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
