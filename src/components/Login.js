import React, { useState } from "react";
import { loginUser } from "../api/api";
import "./Login.css"; // Add CSS file for styling

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");

  // const handleLogin = async () => {
  //   if (!email) return alert("Please enter your email");
  //   const user = await loginUser(email);
  //   if (user) {
  //     setUser(user);
  //     alert("Login Successful!");
  //   } else {
  //     alert("User not found!");
  //   }
  // };
  const handleLogin = async () => {
  if (!email) return alert("Please enter your email");
  const user = await loginUser(email);
  if (user) {
    setUser(user);
    localStorage.setItem("email", email); // <--- save email
    alert("Login Successful!");
  } else {
    alert("User not found!");
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
