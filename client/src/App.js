import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserProvider";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Public from "./components/Public";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const { token, logout, redirectTo, allBookposts } = useContext(UserContext);

  return (
    <div className="App">
      {/* <Navbar logout={logout} token={token} /> */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Public allBookposts={allBookposts} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
