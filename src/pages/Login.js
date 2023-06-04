import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Import custom CSS file for Login component

export default function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const host = "http://localhost:5000";

  const handleClick = async (e) => {
    e.preventDefault();

    // API call
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login.email, password: login.password })
    });
    const json = await response.json();
    if (json.success) {
      //Save auth token and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/", { replace: true });
      props.showAlert("Login successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger")
    }
  }

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  return (
<div className="bck">

         <div className="signin-box">
      <h4>Login to iNotebook</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={login.email} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={login.password} onChange={onChange} />
        </div>
        <div className="button-container">
        <button type="button" className="btn btn-primary" onClick={handleClick}>Login</button>
        </div>
      </form>
    </div>
    </div>

  )
}
