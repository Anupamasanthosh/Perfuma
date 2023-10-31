import React, { useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GrFormTrash } from "react-icons/gr";
import axios from "../../../../Utils/axios";
import Cart from "./Cart";
import { cartGet, deleteAllCart } from "../../../../Utils/constants";
import { deleteCart, setCart } from "../../../Redux/CartReducer";
import { useNavigate } from "react-router-dom";

function SideNav({ open, toggleSideNav }) {
  const products = useSelector((state) => state.Home.Products);
  const user = useSelector((state) => state.Auth.User);
  const cart = useSelector((state) => state.Cart.Cart);
  let totalAmount = 0;

  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    if (user) {
      axios.get(`${cartGet}?user=${user._id}`).then((res) => {
        if (res.data.cartItem) {
          dispatch(setCart(res.data.cartItem));
        } else {
          dispatch(deleteCart());
        }
      });
    }
  }, [cart, dispatch]);

  const cartItemsWithDetails = cart.map((cartItem) => {
    const productDetails = products.find(
      (product) => product._id === cartItem.product
    );
    if (productDetails) {
      const itemPrice = productDetails.price * cartItem.quantity;
      totalAmount += itemPrice;
    }
    return {
      ...productDetails,
      quantity: cartItem.quantity,
    };
  });

  const handleDelete = () => {
    console.log("hey");
    axios
      .post(deleteAllCart, user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data, "from hehe");
        if (res.data.cartItem) {
          dispatch(deleteCart());
        }
      });
  };
  const handlePayment=()=>
  {
    navigate('/payment')
  }
  return (
    <div
      className={`${
        open ? "right-0" : "-right-full"
      } w-full  bg-white fixed top-[0px] h-full shadow-2xl md:w-[35vw] transition-all duration-500 ease-in-out z-20 px-4 lg:px-[35px]`}
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">shopping bag</div>
        <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
          <IoMdArrowForward className="text-2xl" onClick={toggleSideNav} />
        </div>
      </div>

      <div>
        {cartItemsWithDetails.map((cart, index) => {
          return <Cart item={cart} user={user} key={index} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {totalAmount}
          </div>
          <div className="cursor-pointer py-4 text-white w-12 h-12 flex justify-center items-center text-xl">
            <GrFormTrash onClick={handleDelete} />
          </div>
        </div>
        <div className="flex justify-center items-center">
        <button
          className="bg-gray-600 text-white py-2 px-4 rounded-md w-[200px]"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
