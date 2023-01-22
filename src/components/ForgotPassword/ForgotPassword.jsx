import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./ForgotPassword.css";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email has been sent");
    } catch (error) {
      toast.error("Could not send email");
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Navbar />

      <div className="email-form-container">
        <input
          type="email"
          className="form-control mt-3"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />

        <button className="btn btn-success mt-4" onClick={sendEmail}>
          Send password reset email
        </button>
      </div>
    </>
  );
}

export default ForgotPassword;
