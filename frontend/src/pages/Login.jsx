import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();

  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  let handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }

      let data = await response.json();
      

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.userId || "");
      localStorage.setItem("phone", data.phone);

      if (data.role === "ADMIN") {
        navigate("/admin/movies");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #111827 45%, #1e1b4b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "430px",
          background: "rgba(17, 24, 39, 0.95)",
          padding: "32px",
          borderRadius: "22px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <button
          type="submit"
          className="btn w-100 fw-semibold"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            color: "white",
            borderRadius: "12px",
            padding: "12px",
            border: "none",
          }}
        >
          Login
        </button>

        <p className="text-center mt-3">
          New user?{" "}
          <Link
            to="/register"
            style={{ color: "#c084fc", textDecoration: "none" }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
