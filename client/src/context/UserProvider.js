import React, { useState } from "react";
import axios from "axios";
import userAxios from "../utilities/userAxios";

export const UserContext = React.createContext();

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    bookposts: [],
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);
  const [allBookposts, setAllBookposts] = useState([]);

  function signup(credentials) {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevState) => ({ ...prevState, user, token }));
      })
      .catch((err) => handleAuthError(err.response.data.errMsg));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      bookposts: [],
    });
  }

  function handleAuthError(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthError() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  // function getAllBookposts() {
  //   userAxios
  //     .get("/api/bookpost")
  //     .then((res) => setAllBookposts(res.data))
  //     .catch((err) => console.log(err));
  // }

  function addBookpost(newBookpost) {
    userAxios
      .post("/api/bookpost", newBookpost)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          bookposts: [...prevState.bookposts, res.data],
        }));
        setAllBookposts((prevPosts) => [...prevPosts, res.data]);
      })
      .catch((err) => console.log(err.resposne.data.errMsg));
  }

  return (
    <UserContext.Provider
      value={{
        setUserState,
        ...userState,
        signup,
        logout,
        addBookpost,
        resetAuthError,
        userAxios,
        allBookposts,
        setAllBookposts,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
