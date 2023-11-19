import React, { useEffect } from "react";
import "./FormStyle.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "./constant.js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        console.log(response);
        sessionStorage.setItem("user", true);
        console.log(sessionStorage.getItem("user"));
        navigate("/chatbot");
      } else alert("Invalid Credentials");
    });
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-footer">
          <Link to="/signup" className="form-link">
            Forgot Password?
          </Link>
          <button type="submit" onClick={() => login()}>
            Login
          </button>
        </div>
        <div className="signup-link">
          Don't have an account?{"\n"}
          <Link to="/signup" className="form-link">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
