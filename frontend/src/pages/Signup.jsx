import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password || !contact || !address) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile.contact_number", contact);
    formData.append("profile.address", address);
    if (profilePic) formData.append("profile.profile_picture", profilePic);

    try {
      const res = await axios.post("http://localhost:8000/accounts/register/", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sign Up</h1>

        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <textarea
          className="login-input"
          placeholder="Address (2 rows)"
          value={address}
          rows={2}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="file"
          className="login-input"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />

        <button className="login-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="signup-text">
          Already have an account? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
