import React from "react";
import google from "../../Components/Assest/search.png";
import { Link } from "react-router-dom";
import axios from "axios";
function SignInForm() {
  const url = "https://mern-stack-e-commerce-50uh.onrender.com";
  const [state, setState] = React.useState({
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
    try {
      await axios.post(`${url}/auth/login`, state).then((res) => {
        if (res.data.success) {
          window.location.replace("/");
          localStorage.setItem("token", res.data.token);
        } else {
          console.log(res);
          window.location.href = res.data;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const loginWithGoogle = async () => {
    try {
      window.location.href = `${url}/googleauth/google/callback`;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <div onClick={loginWithGoogle} className="social">
            <img src={google} alt="" style={{ width: "40px" }} />
          </div>
        </div>
        <span>or use your account</span>
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">
          <h6>Forgot your password?</h6>
        </a>
        <div>
          <button>Sign In</button>
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

export default SignInForm;
