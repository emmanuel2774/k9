import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

import OAuth from "../OAuth/OAuth";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");
          toast.success("Woof!");
        }
      })
      .catch((error) => {
        toast.error("Bad User credentials", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const { email, password } = formData;
  return (
    <>
      <Navbar />
      <div className="sign-in-container">
        <form onSubmit={onSubmit} className="form mt-5">
          <h3 className="sign-in-header text-center">Sign In</h3>

          <input
            type="email"
            className="form-control mt-3"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />

          <input
            type="text"
            className="form-control mt-3"
            id="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />

          <div className="sign-in-ccontainer text-success">
            <button className="btn btn-success mt-3">Sign In</button>
            <h6 className="mt-4">
              <NavLink
                to="/forgot-password"
                className="text-success forgot-password "
              >
                Forgot password?
              </NavLink>
            </h6>
          </div>

          <div className="sign-up-div">
            <h6 className="mt-5">Don't have an account?</h6>
            <NavLink className="text-success sign-up" to="/sign-up">
              {" "}
              <h6 className="sign-up-text">Sign up</h6>
            </NavLink>
          </div>

          <OAuth />
        </form>
      </div>
    </>
  );
}

export default SignIn;
