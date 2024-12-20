import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const Password = e.target.Password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const terms = e.target.terms.checked;
    console.log(email, Password, terms, name, photo);
    setErrorMsg("");
    setSuccess(false);
    if (!terms) {
      setErrorMsg("accept our terms");
      return;
    }
    // console.log(typeof Password);
    if (Password.length < 6) {
      setErrorMsg("password must be 6 character or more");
      return;
    }
    // const regex =
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6}$/;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!regex.test(Password)) {
      setErrorMsg(
        "password at least one uper case ,at least one lower case , at least one number, at least one spacial cherecture"
      );
      return;
    }
    //create user email and pass
    createUserWithEmailAndPassword(auth, email, Password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        // send verification email
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });
        // update profile
        const profile = {
          photoURL: photo,
          displayName: name,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("Profile updated!");
          })
          .catch((error) => console.log("Profile updated! error"));
      })
      .catch((error) => {
        console.log("Error", error.message);
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-bold text-center">Sign Up now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="photo"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPass ? "text" : "password"}
            name="Password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="btn btn-xs absolute right-4 top-12 "
          >
            {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-primary"
              />
              <span className="label-text ml-2">Remember me</span>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {errorMsg && <p className="text-red-700 text-center">{errorMsg}</p>}
      {success && <p className="text-green-600">sign up successfully</p>}
      <p className="m-2">
        already have an account? please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
