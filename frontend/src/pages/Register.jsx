import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();

  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  let handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  let handleRegister = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        let errorText = await response.text();
        alert(errorText || "Registration failed");
        return;
      }

      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
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
        onSubmit={handleRegister}
        style={{
          width: "430px",
          background: "rgba(17, 24, 39, 0.95)",
          padding: "32px",
          borderRadius: "22px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2">Create Account</h2>
          <p style={{ color: "#cbd5e1", marginBottom: 0 }}>
            Register to access MovieZone
          </p>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={user.phone}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="form-select mb-4"
        >
            <option value="">Select Role</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

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
          Register
        </button>

        <p className="text-center mt-4 mb-0" style={{ color: "#cbd5e1" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#c084fc", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}