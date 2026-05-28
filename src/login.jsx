import React, { useState } from 'react';
import OAuthLogin from './oauthLogin';
import { loginUser } from './api'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await loginUser(email, password);

    if (data?.token) {
      localStorage.setItem("authToken", data.token);

      const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        style: { color: "white" },
      });

      setTimeout(() => {
        if (redirectUrl) {
          const separator = redirectUrl.includes('?') ? '&' : '?';
          window.location.href = `${redirectUrl}${separator}token=${data.token}`;
        }
      }, 1500);
    }
  };

const [showPassword, setShowPassword] = useState(false);


  return (
    // <div className="login-box">
    //   <div className="avatar">
    //     <i className="fas fa-user-circle"></i>
    //   </div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleLogin} className="login-form">
    //     <div className="input-group">
    //       <i className="fas fa-envelope"></i>
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="input-group">
    //       <i className="fas fa-lock"></i>
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="forgot-password">
    //       <a href="/forgot-password">Forgot Password?</a>
    //     </div>
    //     <button type="submit" className="login-button">
    //       Log in
    //     </button>
    //   </form>
    //   <p className="signup-text">
    //     Don't have an account? <Link to="/signup">Sign up here</Link>
    //   </p>
    //   <div className="separator">OR</div>
    //   <OAuthLogin />
    // </div>
    <div className="login-container">
  <div className="login-box">
    <div className="avatar">
      <i className="fas fa-user-circle"></i>
    </div>
    <h2 className="login-title">Login</h2>

    <form onSubmit={handleLogin} className="login-form">
      <div className="input-group">
        <i className="fas fa-envelope input-icon"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <i className="fas fa-lock input-icon"></i>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <i
    className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
    onClick={() => setShowPassword(!showPassword)}
    style={{ cursor: 'pointer' }}
  ></i>
      </div>

      <div className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </div>

      <button type="submit" className="login-button">
        Log in
      </button>
    </form>

    <p className="signup-text">
      Don't have an account? <Link to="/signup">Sign up here</Link>
    </p>

    <div className="separator">OR</div>

    <OAuthLogin />
  </div>
</div>

  );
};

export default Login;