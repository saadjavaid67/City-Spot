import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { NavbarExport } from "./Navbar/Navbar";
import { Row, Col, Container, Button } from "react-bootstrap";
import { SearchBar } from "./SearchBar/SearchBar";
// import { Maps } from "../Home/Maps/Maps";
import { Maps } from "./Maps/Maps";
import TestMaps from "./Maps/TestMaps";
import { CarouselWrapper } from "./Carousel/Carousel";
import reco from "../../img/reco.png";
import Cards from "./Cards/Cards";
import MapCard from "./Cards/Card/MapCard";
import RecentReviews from "./Reviews/RecentReviews";
import ResultCard from "./Cards/Card/ResultCard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import pic1 from "../../img/location_undraw.svg";
import pic2 from "../../img/recentreviews.svg";
import {
  MorphIcon,
  CloseButton,
  NavButton,
  PlusButton,
} from "react-svg-buttons";
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

export const HomePage = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const classes = useStyles();

  const sendDataToParent1 = (lat) => {
    // the callback. Use a better name
    //   console.log(lat);
    setLat(lat);
  };
  const sendDataToParent2 = (lng) => {
    // the callback. Use a better name
    //   console.log(lng);
    setLng(lng);
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="col-border">
          <div>
            <Typography variant="h1" component="h2" gutterBottom>
              City Spot
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              Search Vendors Near You
            </Typography>
            <div className="svg-container">
              <MorphIcon
                className="svg-1"
                color="#17a2b8"
                type="arrowDown"
                size={120}
                thickness={3}
              />
            </div>
          </div>
          {/* <SearchBar /> */}
          {/* <Maps
              sendDataToParent1={sendDataToParent1}
              sendDataToParent2={sendDataToParent2}
            /> */}
          {/* <TestMaps /> */}
          {/* <Maps
            sendDataToParent1={sendDataToParent1}
            sendDataToParent2={sendDataToParent2}
          /> */}
        </Row>
        {/* <h1 className="align quote">Recommended Products </h1>
        <Row>
          <Col className="extend">
            <div className="container-product">
              <CarouselWrapper></CarouselWrapper>
            </div>
          </Col>
        </Row> */}
        <Row className="width-set">
          <Col sm={3} className="col-border-new">
            <div>
              <Typography variant="h1" component="h2" gutterBottom>
                Near You
              </Typography>
              <img src={pic1} className="img-fix" alt="" />
            </div>
          </Col>
          <Col sm={8}>
            {" "}
            <Maps
              sendDataToParent1={sendDataToParent1}
              sendDataToParent2={sendDataToParent2}
            />
          </Col>
        </Row>

        <RecentReviews />
        {/* <Row className="width-set-new">
          <Col sm={3} className="col-border-new">
            <div>
              <Typography variant="h2" component="h3" gutterBottom>
                Recent Activity
              </Typography>
              <img src={pic2} className="img-fix" alt="" />
            </div>
          </Col>
          <Col sm={8} className="m-4">
            <RecentReviews />
          </Col>
        </Row> */}

        {/* <Row>
          <Col className="col-border-new">
            <div>
              <Typography variant="h1" component="h2" gutterBottom>
                Recent Reviews
              </Typography>
              <img src={pic2} className="img-fix" alt="" />
            </div>
            <RecentReviews />
          </Col>
        </Row> */}
      </Container>
    </React.Fragment>
  );
};
