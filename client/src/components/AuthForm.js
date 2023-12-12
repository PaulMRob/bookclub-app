import React from "react";
import bookImg from "../constants/imgs/73704.jpg"
import "../css/auth-form.css"

const AuthForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: { username, password },
  } = props;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="@username"
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="password"
      />
      <button className="auth-form-btn">{btnText}</button>
      <p style={{ color: "red" }}>{errMsg}</p>
      <img className="book-img" src={bookImg} />
    </form>
  );
};

export default AuthForm;
