import React, { useState } from "react";
import Cookies from "universal-cookie";
import UserDataService from "../api/UserDataService";
import teaBanner from "../images/TeaBanner.jpg";
import place from "../images/tealogo.png";

const initialState = {
  uId: "",
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

let cookies = new Cookies();

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    document.getElementById("error-username").innerHTML = "";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    //sending data to server
    if (isSignup) {
      UserDataService.registration(form)
        .then((response) => {
          console.log("registration done ", response);
          setIsSignup((prevProps) => !prevProps);
        })
        .catch((error) => {
          console.log("Registration error :", error);
          if (error.response.data === "Wrong username") {
            document.getElementById("error-username").innerHTML =
              error.response.data;
            setTimeout(() => {
              document.getElementById("error-username").innerHTML = "";
            }, 5000);
          }
        });
    } else {
      UserDataService.login(form)
        .then((response) => {
          const { uid, fullName, username, password, phoneNumber, avatarURL } =
            response.data;
          console.log(response.data);
          cookies.set("token", "ABCD");
          cookies.set("uId", uid);
          cookies.set("username", username);
          cookies.set("fullName", fullName);
          cookies.set("password", password);
          cookies.set("phoneNumber", phoneNumber);
          cookies.set("avatarURL", avatarURL);

          // after setting cookies reload the browser
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.data) {
            console.log("login error :", error.response.data);
            if (error.response.data === "Wrong password") {
              document.getElementById("error-password").innerHTML =
              error.response.data;
              setTimeout(() => {
                document.getElementById("error-password").innerHTML = "";
              }, 3000);
            }
            if (error.response.data === "Wrong username") {
              document.getElementById("error-username").innerHTML =
                error.response.data;
              setTimeout(() => {
                document.getElementById("error-username").innerHTML = "";
              }, 3000);  
            }
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <div className="auth__form-container" id="auth">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <span id="error-username"></span>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {!isSignup && <span id="error-password"></span>}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={teaBanner} alt="team img" />
        <div className="auth__form-container_image overlay">
          <img src={place} alt="team img" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
