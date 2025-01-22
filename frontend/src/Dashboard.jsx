// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Dashboard() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="dashboard">
//       <h1>Welcome, {state?.user?.name || "User"}!</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mb-4 bg-light">
        <h1 className="text-center">Welcome, {user?.name || "User"}!</h1>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary me-3"
            onClick={handleViewProfile}
          >
            View Profile
          </button>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
