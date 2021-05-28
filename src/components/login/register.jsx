import React, { useRef, useState } from "react";
import loginImg from "../../img/login.svg";
import axios from "axios";
import fire from "../../config";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";

export const Register = () => {
  // const history = useHistory();
  // // const [response, handleResponse] = React.useState("");
  // const [isAuth, setAuth] = React.useState(false);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [name, setName] = React.useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   console.log(email);
  // };
  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  //   console.log(password);
  // };
  // const handleName = (e) => {
  //   setName(e.target.value);
  // };
  // const handleSubmit = () => {
  //   console.log(email);
  //   const success = fire
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((u) => {
  //       setAuth(true);
  //       history.push("/home");
  //       console.log(u.user.displayName);
  //       return u.user.updateProfile({
  //         displayName: name,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const tryRegister = async () => {
    await signup(
      emailRef.current.value,
      passwordRef.current.value,
      usernameRef.current.value
    );
  };
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const status = tryRegister();
      status
        .then((v) => history.push("/home"))
        .catch((v) => setError(v.message));
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              ref={usernameRef}
              name="username"
              required
              placeholder="username"
              // onChange={(e) => {
              //   handleName(e);
              // }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              required
              type="text"
              name="email"
              placeholder="email"
              // onChange={(e) => {
              //   handleEmail(e);
              // }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              required
              placeholder="password"
              // onChange={(e) => {
              //   handlePassword(e);
              // }}
            />
          </div>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div className="footer-btn">
        <button
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          className="btn-new"
        >
          Register
        </button>
      </div>
    </div>
  );
};
