import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const gohome = () => {
    window.location.href = "/";
  };

  const register = async (e) => {
    e.preventDefault();

    // Validate all fields before sending the request
    if (
      !userName.trim() ||
      !password ||
      !email.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const registerUrl = `${window.location.origin}/djangoapp/register`;

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName.trim(),
          password: password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "Authenticated") {
        sessionStorage.setItem("username", data.userName);
        alert("Registration successful!");
        window.location.href = "/";
      } else if (data.error === "Already Registered") {
        alert("This username is already registered. Please choose another.");
      } else {
        alert(data.error || data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%" }}>
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className="text" style={{ flexGrow: "1" }}>
          SignUp
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifySelf: "end",
            alignSelf: "start",
          }}
        >
          <button
            type="button"
            onClick={gohome}
            aria-label="Close registration"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img style={{ width: "1cm" }} src={close_icon} alt="Close" />
          </button>
        </div>
        <hr />
      </div>

      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt="" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input_field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt="" />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="input_field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt="" />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="input_field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              required
            />
          </div>

          <div className="input">
            <img src={email_icon} className="img_icon" alt="" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input_field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} className="img_icon" alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password (at least 8 characters)"
              className="input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>
        </div>

        <div className="submit_panel">
          <input
            className="submit"
            type="submit"
            value={loading ? "Registering..." : "Register"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;