import React from "react";
import { Navbar } from "./Navbar/Navbar";
import { Landing } from "./Landing/Landing";
import { useAuth } from "./AuthContext";
// import RestaurantLandingPage from "./Treact/LandingPage";
export const LandingPage = () => {
  // const { currentUser } = useAuth();
  // console.log(currentUser.email);
  return (
    <React.Fragment>
      <Navbar />
      <Landing />
    </React.Fragment>
  );
};
