import React from "react";
import "./FormStyle.css";
import { useState } from "react";
import { baseUrl } from "./constant";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  var signup = (phone, email, password) => {
    fetch(baseUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        phone: phone,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        }
      });
  };
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Mobile No"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={() => signup(username, email, password)}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
