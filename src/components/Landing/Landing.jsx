import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "./Landing.css";
import { render } from "react-dom";
import {
  MorphIcon,
  CloseButton,
  NavButton,
  PlusButton,
} from "react-svg-buttons";
export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          {/* <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p> */}
          <div className="buttons logo">
            <a href="/">
              <img className="logo-bg" src={logo} alt="img" />
            </a>
          </div>
          <div className="next-btn-div">
            <Link to="/home">
              <MorphIcon type="arrowRight" size={120} thickness={3} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
