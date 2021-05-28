import "./RecentReviews.css";
import React, { useState, useEffect } from "react";
import fire from "../../../config";
import RecentReviewComponent from "./RecentReviewComponent";
import { Typography } from "@material-ui/core";
import ShowRating from "./ShowRating";
import { useAuth } from "../.././AuthContext";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import img1 from "../../../img/reco.png";
import img2 from "../../../img/writing.png";
import img3 from "../../../img/locationmarker.png";
import img4 from "../../../img/profile.png";
// import "bootstrap/dist/css/bootstrap.min.css";
export default function RecentReviews() {
  const [items, setItems] = useState([]);
  const { currentUser, userDetails } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setid] = useState("");
  const [state, setstate] = useState("");
  const [firstReview, setFirstReview] = useState();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [lastReview, setLasttReview] = useState();

  const refReviews = fire
    .firestore()
    .collection("VendorReviews")
    .orderBy("date", "desc")
    .limit(3);
  const fetchReviews = () => {
    setLoading(true);
    refReviews.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setReviews(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <>
      <main>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          Recent Reivews
        </h2>
        <div
          className="card-group"
          style={{
            maxWidth: "1361px",
            margin: "2rem auto",
          }}
        >
          {reviews.map((v) => {
            return (
              <RecentReviewComponent
                vendorid={v.vendorId}
                rating={v.rating}
                vendorname={v.vendorname}
                review={v.review}
                useremail={v.useremail}
                username={v.username}
                userid={v.userid}
                date={v.date}
                id={v.id}
              />
            );
          })}
        </div>
        <div class="awards-container">
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            User Point
          </h2>
          <div class="card-deck">
            <div class="card card-awards text-center">
              <div class="card-img-top">
                <img
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "auto",
                  }}
                  src={img1}
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <div class="card-title">User Satifaction</div>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-sm btn-link-light btn-icon-right">
                  <span>
                    LEARN MORE
                    <img
                      src="https://static3.avast.com/10001215/web/i/awards-v12/logo-pcmag-2.png"
                      height="16"
                    />
                  </span>
                </a>
              </div>
            </div>
            <div class="card card-awards text-center">
              <div class="card-img-top">
                <img
                  src={img2}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "auto",
                  }}
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <div class="card-title">Review your Favorite Vendors</div>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-sm btn-link-light btn-icon-right">
                  <span>
                    LEARN MORE
                    <img
                      src="https://web-static.ff.int.avast.com/static3.avast.com/1/web/i/v2/components/arrow-s-right-orange.png"
                      height="16"
                    />
                  </span>
                </a>
              </div>
            </div>
            <div class="card card-awards text-center">
              <div class="card-img-top">
                <img
                  src={img3}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "auto",
                  }}
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <div class="card-title">Add New Places</div>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-sm btn-link-light btn-icon-right">
                  <span>
                    LEARN MORE
                    <img
                      src="https://web-static.ff.int.avast.com/static3.avast.com/1/web/i/v2/components/arrow-s-right-orange.png"
                      height="16"
                    />
                  </span>
                </a>
              </div>
            </div>
            <div class="card card-awards text-center">
              <div class="card-img-top">
                <img
                  src={img4}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "auto",
                  }}
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <div class="card-title">Maintain your Profile</div>
              </div>
              <div class="card-footer">
                <a href="#" class="btn btn-sm btn-link-light btn-icon-right">
                  <span>
                    LEARN MORE
                    <img
                      src="https://web-static.ff.int.avast.com/static3.avast.com/1/web/i/v2/components/arrow-s-right-orange.png"
                      height="16"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
// import React from "react";
// import { CardSlideItem, CardSlide } from "react-card-slide/dist";
// import pic from "../../../img/sample.jpg";

// export default function RecentReviews() {
//   return (
//     <>
//       <CardSlide
//         items={[
//           {
//             cardName: "Card Name",
//             cardDescription: "Description",
//             cardTotal: 0,
//             showBodyImage: false,
//             bodyImage:
//               "https://c8.alamy.com/comp/M9DNR6/open-air-artisan-market-vendor-stalls-in-a-handicraft-fair-with-soapstone-handicraft-articles-for-sale-ouro-preto-minas-gerais-brazil-M9DNR6.jpg",
//           },
//           {
//             cardName: "Card Name 2",
//             cardDescription: "Description 2",
//             cardTotal: 1,
//           },
//           {
//             cardName: "Carde Name 3",
//             cardDescription: "Description 3",
//             cardTotal: 2,
//           },
//         ]}
//       />
//     </>
//   );
// }
