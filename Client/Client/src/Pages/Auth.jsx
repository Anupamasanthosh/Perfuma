import React, { useState } from "react";
import Form from "../Components/Auth/Form";
import axios from "../../Utils/axios";
import { loginPost, signUpPost } from "../../Utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage, showToastMessageError } from "../../Utils/toastMsg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/AuthReducer";

function Auth() {
  const [userData, setUserData] = useState();
  const [signUp, setSignUp] = useState(false);

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    if (signUp) {
      console.log("heyyy");
      axios
        .post(signUpPost, userData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          if (res.data.user) {
            showToastMessage(res.data.message);
            setSignUp(false);
          } else {
            showToastMessageError(res.data.message);
          }
        })
        .catch((err) => {
          showToastMessageError(err);
        });
    } else {
      axios.post(loginPost, userData, {
        headers: { "Content-Type": "application/json" },
      }).then((res)=>
      {
        localStorage.setItem('token',res.data.token)
        dispatch(setUser(res.data.userExist))
        showToastMessage(res.data.message)
        navigate('/')
      })
    }
  };
  

  return (
    <div>
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Welcome.</p>
            <Form
              handleChange={handleChange}
              onSubmit={onSubmit}
              signUp={signUp}
            />
            <ToastContainer />
            <div className="pt-12 pb-12 text-center">
              <p>
                {signUp ? "Already have an account?" : " Dont have an account?"}
                <a
                  onClick={() => setSignUp(!signUp)}
                  className="font-semibold underline"
                >
                  {signUp ? "Login Here" : "Signup Here"}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src="https://i.pinimg.com/736x/1c/de/34/1cde346c7f4c8a11e733766e68b87fb7.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
