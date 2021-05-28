import React, { useState, useRef, useEffect } from "react";

import loginImg from "../../img/login.svg";
import axios from "axios";
import fire from "../../config";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const tryLogin = async () => {
    await login(emailRef.current.value, passwordRef.current.value).then(
      (v) => {}
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const status = tryLogin();
      status.then((v) => history.push("/home")).catch((v) => console.log("dd"));
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="base-container">
      <div className="header">Login</div>

      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              required
              type="text"
              name="email"
              // onChange={(e) => {
              //   handleEmail(e);
              // }}
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={passwordRef}
              required
              name="password"
              // onChange={(e) => {
              //   handlePassword(e);
              // }}
              placeholder="password"
            />
          </div>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <div className="footer-btn">
        <button
          type="button"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="btn-new"
        >
          Login
        </button>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};
