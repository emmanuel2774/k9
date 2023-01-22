import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./SignOut.css";

function SignOut() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
  });

  const { name } = formData;

  const Signout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="sign-out-container text-success">
        <div className="sign-out-questionare">
          Hello, {name} <br /> <p>Are you sure you want to leave?</p>
          <button onClick={Signout} className="btn btn-success">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default SignOut;
