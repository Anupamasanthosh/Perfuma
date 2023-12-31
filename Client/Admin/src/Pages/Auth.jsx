import React from "react";
import { useState } from "react";
import Form from "../Components/Auth/Form";
import { loginPost } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAdmin } from "../Redux/adminReducer";
import { showToastMessage, showToastMessageError } from "../utils/toast";

function Auth() {
  const [adminData, setAdminData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    axios
      .post(loginPost, adminData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.token) {
          showToastMessage(res.data.message)
          localStorage.setItem("AdminToken", res.data.token);
          dispatch(setAdmin(adminData));
          navigate("/dash");
        }
        else
        {
          showToastMessageError(res.data.error)
        }
      })
      .catch(() => {
        showToastMessageError(res.data.error)
      });
  };
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">Welcome.</p>
          <ToastContainer />
          <Form handleChange={handleChange} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src="https://i.pinimg.com/736x/1c/de/34/1cde346c7f4c8a11e733766e68b87fb7.jpg"
        />
      </div>
    </div>
  );
}

export default Auth;
