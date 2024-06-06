import React, { useState } from "react";
import Background from "../images/Background.jpg";
import "./styles/signUp.css";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import { Link } from "react-router-dom";
import { baseUrl } from "../utilis/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mentalCondition: "",
    country: "",
    state: "",
    password: "",
    repeatPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "firstName" || name === "lastName") {
      if (/\d/.test(inputData.firstName) || /\d/.test(inputData.lastName)) {
        toast.error(`${name === "firstName" ? "First" : "Last"} name should not contain digits.`);
      }
    } else if (name === "emailAddress") {
      if (!inputData.emailAddress.includes("@")) {
        toast.error("Email should include @");
      }
    } else if (name === "repeatPassword") {
      if (inputData.password !== inputData.repeatPassword) {
        toast.error("Passwords do not match.");
      }
    }
  };

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name } = e.target;
      if (name === "firstName" || name === "lastName") {
        if (/\d/.test(inputData.firstName) || /\d/.test(inputData.lastName)) {
          toast.error(`${name === "firstName" ? "First" : "Last"} name should not contain digits.`);
          return;
        }
      } else if (name === "emailAddress") {
        if (!inputData.emailAddress.includes("@")) {
          toast.error("Email should include @");
          return;
        }
      } else if (name === "repeatPassword") {
        if (inputData.password !== inputData.repeatPassword) {
          toast.error("Passwords do not match.");
        }
      } else{
        const response = await axios.post(`${baseUrl}/auth/signup`, inputData);
        if(response.status === 200){
          toast.success(response.data.message);

          setInputData({
            firstName: "",
            lastName: "",
            emailAddress: "",
            mentalCondition: "",
            country: "",
            state: "",
            password: "",
            repeatPassword: "",
            gender: "",
          });

          navigate('/login')
        }

      }
  
      
    } catch (error) {
      if (error?.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your internet connection", "error")
      }
    }
  };
  
  

    return (
    <>
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
          <form onSubmit={handleSubmit}>
            <h1 className="title">Registration</h1>

            <div className="name">
              <Input
                myInput={{
                  label: "First Name",
                  className: "input",
                  type: "text",
                  placeholder: "Enter your first name",
                  name: "firstName",
                  value: inputData.firstName,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
              <Input
                myInput={{
                  label: "Last Name",
                  className: "input",
                  type: "text",
                  placeholder: "Enter your last name",
                  name: "lastName",
                  value: inputData.lastName,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>

            <div className="name">
              <Input
                myInput={{
                  label: "Email",
                  className: "input",
                  type: "email",
                  placeholder: "Enter your email address",
                  name: "emailAddress",
                  value: inputData.emailAddress,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
              <div class="select-div">
                <h2 className="h2">Mental Condition <span className="opt">(Optional)</span></h2>
                <div class="select">
                  <select name="condition" id="condition" className="select-color">
                    <option value="" disabled selected>
                      Please Select
                    </option>
                    <option value="anxiety-disorder">Anxiety disorder</option>
                    <option value="eating-disorder">Eating disorder</option>
                    <option value="mood-disorder">Mood disorder</option>
                    <option value="personality-disorder">
                      Personality disorder
                    </option>
                    <option value="psychotic-disorder">
                      Psychotic disorder
                    </option>
                    <option value="trauma-stress-disorder">
                      Trauma and stress-related disorder
                    </option>
                    <option value="undiagnosed">Undiagnosed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="name">
              <Input
                myInput={{
                  label: "Country",
                  className: "input",
                  type: "text",
                  placeholder: "Enter your country",
                  name: "country",
                  value: inputData.country,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
              <Input
                myInput={{
                  label: "State/Province",
                  className: "input",
                  type: "text",
                  placeholder: "Enter your state/province of residence",
                  name: "state",
                  value: inputData.state,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>

            <div className="name">
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
              <Input
                myInput={{
                  label: "Confirm Password",
                  className: "input",
                  type: "password",
                  placeholder: "Confirm password",
                  name: "repeatPassword",
                  value: inputData.repeatPassword,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
              />
            </div>
            <div className="radio-group-container">
              <br />
              <label className="radio-label">Gender</label>
              <div className="radio-item">
                <div className="radio-group">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={inputData.gender === "female"}
                    onChange={handleChange}
                    onblur={handleBlur}
                  />
                  <label htmlFor="radio-gender">Female</label>
                </div>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={inputData.gender === "male"}
                    onChange={handleChange}
                    onblur={handleBlur}
                  />
                  <label htmlFor="">Male</label>
                </div>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={inputData.gender === "other"}
                    onChange={handleChange}
                    onblur={handleBlur}
                  />
                  <label htmlFor="">Other</label>
                </div>
                <div className="radio-group">
                  <input
                    type="radio"
                    id="prefer not to say"
                    name="gender"
                    value="prefer not to say"
                    checked={inputData.gender === "prefer not to say"}
                    onChange={handleChange}
                    onblur={handleBlur}
                  />
                  <label htmlFor="">prefer not to say</label>
                </div>
              </div>
            </div>
            <br />
            <button type="submit" className="submit">
              Create account
            </button>
            <div className="account">
              <span className="gray">Already have an account? </span>
              <Link to="/login" className="blues">
                Sign in
              </Link>
            </div>
            <div className="policies-span">
              <span className="gray">
                By creating an account you agree to our{" "}
              </span>
              <span className="blue">Privacy Policies</span>,{" "}
              <span className="gray">and </span>
              <span className="blue">Terms.</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
