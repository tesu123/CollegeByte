import React from "react";
import { useLocation, Link } from "react-router-dom";

function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Profile Details</h2>
            <div>
                <h4>Name: {user?.name || "N/A"}</h4>
                <h5>Email: {user?.email || "N/A"}</h5>
            </div>
            <div className="mt-4 text-center">
            <Link to="/dashboard" className="btn btn-primary">
                Back to Dashboard
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import React from "react";
// import { Link } from "react-router-dom";

// function Profile() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="profile-container mt-5">
//       <h2>Profile Details</h2>
//       <div>
//         <h4>Name: {user?.name || "N/A"}</h4>
//         <h5>Email: {user?.email || "N/A"}</h5>
//       </div>
//       <Link to="/dashboard" className="btn btn-primary">
//         Back to Dashboard
//       </Link>
//     </div>
//   );
// }

// export default Profile;
