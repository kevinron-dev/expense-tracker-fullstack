import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { registerUser } from "../../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess(false);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await registerUser({ email, password });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Email already exists or registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <Card 
        className="auth-card"
        title={<span className="gradient-text">Create Account</span>}
      >
        {error && (
          <Message severity="error" text={error} className="mb-3 w-full" />
        )}
        
        {success && (
          <Message severity="success" text="Registration successful! Redirecting to login..." className="mb-3 w-full" />
        )}
        
        <div className="auth-form">
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              toggleMask
              className="w-full"
              inputClassName="w-full"
              style={{ width: "100%" }}
            />
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Password
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              toggleMask
              feedback={false}
              className="w-full"
              inputClassName="w-full"
              style={{ width: "100%" }}
            />
          </div>

          <Button
            label={loading ? "Creating Account..." : "Register"}
            icon="pi pi-user-plus"
            className="w-full"
            onClick={handleRegister}
            disabled={loading || !email || !password || !confirmPassword || success}
          />
        </div>
        
        <div className="text-center mt-3">
          <span style={{ color: '#a0a0a0' }}>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
      </Card>
    </div>
  );
}
