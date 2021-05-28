import React from "react";
import { useAuth } from "../AuthContext";
import {
  Link,
  useHistory,
  useLocation,
  withRouter,
  useRouteMatch,
} from "react-router-dom";
export const Navbar = () => {
  // const { currentUser } = useAuth();

  return (
    <nav className="navbar-simple">
      <h1></h1>
      <ul>
        <li>
          <div className="btn-shape">
            <Link to="/developers">Developers</Link>
          </div>
        </li>

        <li>
          <div className="btn-shape">
            <Link to="/login">User OnBoarding</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};
