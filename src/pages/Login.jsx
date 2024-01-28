// src/components/Login.js
import axios from "axios";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Card from "./Card/Card";
import "./LoginForm.css";
const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({});
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const errors = {
    username_pass: "ຊື່ ຫຼື ລະຫັດ ບໍ່ຖືກຕ້ອງ",
    noUsername: "ກະລຸນາ ປ້ອນຊື່ຜູ້ໃຊ້",
    noPassword: "ກະລຸນາ ປ້ອນລະຫັດຜ່ານ",
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.username) {
      // Username input is empty 
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }
    if (!data.password) {
      // Password input is empty
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }
    try {
      const url = "https://soukphasone.onrender.com/login";
      const { data: res } = await axios.post(url, data)
      localStorage.setItem("token", res.data);
      localStorage.setItem("token3", res.data._id);
      localStorage.setItem("token1", res.accessToken);
      window.location = "/";
      console.log(res.data);
    } catch (error) {
      setErrorMessages({
        name: "username_pass",
        message: errors.username_pass,
      });
      console.error("Error:", error);
    }
  };
  //
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );
  return (
    <Card>
      <h1 className="title">ລ໋ອກອິນ</h1>
      <h3 className="subtitle">ລະບົບຈັດການເກັບປີ້ລົດ</h3>
      <form onSubmit={handleLogin}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="ຊື່"
            name="username"
            onChange={handleChange}
            value={data.email}
          />
          {renderErrorMsg("noUsername")}
          <input
            type="password"
            placeholder="ລະຫັດ"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
          {renderErrorMsg("username_pass")}
          {renderErrorMsg("noPassword")}
        </div>
        <input type="submit" value="ເຂົ້າສຸ່ລະບົບ" className="login_button" />
      </form>
      <div className="link_container">
        <a href="" className="small">
          ລືມລະຫັດ?
        </a>
      </div>
      <div className="icons">
        <GoogleIcon className="icon" />
        <FacebookIcon className="icon" />
        <TwitterIcon className="icon" />
      </div>
    </Card>
  );
};

export default Login;
