import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { loginUser } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (data?.userId !== undefined && data?.userId !== null) {
        localStorage.setItem("userId", String(data.userId));
      }
      localStorage.setItem("token", data?.token || "dummy-token");

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="auth-shell">
      <Card className="auth-card">
        <div className="text-center mb-6">
          <h1 className="gradient-text text-4xl font-bold">
            Welcome Back
          </h1>
        </div>

        {error && (
          <Message
            severity="error"
            text={error}
            className="mb-4"
          />
        )}

        <div className="auth-form">
          <div className="flex flex-column gap-2">
            <label className="mb-3 text-xl font-medium">
              Email Address
            </label>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-3 text-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label className="mb-3 text-xl font-medium">
              Password
            </label>

            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              toggleMask
              feedback={false}
              className="w-full block"
              inputClassName="w-full p-3 text-lg"
              placeholder="Enter your password"
            />
          </div>
          <Button
            label={loading ? "Logging in..." : "Login"}
            icon="pi pi-sign-in"
            className="w-full p-3 text-xl"
            onClick={handleLogin}
            disabled={loading || !email || !password}
          />
          <div className="text-center text-lg mt-3">
            <span style={{ color: "#a0a0a0" }}>
              Don't have an account?
            </span>
            <Link to="/register" className="ml-2">
              Register here
            </Link>
          </div>

        </div>
      </Card>
    </div>
  );
}
