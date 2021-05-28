import { ShoppingBasket } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Reviews.css";
import ShowRating from "./ShowRating";
export default function ReviewComponent(props) {
  return (
    <>
      <div className="reviews-members pt-4 pb-4">
        <div className="media">
          <a href="#">
            <img
              alt="Generic placeholder image"
              src="http://bootdey.com/img/Content/avatar/avatar6.png"
              className="mr-3 rounded-pill"
            />
          </a>
          <div className="media-body">
            <div className="reviews-members-header">
              <span className="star-rating float-right">
                <a href="#">
                  <i className="icofont-ui-rating active"></i>
                </a>
                <a href="#">
                  <i className="icofont-ui-rating active"></i>
                </a>
                <a href="#">
                  <i className="icofont-ui-rating active"></i>
                </a>
                <a href="#">
                  <i className="icofont-ui-rating active"></i>
                </a>
                <a href="#">
                  <i className="icofont-ui-rating"></i>
                </a>
              </span>
              <h6 className="mb-1">
                <a className="text-black" href="#">
                  {props.username}
                </a>
              </h6>
              <p className="text-gray">{props.date}</p>
            </div>
            <div className="reviews-members-body">
              <p>{props.review}</p>
            </div>
            <div className="reviews-members-footer">
              <a className="total-like" href="#">
                <i className="icofont-thumbs-up"></i> Rating
              </a>{" "}
              <a className="total-like" href="#">
                <i className="icofont-thumbs-down"></i>
                <ShowRating rating={props.rating} />
              </a>
              <span className="total-like-user-main ml-2" dir="rtl">
                <a
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  href="#"
                  data-original-title="Gurdeep Osahan"
                >
                  <img
                    alt="Generic placeholder image"
                    src="http://bootdey.com/img/Content/avatar/avatar5.png"
                    className="total-like-user rounded-pill"
                  />
                </a>
                <a
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  href="#"
                  data-original-title="Gurdeep Singh"
                >
                  <img
                    alt="Generic placeholder image"
                    src="http://bootdey.com/img/Content/avatar/avatar2.png"
                    className="total-like-user rounded-pill"
                  />
                </a>
                <a
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  href="#"
                  data-original-title="Askbootstrap"
                >
                  <img
                    alt="Generic placeholder image"
                    src="http://bootdey.com/img/Content/avatar/avatar3.png"
                    className="total-like-user rounded-pill"
                  />
                </a>
                <a
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  href="#"
                  data-original-title="Osahan"
                >
                  <img
                    alt="Generic placeholder image"
                    src="http://bootdey.com/img/Content/avatar/avatar4.png"
                    className="total-like-user rounded-pill"
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
