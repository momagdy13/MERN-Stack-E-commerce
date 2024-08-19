import React, { useEffect, useState } from "react";
import '../../css.css'
import axios from "axios";
import { useParams } from "react-router-dom";
import SignUpForm from "./Sign-Up";
import SignInForm from "./SignIn";

function LoginForm() {
  const url = "https://mern-stack-e-commerce-50uh.onrender.com";
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  const { userId, uniqueString } = useParams();
  useEffect(() => {
    if (userId || uniqueString) {
      axios
        .get(`${url}/auth/verify/${userId}/${uniqueString}`)
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("token");
          handleShowAlert(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }, [userId, uniqueString]);

  return (
    <div className="App">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
