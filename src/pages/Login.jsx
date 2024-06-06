import React, { useState } from "react";
import Background from "../images/Background.jpg";
import { Input } from "../components/Input";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Google from "../images/Google.png";
// import logo from "../images/logo.jpg";
import "./styles/login.css";
import axios from "axios";
import { baseUrl } from "../utilis/axios";
import SecondLogo from "../images/second-logo.jpg"

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "emailAddress" && !inputData.emailAddress.includes("@")) {
      toast.error("email should include @");
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (!inputData.emailAddress.includes("@")) {
          toast.error("Email should include @");
      } else {
        const response = await axios.post(`${baseUrl}/auth/login`, inputData);
          if(response.status === 200){
            toast.success(response.data.message);
    
            setInputData ({
              email: "",
              password: "",
            });
        }
      } 

    } catch (error) {
      if (error?.code === "ERR_NETWORK") {
          toast.error("Network error. Please check your internet connection", "error")
        }

    }

    }
  

  return (
    <div>
      <div className="body">
        <div className="bg-left">
          <img src={Background} alt="background" className="bg-image" />
        </div>
        <div className="bg-right"></div>
      </div>
      <div className="sec-body">
        <div className="sec-body-left">
          <img src={Background} alt="background" className="background-image" />
          <h1>Meet2Connect</h1>
        </div>
        <div className="sec-body-right">
          <div className="form">
            <div className="logo-container">
              <div className="chat-logo">
                <img src={SecondLogo} alt="chat-logo" />
              </div>
              <div className="welcome-message">Hi, Welcome back</div>
            </div>
            <div className="field">
              <Input
                myInput={{
                  label: "Email",
                  className: "input",
                  type: "email",
                  placeholder: "Enter your email address",
                  name: "email",
                  value: inputData.emailAddress,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>
            <div className="field">
              <Input
                myInput={{
                  label: "Password",
                  className: "input",
                  type: "password",
                  placeholder: "Enter password",
                  name: "password",
                  value: inputData.password,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>
            <div className="forgot-password">
              <Link to="/signup">
                <span>Forgot password?</span>
              </Link>
            </div>
            <button type="submit" className="submit-button" onSubmit={handleSubmit}>
              Log in
            </button>
            <div className="separator">
              <div className="line"></div>
              <div className="or-text">or</div>
              <div className="line"></div>
            </div>
            <div className="google-signin">
              <img
                loading="lazy"
                src={Google}
                alt="google-icon"
                className="google-image"
              />
              <div>Sign in with Google</div>
            </div>
            <div className="signup-prompt">
              <span>Don't have an account?</span>
              <Link to="/signup" className="account">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
