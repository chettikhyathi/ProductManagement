import React, { useState } from "react";
import { loginUser } from "../services/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(username, password);

      localStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", username === "admin" ? "ADMIN" : "USER");

      alert("Login successful!");

      window.location.href = "/";
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb"
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >

        <h1 style={{ textAlign: "center" }}>Login</h1>

        <form onSubmit={handleLogin}>

          <div>
            <label>Username</label>
            <br />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: "8px"
              }}
            />
          </div>

          <br />

          <div>
            <label>Password</label>
            <br />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: "8px"
              }}
            />
          </div>

          <br />

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#1f2937",
              color: "white"
            }}
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;