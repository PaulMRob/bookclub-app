import React, { useState, useContext } from "react";
import AuthForm from "./AuthForm";
import Navbar from "./Navbar";
import { UserContext } from "../context/UserProvider";
import { login } from "../utilities/Authentication/login";
import { useNavigate } from "react-router-dom";
import bookImg from "../constants/imgs/73704.jpg"
import "../css/auth.css"


const initInputs = { username: "", password: "" };

const Auth = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);

  const { signup, errMsg, resetAuthError, setUserState } =
    useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { token, user, error } = await login(inputs);
    if (!error) {
      setUserState((prev) => ({ ...prev, user, token }));
      navigate("/profile");
    }
  }

  function toggleForm() {
    setToggle((prev) => !prev);
    resetAuthError();
  }
  return (
    <div className="auth">
      {/* <Navbar className="navbar" ></Navbar> */}
      <div className="auth-container">
        {!toggle ? (
          <>
            <h3>Start Your Book Club</h3>
            <p className="auth-p-1">join the discussion</p>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText="Sign up"
              errMsg={errMsg}
            />
            <p className="auth-p-2" onClick={toggleForm}>
              Already a member?
            </p>
          </>
        ) : (
          <>
            <h3>Login</h3>
            <p className="auth-p-1">join the discussion</p>
            <AuthForm
              handleChange={handleChange}
              handleSubmit={handleLogin}
              inputs={inputs}
              btnText="Login"
              errMsg={errMsg}
            />
            <p className="auth-p-2" onClick={toggleForm}>
              Not a member?
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
