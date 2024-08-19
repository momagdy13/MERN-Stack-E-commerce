import React from "react";
import google from "../../Components/Assest/search.png";
import axios from "axios";
import { Link } from "react-router-dom";
function SignUpForm() {
  // const url = "https://mern-stack-e-commerce-50uh.onrender.com"; TO DO
  const url = "http://localhost:4000";
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    await axios
      .post(`${url}/auth/signup`, state)
      .then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            window.location.href = "http://localhost:5173/";
            // window.location.href = "https://moshop24.netlify.app/login"; TO DO
          }, 5000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const loginWithGoogle = async () => {
    try {
      window.location.href = `${url}/googleauth/google/callback`;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div onClick={loginWithGoogle} className="social">
          <img src={google} alt="" style={{ width: "40px" }} />
        </div>
        <span>or use your email for registration</span>
        <input
          required
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          required
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          required
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div>
          <button>Sign Up</button>
          <Link to={"/"}>
            <button style={{ marginLeft: "20px", background: "red" }}>
              Cancle
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
