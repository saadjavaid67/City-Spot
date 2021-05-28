import React, { useState, useEffect, useRef } from "react";
import "./user.css";
import { useAuth } from "../.././AuthContext";
import fire from "../../../config";
import { Button, Modal, Image } from "react-bootstrap";
import AvatarEditor, { editor } from "react-avatar-editor";
import img from "../../../img/photo-bg.jpg";
import Spinner from "../Spinner/Spinner";
import { useStateWithCallbackLazy } from "use-state-with-callback";

export default function UserProfile() {
  const { currentUser, userDetails } = useAuth();
  const userNameRef = useRef();
  const [reviews, setReviews] = useState([]);

  const countryRef = useRef();
  const imgRef = useRef();
  const [image, setImage] = useState();
  const [photos, setUserPhotos] = useState();

  const cityRef = useRef();
  const [details, setDetails] = useState([]);
  const statusRef = useRef();
  const refItem = fire.firestore().collection("User");

  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [status, setstatus] = useState();
  const [url, setUrl] = useState("");
  const firstTimeRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    fetchUserDetails();
    fetchUserReviews();
  }, []);
  useEffect(() => {
    if (url) {
      uploadPhoto();
    }
  }, [url]);
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
      console.log("img set");
    }
  };
  const handleUpload = async () => {
    const uploadTask = fire
      .storage()
      .ref(`UserProfileImages/${currentUser.email}/${image.name}`)
      .put(image);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        fire
          .storage()
          .ref(`UserProfileImages/${currentUser.email}`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
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
      });
  };

  const fetchUserDetails = () => {
    refItem.doc(currentUser.email).onSnapshot((doc) => {
      if (doc.exists) {
        setDetails(doc.data());
        setcity(doc.data().city);
        setcountry(doc.data().country);
        setstatus(doc.data().status);
      } else {
        console.log("No such document!");
      }
    });
  };

  const updateDetails = () => {
    const data = {
      status: statusRef.current.value,
      city: cityRef.current.value,
      country: countryRef.current.value,
    };
    refItem
      .doc(currentUser.email)
      .update(data)
      .then((v) => {
        console.log("data updated");
      })
      .catch((v) => {
        console.log(v);
      });
  };
  const uploadPhoto = async () => {
    const data = {
      photourl: url,
    };
    setLoading(true);

    await refItem
      .doc(currentUser.email)
      .update(data)
      .then((v) => {
        console.log("photo uploaded on firebase");
      })
      .catch((v) => {
        console.log(v);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="main-content">
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundSize: "cover",
            backgroundImage:
              "url(https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/profile-cover.jpg)",
            backgroundPosition: "center top",
          }}
        >
          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">
                  Hello {currentUser.displayName}
                </h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the profile and also
                  make changes to it.
                </p>
                <button
                  onClick={() => {
                    updateDetails();
                  }}
                  className="btn btn-info"
                >
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <img src={img} alt="Image placeholder" class="card-img-top" />

                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href="#">
                        <Image
                          alt="Image placeholder"
                          src={details.photourl}
                          class="avatar rounded-circle"
                          roundedCircle
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{reviews.length}</span>
                          <span className="description">Reviews</span>
                        </div>
                        <div>
                          <span className="heading">{details.totalphotos}</span>
                          <span className="description">Photos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {currentUser.displayName}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2">Points:</i>
                      {details.totalphotos * 2 + reviews.length * 5}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2">
                        Member Since:
                      </i>
                      {details.joindate}
                    </div>
                    {/* <div>
                      <i className="ni education_hat mr-2"></i>University of
                      Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <p>{status}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card bg1-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">My account</h3>
                    </div>
                    <div className="col-4 text-right">
                      <a href="#!" className="btn btn-sm btn-primary">
                        Settings
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="form-group focused">
                            <Button variant="danger" onClick={handleShow}>
                              Select Profile Picture
                            </Button>

                            <Modal
                              show={show}
                              onHide={handleClose}
                              backdrop="static"
                              keyboard={false}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Upload Picture</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <input
                                  id="file"
                                  name="image"
                                  type="file"
                                  ref={imgRef}
                                  onChange={(e) => handleImageChange(e)}
                                  label="Custom file input"
                                  custom
                                />
                                <AvatarEditor
                                  ref={imgRef}
                                  image={image}
                                  width={250}
                                  height={250}
                                  border={50}
                                  color={[255, 255, 255, 0.6]} // RGBA
                                  scale={1.2}
                                />
                                <Button
                                  variant="secondary"
                                  onClick={handleUpload}
                                >
                                  Upload Photo
                                </Button>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                          {/* <div className="col-lg-9">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              for="input-username"
                            >
                              Profile Picture
                            </label>
                            <input
                              ref={imgRef}
                              type="file"
                              readOnly
                              id="input-username"
                              className="form-control form-control-alternative"
                              placeholder="Username"
                            />
                          </div> */}
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              for="input-username"
                            >
                              Username
                            </label>
                            <input
                              ref={userNameRef}
                              type="text"
                              readOnly
                              id="input-username"
                              className="form-control form-control-alternative"
                              placeholder="Username"
                              value={currentUser.displayName}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              for="input-email"
                            >
                              Email address
                            </label>
                            <input
                              readOnly
                              type="email"
                              id="input-email"
                              className="form-control form-control-alternative"
                              placeholder={currentUser.email}
                              value={currentUser.email}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row"></div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              for="input-city"
                            >
                              City
                            </label>
                            <input
                              ref={cityRef}
                              type="text"
                              id="input-city"
                              value={city}
                              onChange={(e) => {
                                setcity(e.target.value);
                              }}
                              className="form-control form-control-alternative"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              for="input-country"
                            >
                              Country
                            </label>
                            <input
                              value={country}
                              ref={countryRef}
                              type="text"
                              onChange={(e) => {
                                setcountry(e.target.value);
                              }}
                              id="input-country"
                              className="form-control form-control-alternative"
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <div className="form-group focused">
                        <label>About Me</label>
                        <textarea
                          rows="4"
                          value={status}
                          onChange={(e) => {
                            setstatus(e.target.value);
                          }}
                          ref={statusRef}
                          className="form-control form-control-alternative"
                          placeholder="A few words about you ..."
                        >
                          {details.status}
                        </textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
