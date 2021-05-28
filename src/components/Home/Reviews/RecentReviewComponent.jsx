import React from "react";
import fire from "../../../config";

// import "./RecentReviews.css";
import ShowRating from "./ShowRating";
import { Link } from "react-router-dom";
export default function RecentReviewComponent(props) {
  const [state, setState] = React.useState("");
  const fetchUserDetails = () => {
    fire
      .firestore()
      .collection("User")
      .doc(props.useremail)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setState(doc.data());
        } else {
          console.log("No such document!");
        }
      });
  };

  React.useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <div className="card card-primary text-center">
        <img
          style={{
            borderRadius: "50%",
          }}
          className="card-img-top"
          src={state.photourl}
          alt="Card image cap"
        />
        <div className="card-body">
          <div className="">
            <ShowRating rating={props.rating} />
          </div>
          <div className="card-title">{props.username}</div>
          <p
            className="card-text"
            style={{
              fontWeight: "bold",
            }}
          >
            {props.review}
          </p>
        </div>
        <div className="card-footer">
          <Link
            to={`/allvendors/${props.vendorid}`}
            id="btn-border-1"
            className="btn btn-outline-secondary btn-icon-right"
          >
            <span
              id="span-color-change"
              style={{
                fontWeight: "bold",
                color: "rgba(78, 34, 208, 0.8)",
              }}
            >
              {props.vendorname}
              <img
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(11%) sepia(98%) saturate(7382%) hue-rotate(261deg) brightness(84%) contrast(92%)",
                }}
                src="https://static3.avast.com/1/web/i/v2/components/arrow-m-right-orange.png"
                height={24}
              />
            </span>
          </Link>
        </div>
      </div>
      {/* <div className="col-md-4 col-xl-3">
        <div className="card bg-c-pink  order-card">
          <div className="card-block">
            <h6 className="m-b-20">{props.username}</h6>
            <p className="m-b-0">{props.review}</p>
            <p className="m-b-0">
              {" "}
              <span className="f-right">{props.date}</span>
            </p>
            <br />

            <h6 className="text-right">
              <span>{props.vendorname}</span>
            </h6>
            <h6 className="text-right">
              <span>Rating: {props.rating}/5</span>
            </h6>
          </div>
        </div>
      </div> */}
      {/* <div className="col-md-3">
        <div className="contact-box center-version">
          <a href="#profile.html">
            <img
              alt="image"
              className="img-circle"
              src="https://bootdey.com/img/Content/avatar/avatar4.png"
            />
            <h4 className="m-b-xs">{props.username}</h4>

            <div className="font-bold">{props.vendorname}</div>
            <address className="m-t-md">
              <p> {props.review}</p>
              <ShowRating rating={props.rating} />
            </address>
          </a>
          <div className="contact-box-footer">
            <div className="m-t-xs btn-group">
              <Link
                to={`/allvendors/${props.vendorid}`}
                className="btn btn-xs btn-white"
              >
                <img
                  width="30px"
                  height="30px"
                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0xOS43MzIgNjEuODQ0aDg4LjUzN3Y1MS43MTVoLTg4LjUzN3oiIGZpbGw9IiNlZjUzNjEiLz48cGF0aCBkPSJtMTA4LjI3IDYxLjg0djUxLjcyaC04OC41NHYtNy4wMDZoODIuMjJ2LTQ0LjcxNHoiIGZpbGw9IiNkYTJhNDciLz48cGF0aCBkPSJtMTA4LjI2OCAxMTQuNTZoLTg4LjUzNmExIDEgMCAwIDEgLTEtMXYtNTEuNzE2YTEgMSAwIDAgMSAxLTFoODguNTM2YTEgMSAwIDAgMSAxIDF2NTEuNzE2YTEgMSAwIDAgMSAtMSAxem0tODcuNTM2LTJoODYuNTM2di00OS43MTZoLTg2LjUzNnoiIGZpbGw9IiMyZjNhNWEiLz48Y2lyY2xlIGN4PSI2Mi44NzgiIGN5PSIxMTIuMzA1IiBmaWxsPSIjODQ4NzljIiByPSIxNC42OTUiIHRyYW5zZm9ybT0ibWF0cml4KC45ODcgLS4xNiAuMTYgLjk4NyAtMTcuMTc3IDExLjUyMikiLz48cGF0aCBkPSJtNjIuODc4IDEyOGExNS43IDE1LjcgMCAxIDEgMTUuNjk1LTE1LjY5NSAxNS43MTMgMTUuNzEzIDAgMCAxIC0xNS42OTUgMTUuNjk1em0wLTI5LjM5MWExMy43IDEzLjcgMCAxIDAgMTMuNjk1IDEzLjcgMTMuNzExIDEzLjcxMSAwIDAgMCAtMTMuNjk1LTEzLjd6IiBmaWxsPSIjMmYzYTVhIi8+PGNpcmNsZSBjeD0iNjIuODc4IiBjeT0iMTEyLjMwNSIgZmlsbD0iI2UxZTZlOSIgcj0iNi40NDQiIHRyYW5zZm9ybT0ibWF0cml4KC45ODcgLS4xNiAuMTYgLjk4NyAtMTcuMTc3IDExLjUyMikiLz48ZyBmaWxsPSIjMmYzYTVhIj48cGF0aCBkPSJtNjIuODc4IDExOS43NDlhNy40NDUgNy40NDUgMCAxIDEgNy40NDQtNy40NDQgNy40NTMgNy40NTMgMCAwIDEgLTcuNDQ0IDcuNDQ0em0wLTEyLjg4OWE1LjQ0NSA1LjQ0NSAwIDEgMCA1LjQ0NCA1LjQ0NSA1LjQ1MSA1LjQ1MSAwIDAgMCAtNS40NDQtNS40NDV6Ii8+PHBhdGggZD0ibTExMC41NiA3MS4xMjZoLTkzLjEyYTEgMSAwIDEgMSAwLTJoOTMuMTJhMSAxIDAgMCAxIDAgMnoiLz48cGF0aCBkPSJtNjQgNjIuODQ0YTEgMSAwIDAgMSAtMS0xdi02MC44NDRhMSAxIDAgMCAxIDIgMHY2MC44NDRhMSAxIDAgMCAxIC0xIDF6Ii8+PC9nPjxwYXRoIGQ9Im0xMDguMDM4IDQwLjg0NGE0NS4xNDkgNDUuMTQ5IDAgMCAwIC04OC4wNzYgMHoiIGZpbGw9IiNlOGM3OWMiLz48cGF0aCBkPSJtMTA4LjAzOCA0MS44NDRoLTg4LjA3NmExIDEgMCAwIDEgLS45NzUtMS4yMiA0Ni4xNDkgNDYuMTQ5IDAgMCAxIDkwLjAyNiAwIDEgMSAwIDAgMSAtLjk3NSAxLjIyem0tODYuODA4LTJoODUuNTRhNDQuMTUyIDQ0LjE1MiAwIDAgMCAtODUuNTQgMHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtODMuMDMgNDAuODQ0Yy0xLjk2Mi0yMC4xNDQtOS43My0zNS4xOTMtMTkuMDMtMzUuMTkzcy0xNy4wNjggMTUuMDQ5LTE5LjAzIDM1LjE5M3oiIGZpbGw9IiNlMWU2ZTkiLz48cGF0aCBkPSJtODMuMDMgNDEuODQ0aC0zOC4wNmExIDEgMCAwIDEgLS45OTUtMS4xYzIuMDctMjEuMjUgMTAuMzA1LTM2LjA5MyAyMC4wMjUtMzYuMDkzczE3Ljk1NSAxNC44NDMgMjAuMDI1IDM2LjFhMSAxIDAgMCAxIC0xIDEuMXptLTM2Ljk1Mi0yaDM1Ljg0NGMtMi4xMDQtMTkuMzAxLTkuNTY1LTMzLjE5My0xNy45MjItMzMuMTkzcy0xNS44MTggMTMuODkyLTE3LjkyMiAzMy4xOTN6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTE5Ljk2MiA0MC44NDR2My4xOTJhNC4zOTUgNC4zOTUgMCAwIDAgNC4zOTUgNC4zOTVoMTYuMjE4YTQuMzk1IDQuMzk1IDAgMCAwIDQuMzk1LTQuMzk1di0zLjE5MnoiIGZpbGw9IiNkOGIxOGMiLz48cGF0aCBkPSJtNDAuNTc1IDQ5LjQzMWgtMTYuMjE4YTUuNCA1LjQgMCAwIDEgLTUuMzk1LTUuMzk1di0zLjE5MmExIDEgMCAwIDEgMS0xaDI1LjAwOGExIDEgMCAwIDEgMSAxdjMuMTkyYTUuNCA1LjQgMCAwIDEgLTUuMzk1IDUuMzk1em0tMTkuNjEzLTcuNTg3djIuMTkyYTMuNCAzLjQgMCAwIDAgMy4zOTUgMy4zOTVoMTYuMjE4YTMuNCAzLjQgMCAwIDAgMy4zOTUtMy4zOTV2LTIuMTkyeiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im04My4wMyA0MC44NDR2My4xOTJhNC4zOTUgNC4zOTUgMCAwIDAgNC4zOTUgNC4zOTVoMTYuMjE4YTQuMzk1IDQuMzk1IDAgMCAwIDQuMzk1LTQuMzk1di0zLjE5MnoiIGZpbGw9IiNkOGIxOGMiLz48cGF0aCBkPSJtMTAzLjY0MyA0OS40MzFoLTE2LjIxOGE1LjQgNS40IDAgMCAxIC01LjM5NS01LjM5NXYtMy4xOTJhMSAxIDAgMCAxIDEtMWgyNS4wMDhhMSAxIDAgMCAxIDEgMXYzLjE5MmE1LjQgNS40IDAgMCAxIC01LjM5NSA1LjM5NXptLTE5LjYxMy03LjU4N3YyLjE5MmEzLjQgMy40IDAgMCAwIDMuMzk1IDMuMzk1aDE2LjIxOGEzLjQgMy40IDAgMCAwIDMuMzk1LTMuMzk1di0yLjE5MnoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtNDQuOTcgNDAuODQ0djMuMTkyYTQuMzk1IDQuMzk1IDAgMCAwIDQuNCA0LjM5NWgyOS4yN2E0LjM5NSA0LjM5NSAwIDAgMCA0LjM5NS00LjM5NXYtMy4xOTJ6IiBmaWxsPSIjZTFlNmU5Ii8+PHBhdGggZD0ibTc4LjYzNSA0OS40MzFoLTI5LjI3YTUuNCA1LjQgMCAwIDEgLTUuNC01LjM5NXYtMy4xOTJhMSAxIDAgMCAxIDEtMWgzOC4wNjVhMSAxIDAgMCAxIDEgMXYzLjE5MmE1LjQgNS40IDAgMCAxIC01LjM5NSA1LjM5NXptLTMyLjY2NS03LjU4N3YyLjE5MmEzLjQgMy40IDAgMCAwIDMuNCAzLjM5NWgyOS4yN2EzLjQgMy40IDAgMCAwIDMuMzk1LTMuMzk1di0yLjE5MnoiIGZpbGw9IiMyZjNhNWEiLz48L3N2Zz4="
                />
                Visit
              </Link>

              <a className="btn btn-xs btn-white">
                <img
                  width="30px"
                  height="30px"
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzkxLjgzNyAzOTEuODM3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzOTEuODM3IDM5MS44Mzc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNENzQ0M0U7IiBkPSJNMjg1LjI1NywzNS41MjhjNTguNzQzLDAuMjg2LDEwNi4yOTQsNDcuODM2LDEwNi41OCwxMDYuNTgNCgkJYzAsMTA3LjYyNC0xOTUuOTE4LDIxNC4yMDQtMTk1LjkxOCwyMTQuMjA0UzAsMjQ4LjE2NSwwLDE0Mi4xMDhjMC01OC44NjIsNDcuNzE3LTEwNi41OCwxMDYuNTgtMTA2LjU4bDAsMA0KCQljMzYuMDMyLTAuMjgxLDY5LjcxOCwxNy44NDIsODkuMzM5LDQ4LjA2NUMyMTUuNjc0LDUzLjUxNywyNDkuMjczLDM1LjQ0MSwyODUuMjU3LDM1LjUyOHoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                />
                Like
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
