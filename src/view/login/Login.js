import React, { useState } from "react";
import "./login.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = () => {
    let axiosConfig = {
      headers: {
        "content-type": "text/json",
      },
    };

    axios
      .post(
        "http://localhost:8080/login",
        {
          tentk: username,
          matkhau: password,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        const user = response.data;
        setTimeout(() => {
          toast.success("Đăng nhập thành công!");
        }, 100);
        props.onLogin(user);
      })
      .catch((error) => {
        toast.error("Kiểm tra lại tên tài khoản và mật khẩu!");
      });
  };

  return (
    <>
      <header className="header-logincs">
        <nav className="navcs">
          <a href="#" className="nav_linkcs">
            <h4>
              QUẢN LÝ BỆNH NHÂN <br />
              BỆNH VIỆN ĐA KHOA VẠN NINH
            </h4>
          </a>
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#" className="nav_linkcs">
                Trang chủ
              </a>
              <a href="#" className="nav_linkcs">
                Thông tin ứng dụng
              </a>
              <a href="#" className="nav_linkcs">
                Liên lạc quản trị viên
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="home-maincs">
        <div className="form_containercs">
          <div className="form login_form">
            <form onSubmit={handleLogin} action="#">
              <h2>ĐĂNG NHẬP</h2>

              <div className="input_boxcs">
                <input
                  type="username"
                  placeholder="Nhập tên tài khoản"
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                  required
                />
                <i className="uil uil-user user"></i>
              </div>
              <div className="input_boxcs">
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                <i className="uil uil-lock password"></i>
              </div>

              <div className="option_fieldcs">
                <span className="checkboxcs">
                  <input type="checkbox" id="check" />
                  <label htmlFor="check">Ghi nhớ đăng nhập</label>
                </span>
                <a href="#" className="forgot_pw">
                  Quên mật khẩu
                </a>
              </div>

              <button className="buttoncs" type="submit">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
