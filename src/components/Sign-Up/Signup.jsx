import "./SignUp.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OAuth from "../OAuth/OAuth";
import Navbar from "../Navbar/Navbar";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name,
        });

        const formDataCopy = { ...formData };
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        setDoc(doc(db, "users", user.uid), formDataCopy);

        toast.success("woof! Account created");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Bad user credentials");

        // ..
      });
  };

  const { email, password, name } = formData;

  return (
    <>
      <Navbar />
      <div className="sign-up-container">
        <form onSubmit={onSubmit} className="form mt-5">
          <h3 className="sign-in-header ">Sign Up</h3>

          <input
            type="text"
            className="form-control "
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />

          <input
            type="text"
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

          <button className="btn btn-success mt-3">Sign Up</button>

          <div className="sign-up-div">
            <h6 className="mt-4">Already have an account?</h6>
            <h6>
              <NavLink className="text-success sign-up" to="/sign-in">
                Sign In
              </NavLink>
            </h6>
          </div>

          <OAuth />
        </form>
      </div>
    </>
  );
}

export default Signup;
