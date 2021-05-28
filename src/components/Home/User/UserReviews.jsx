import React, { useState, useRef, useEffect } from "react";
import fire from "../../../config";
import { useAuth } from "../../AuthContext";
import { Grid, Paper, Typography } from "@material-ui/core";
import "./style.css";
import { Link } from "react-router-dom";
import UserReviewComponent from "./UserReviewComponent";
import ReviewComponent from "../Reviews/ReviewComponent";
import ReactPaginate from "react-paginate";
import Spinner from "../Spinner/Spinner";

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [photo, setPhoto] = useState();
  const [state, setstate] = useState();
  const { currentUser } = useAuth();
  const refItem = fire.firestore().collection("User");
  const [loading, setLoading] = useState([true]);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [error, setError] = useState(0);
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    fetchUserDetails();
    fetchUserReviews();
  }, [reviews, state, photo, users]);

  const usersPerPage = 1;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchUserReviews = () => {
    fire
      .firestore()
      .collection("VendorReviews")
      .where("useremail", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        const item = [];
        querySnapshot.forEach((doc) => {
          item.push(doc.data());
        });
        setReviews(item);
        setUsers(reviews.slice(0, 50));
        setLoading(false);
      });
  };
  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((v) => {
      return (
        <ReviewComponent
          vendorid={v.vendorId}
          rating={v.rating}
          review={v.review}
          useremail={v.useremail}
          username={v.username}
          userid={v.userid}
          date={v.date}
          vendorname={v.vendorname}
          id={v.id}
        />
      );
    });

  const fetchUserDetails = () => {
    refItem.doc(currentUser.email).onSnapshot((doc) => {
      if (doc.exists) {
        setstate(doc.data().status);
        setPhoto(doc.data().photourl);
      } else {
        console.log("No such document!");
      }
    });
  };
  // const getTotalUserRating = () => {
  //   let totalRating = 0;
  //   reviews.map((v) => {
  //     totalRating += v.rating;
  //   });
  //   setRating(totalRating);
  //   setLoading(false);
  // };
  if (loading) {
    return (
      <div className="App">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="container-1">
        <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
              <div className="profile-1">
                <div className="profile-header-1">
                  <div className="profile-header-cover-1"></div>

                  <div className="profile-header-content-1">
                    <div className="profile-header-img-1">
                      <img src={photo} alt="" />
                    </div>

                    <div className="profile-header-info-1">
                      <h4 className="m-t-10 m-b-5">
                        {currentUser.displayName}
                      </h4>
                      <p className="m-b-10">{state}</p>
                      <Link
                        to={`/user/${currentUser.uid}`}
                        className="btn btn-sm btn-info mb-2"
                      >
                        Edit Profile
                      </Link>
                    </div>
                  </div>

                  <ul className="profile-header-tab-1 nav-1 nav-tabs-1">
                    <li className="nav-item-1">
                      <a
                        href="#profile-post"
                        className="nav-link-1 active show"
                        data-toggle="tab"
                      >
                        My Reviews
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="container">
                <div className="col-md-12">
                  <div className="offer-dedicated-body-left">
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade active show"
                        id="pills-reviews"
                        role="tabpanel"
                        aria-labelledby="pills-reviews-tab"
                      >
                        <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                          <h5 className="mb-1">All Ratings and Reviews</h5>
                          {displayUsers}

                          <hr />
                          <hr />
                          <a
                            className="text-center w-100 d-block mt-4 font-weight-bold"
                            href="#"
                          >
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount}
                              onPageChange={changePage}
                              containerClassName={"paginationBttns"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"paginationDisabled"}
                              activeClassName={"paginationActive"}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
