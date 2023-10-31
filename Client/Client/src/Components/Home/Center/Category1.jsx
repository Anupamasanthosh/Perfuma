import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from '../../../../Utils/axios'
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../Utils/constants";
import { showToastMessage, showToastMessageError } from "../../../../Utils/toastMsg";


function Category1({ products }) {
  const user = useSelector((state) => state.Auth.User)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleCart = (product) => {
    if (!user) {
      showToastMessageError('Login Here')
      navigate('/auth')
     }
     else
     {
      const formData=new FormData()
      formData.append('product',product)
      formData.append('user',user._id)
      axios.post(addToCart,formData,{
        headers: { "Content-Type": "application/json" },
      }).then((res)=>
      {
        if(res.data.cart)
        {
          showToastMessage(res.data.message)
        }
      })
     }

  };
  return (
    <div>
      <ToastContainer />
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              src={products.image[0]}
              alt=""
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <FaPlus
                className="text-xl"
                onClick={() => handleCart(products._id)}
              />
            </div>
          </button>
          <Link
            to={`/product/${products._id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <FaEye className="text-xl" />
          </Link>
        </div>
      </div>
      <div>
        <div className="font-semibold capitalize text-gray-500 mb-1">
          {products.name}
        </div>
        <h2 className="text-sm mb-1">{products.description}</h2>
        <div className="font-semibold">$ {products.price}</div>
      </div>
    </div>
  );
}

export default Category1;
