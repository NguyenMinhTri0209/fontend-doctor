import React, { useState, useEffect, Fragment } from "react";
import Login from "./view/login/Login.js";
import MainApp from "./view/mainApp/main.js";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLogin, setUser] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user) => {
    // Xử lý logic đăng nhập
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <Route
              path="/"
              element={<MainApp onLogout={handleLogout} user={userLogin} />}
            />
          ) : (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
