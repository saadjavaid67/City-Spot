// import React, { useState, useEffect } from "react";
// import "./ImageGallery.scss";
// import fire from "../../../config";
// import ImageGalleryComponent from "./ImageGalleryComponent";
// import { Button, Modal, Image } from "react-bootstrap";

// const ImageGallery = (props) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // useEffect(() => {
//   //   getAllImages();
//   // }, []);
//   // const getAllImages = async () => {
//   //   const refReviews = fire
//   //     .firestore()
//   //     .collection(`/Vendor/${props.location.state.vendor}/VendorImages`);
//   //   setLoading(true);
//   //   refReviews.onSnapshot((querySnapshot) => {
//   //     const items = [];
//   //     querySnapshot.forEach((doc) => {
//   //       items.push(doc.data());
//   //     });
//   //     setImages(items);
//   //     setLoading(false);
//   //   });
//   // };
//   useEffect(() => {
//     const fetchImages = async () => {
//       let result = await fire
//         .storage()
//         .ref("VendorImages")
//         .child(`${props.location.state.vendor}/`)
//         .listAll();
//       let urlPromises = result.items.map((imageRef) =>
//         imageRef.getDownloadURL()
//       );

//       return Promise.all(urlPromises);
//     };

//     const loadImages = async () => {
//       const urls = await fetchImages();
//       setImages(urls);
//       setLoading(false);
//     };
//     loadImages();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <>
//       <ul class="grid">
//         {" "}
//         {images.map((v) => {
//           return <ImageGalleryComponent url={v} />;
//         })}
//       </ul>
//       {/* <div className="gallery">
//         <div className="gallery__column">
//           {images.map((v) => {
//             return <ImageGalleryComponent url={v} />;
//           })}
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default ImageGallery;
import React from "react";
import "./index.css";
import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const ImageGallery = (props) => {
  return (
    <>
      <App vendorname={props.location.state.vendor} />
    </>
  );
};

export default ImageGallery;
