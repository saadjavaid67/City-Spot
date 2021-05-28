import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import ShowRating from "../../Reviews/ShowRating";
import img from "../../../../img/vendor.svg";

export default function ResultCard(props) {
  return (
    <div>
      <tr>
        <td>
          <div className="widget-26-job-emp-img">
            <img src={img} alt="Company" />
          </div>
        </td>
        <td>
          <div className="widget-26-job-title">
            <Link
              to={{
                pathname: `/allvendors/${props.id}`,
                state: {
                  vendorId: props.id,
                },
              }}
            >
              {props.name}
            </Link>

            <p className="m-0">
              <a href="#" className="employer-name"></a>
              <span className="text-muted time">{props.date}</span>
            </p>
          </div>
        </td>
        <td>
          <div className="widget-26-job-info">
            <p className="type m-0">Full-Time</p>
            <p className="text-muted m-0">
              in <span className="location">{props.city}</span>
            </p>
          </div>
        </td>
        <td>
          <div className="widget-26-job-category bg-soft-base">
            {/* <i className="indicator bg-base"></i> */}
            <span>{props.category}</span>
          </div>
        </td>
        <td>
          <div className="widget-26-job-salary">{props.number}</div>
        </td>
        <td>
          <div className="widget-26-job-info">
            <p className="type m-0"></p>
            <p className="text-muted m-0">
              <span className="location">Vendor</span>
            </p>
          </div>
        </td>
        <td>
          <ShowRating
            totalreviews={props.totalreviews}
            rating={props.avgrating / props.totalreviews}
          />
        </td>
      </tr>
    </div>
  );
}
