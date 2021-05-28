import React from "react";
// import "./style.css";

const UserReviewComponent = (props) => {
  return (
    <>
      <div className="profile-content">
        <div className="tab-content p-0">
          <div className="tab-pane fade active show" id="profile-post">
            <ul className="timeline">
              <li>
                <div className="timeline-time">
                  <span className="time">{props.date}</span>
                </div>

                <div className="timeline-icon">
                  <a href="javascript:;">&nbsp;</a>
                </div>

                <div className="timeline-body">
                  <div className="timeline-content">
                    <h4 className="template-title">
                      <i className="fa fa-map-marker text-danger fa-fw"></i>
                      {props.vendorName}, {props.city}
                    </h4>

                    <p className="m-t-20">
                      <img src="../assets/img/gallery/gallery-5.jpg" alt="" />
                    </p>
                  </div>
                  <div className="timeline-content timeline-footer">
                    <p className="lead">
                      <i className="fa fa-quote-left fa-fw pull-left"></i>
                      {props.review}
                      <i className="fa fa-quote-right fa-fw pull-right"></i>
                    </p>
                  </div>
                  <div className="timeline-footer">
                    <a
                      href="javascript:;"
                      className="m-r-15 text-inverse-lighter"
                    >
                      <i className="fa fa-share fa-fw fa-lg m-r-3"></i>
                      Share
                    </a>
                  </div>
                </div>
              </li>
              {/* <li></li>
              <li>
                <div className="timeline-icon">
                  <a href="javascript:;">&nbsp;</a>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReviewComponent;
