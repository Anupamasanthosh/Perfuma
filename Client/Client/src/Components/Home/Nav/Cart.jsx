import React, { useEffect } from "react";
import { GrClose, GrAdd, GrFormSubtract } from "react-icons/gr";
import axios from "../../../../Utils/axios";
import { Link } from "react-router-dom";
import {
  addQuantity,
  deleteItem,
  minusQuantity,
} from "../../../../Utils/constants";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../../../../Utils/toastMsg";

function Cart({ item, user }) {
  const formData = new FormData();
  formData.append("user", user._id);
  const handleDelteItem = (id) => {
    formData.append("item", id);
    axios
      .post(deleteItem, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        showToastMessage(res.data.message);
      });
  };
  const handleAdd = (id) => {
    formData.append("item", id);
    axios
      .post(addQuantity, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
      });
  };
  const handleMinus = (id) => {
    formData.append("item", id);
    axios
      .post(minusQuantity, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {});
  };
  useEffect(() => {}, [handleAdd, handleMinus]);

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${item._id}`}>
          <img
            src={item.image}
            alt="product image"
            className="max-w-[80px]"
          />
        </Link>
        <ToastContainer />
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${item._id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {item.name}
            </Link>
            <div className="text-xl cursor-pointer">
              <GrClose
                className="text-gray-500 hover:text-red-500 transition"
                onClick={() => handleDelteItem(item._id)}
              />
            </div>
          </div>
          <div className=" flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div className="flex-1 flex justify-center items-center cursor-pointer">
                <GrFormSubtract onClick={() => handleMinus(item._id)} />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {item.quantity}
              </div>
              <div className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <GrAdd onClick={() => handleAdd(item._id)} />
              </div>
            </div>
            <div className="flex-1 flex justify-around items-cente">
              $ {item.price}
            </div>
            <div className="flex-1 flex justify-end items-center text-red-300 font-medium">{`$ ${parseFloat(
              item.price * item.quantity
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
