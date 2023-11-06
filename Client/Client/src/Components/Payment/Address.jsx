import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressEdit from "./AddressEdit";
import axios from "../../../Utils/axios";
import {
  addAddress,
  deleteAddress,
  editAddress,
} from "../../../Utils/constants";
import { updateUser } from "../../Redux/AuthReducer";
import { ToastContainer, toast } from "react-toastify";
import { showToastMessageError } from "../../../Utils/toastMsg";

function Address({ setSelectedAddress }) {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.User);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    console.log("hey");
    let errors = {};
    if (!address.street) {
      errors.street = "Street is required";
    }
    if (!address.city) {
      errors.city = "City is required";
    }
    if (!address.state) {
      errors.state = "State needed";
    }
    if (!address.post) {
      errors.post = "post is required";
    } else if (isNaN(address.post)) {
      errors.post = "post must be a number";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDelete = (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("user", user._id);
    axios
      .post(deleteAddress, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.user) {
          dispatch(updateUser(res.data.user));
        }
      });
  };
  const handleSubmit = (e) => {
    if (validateInput()) {
      const formData = new FormData();
      formData.append("street", address.street);
      formData.append("city", address.city);
      formData.append("state", address.state);
      formData.append("post", address.post);
      formData.append("user", user._id);
      formData.append("address", address._id);
      const postUrl = edit ? editAddress : addAddress;
      axios
        .post(postUrl, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.newUser) {
            dispatch(updateUser(res.data.newUser));
            setEdit(false);
            setAddress();
            setShow(!show);
          }
        });
    }
  };
  return (
    <section className="h-auto">
      <ToastContainer />
      {user.address.length !== 0 && !edit ? (
        <div className="p-4 rounded-lg bg-gray-100/5">
          {user.address.map((address, index) => (
            <div
              className="flex flex-row items-center justify-between  p-4 bg-white shadow-lg rounded-2xl border mb-5"
              key={index}
            >
              <div className="flex flex-col items-start">
                <div className="flex flex-col items-center gap-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="w-5 h-5 text-red-600"
                    />
                    <span className="ml-2 text-gray-700">
                      <div className="text-lg">
                        {address.street},{address.city},{address.post},
                        {address.state}
                      </div>
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-between cursor-pointer">
                <div
                  className="ps-4 pe-5"
                  onClick={() => {
                    setEdit(true);
                    setAddress(address);
                    setShow(!show);
                  }}
                >
                  edit
                </div>
                <div
                  className="ps-5 pe-5 cursor-pointer"
                  onClick={() => handleDelete(address._id)}
                >
                  delete
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No address to show Create one to ship</div>
      )}
      <div className="space-y-6 bg-white flex justify-center items-center">
        {!show && (
          <button
            type="button"
            className=" py-2 px-4 mt-5  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
            onClick={() => setShow(!show)}
          >
            Add Address
          </button>
        )}
        {show && (
          <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
            <AddressEdit
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              address={address}
              validationErrors={validationErrors}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Address;
