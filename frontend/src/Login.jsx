import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const validationErrors = {};
    if (!values.email) validationErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) validationErrors.email = "Invalid email format.";
    if (!values.password) validationErrors.password = "Password is required.";
    else if (values.password.length < 6) validationErrors.password = "Password must be at least 6 characters.";
    return validationErrors;
  };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const validationErrors = validateInputs();
//     if (Object.keys(validationErrors).length) {
//       setErrors(validationErrors);
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/login", values);
//       navigate("/dashboard", { state: { user: response.data.user } });
//     } catch (error) {
//       setErrors({ general: error.response?.data?.message || "Login failed" });
//     }
//   };

const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/login", values);
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: error.response?.data?.message || "Login failed" });
    }
  };

  const handleInput = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4"> {/* Adjust the col size here */}
          <form onSubmit={handleSubmit} className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={values.email}
                onChange={handleInput}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={values.password}
                onChange={handleInput}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            {errors.general && <div className="alert alert-danger mt-3">{errors.general}</div>}
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
