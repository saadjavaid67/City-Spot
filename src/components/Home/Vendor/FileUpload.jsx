// import React, { useState, useRef, useEffect } from "react";
// import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import {
//   Form,
//   Col,
//   InputGroup,
//   Row,
//   Button,
//   Jumbotron,
//   Alert,
//   Badge,
// } from "react-bootstrap";
// const FileUpload = () => {
//   const [image, setImage] = useState(null);
//   const [value, setValue] = useState();

//   const nameRef = useRef();
//   const numRef = useRef();
//   const cityRef = useRef();
//   const latRef = useRef();
//   const lngRef = useRef();
//   const imgRef = useRef();
//   const catRef = useRef();

//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");
//   const [vDetails, setVDetails] = useState([]);
//   const [lat, setLat] = useState("");
//   const [vendors, setVendors] = useState([]);

//   const [lng, setLng] = useState("");
//   const [progress, setProgress] = useState(0);

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//       console.log(image);
//     }
//   };

//   return (
//     <>
//       <Form.File
//         id="custom-file"
//         name="image"
//         label="Vendor Images"
//         onChange={(e) => handleImageChange(e)}
//         custom
//       />
//       <LinearProgress
//         variant="buffer"
//         value={progress}
//         color="secondary"
//         valueBuffer={progress}
//       />
//     </>
//   );
// };

// export default FileUpload;
import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useAuth } from "../.././AuthContext";

import Dropzone from "react-dropzone-uploader";
import fire from "../../../config";
import { Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinearProgress } from "@material-ui/core";
import firebase from "firebase";

const FileUpload = (props) => {
  const [image, setImage] = useState([]);
  const { currentUser } = useAuth();
  const [url, setUrl] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const createNotification = () => {
    console.log("working");
  };

  const handleChangeStatus = ({ meta }, status) => {
    setImage(meta);
  };
  const handleUpload = () => {
    const uploadTask = fire
      .storage()
      .ref(`VendorImages/${props.vendorData}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentUploaded = Math.round(
          (snapshot.bytesTransferred / image.size) * 100
        );
        setProgress(percentUploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        fire
          .storage()
          .ref(`VendorImages/${props.vendorData}/${image.name}`)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url);
            const data = {
              url: url,
              useremail: currentUser.email,
            };
            addImageUrlToDB(data);
            toast.success("Image Uploaded!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          });
      }
    );
  };
  const addImageUrlToDB = async (data) => {
    await fire
      .firestore()
      .collection(`/VendorImages/${props.vendorData}/images`)
      .doc()
      .set(data)
      .then((v) => {});
    await fire
      .firestore()
      .collection("User")
      .doc(currentUser.email)
      .update({
        totalphotos: firebase.firestore.FieldValue.increment(1),
      });
  };
  const handleSubmit = async (files, allFiles) => {
    if (!props.vendorData) {
      setError("First Set a Vendorname");
    } else {
      handleUpload();
      setError("");
    }
  };

  return (
    <>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        autoUpload={false}
        accept="image/*"
        styles={{
          dropzone: { maxwidth: 400, height: 200 },
          dropzoneActive: { borderColor: "green" },
        }}
        inputContent="Upload Vendor Images"
        inputWithFilesContent={(files) => `${3 - files.length} more`}
      />
      <LinearProgress
        variant="buffer"
        value={progress}
        color="secondary"
        valueBuffer={progress}
      />
      {error && <Alert variant="danger">{error}</Alert>}
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        Upload Photo
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={4922}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default FileUpload;
