import React, { useState } from "react";
import Nav from "../Components/Home/Nav/Nav";
import SideNav from "../Components/Home/Nav/SideNav";
import PaymentInfo from "../Components/Payment/PaymentInfo";
import axios from "../../Utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { proceedOrder } from "../../Utils/constants";
import { Link } from "react-router-dom";
import { deleteCart } from "../Redux/CartReducer";

function Payment() {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [show, setShow] = useState(false);
  const toggleSideNav = () => {
    setOpen(!open);
  };

  const { User } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("user", User._id);
    formData.append("address", selectedAddress);
    axios
      .post(proceedOrder, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.newOrder) {
          setShow(true);
          dispatch(deleteCart());
        }
      });
  };
  console.log(selectedAddress, "selecyed addresss");
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header>
        <Nav toggleSideNav={toggleSideNav} />
      </header>

      <main className="flex-1 overflow-y-auto container px-5 py-5">
        {!show ? (
          <div>
            <div className="flex px-5 py-5 justify-center items-center text-xl font-semibold capitalize">
              Order Summary
            </div>
            <div>
              <PaymentInfo setSelectedAddress={setSelectedAddress} />
            </div>
            {selectedAddress && (
              <div className="flex justify-center">
                <button
                  className="bg-gray-600 text-white py-2 px-4 rounded-md w-[200px]"
                  onClick={handleSubmit}
                >
                  Proceed
                </button>
              </div>
            )}
          </div>
        ) : (
          <div class="relative w-full h-[500px] p-4 m-auto rounded-2xl">
            <div class="w-full h-full text-center">
              <div class="flex flex-col justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="w-20 h-20 m-auto mt-4 text-black dark:black"
                  viewBox="0 0 2048 1792"
                >
                  <path d="M1920 768q53 0 90.5 37.5t37.5 90.5-37.5 90.5-90.5 37.5h-15l-115 662q-8 46-44 76t-82 30h-1280q-46 0-82-30t-44-76l-115-662h-15q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5h1792zm-1435 800q26-2 43.5-22.5t15.5-46.5l-32-416q-2-26-22.5-43.5t-46.5-15.5-43.5 22.5-15.5 46.5l32 416q2 25 20.5 42t43.5 17h5zm411-64v-416q0-26-19-45t-45-19-45 19-19 45v416q0 26 19 45t45 19 45-19 19-45zm384 0v-416q0-26-19-45t-45-19-45 19-19 45v416q0 26 19 45t45 19 45-19 19-45zm352 5l32-416q2-26-15.5-46.5t-43.5-22.5-46.5 15.5-22.5 43.5l-32 416q-2 26 15.5 46.5t43.5 22.5h5q25 0 43.5-17t20.5-42zm-1156-1217l-93 412h-132l101-441q19-88 89-143.5t160-55.5h167q0-26 19-45t45-19h384q26 0 45 19t19 45h167q90 0 160 55.5t89 143.5l101 441h-132l-93-412q-11-44-45.5-72t-79.5-28h-167q0 26-19 45t-45 19h-384q-26 0-45-19t-19-45h-167q-45 0-79.5 28t-45.5 72z"></path>
                </svg>
                <p class="text-sm italic text-black">
                  Items Ordered
                </p>
                <p class="mt-4 text-lg text-black">Your order placed</p>
                <p class="px-6 py-2 text-xs font-thin text-black">
                  Your package will delivered in 1 day and 4 hours by our postal
                  partner
                </p>
                <div className="flex items-center justify-center p-5">
                <p class="px-6 py-2 text-lg font-bold text-black border justify-center w-[200px] cursor-pointer">
                  <Link to='/'>Continue Shopping</Link>
                </p>
                </div>
                
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-300 py-4 text-center">
        &copy; 2023 Perfuma
      </footer>
      {open && <SideNav open={open} toggleSideNav={toggleSideNav} />}
    </div>
  );
}

export default Payment;
