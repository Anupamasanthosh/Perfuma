import React, { useState } from "react";
import Nav from "../Components/Home/Nav/Nav";
import SideNav from "../Components/Home/Nav/SideNav";
import PaymentInfo from "../Components/Payment/PaymentInfo";

function Payment() {
  const [open, setOpen] = useState(false);
  const toggleSideNav = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header>
        <Nav toggleSideNav={toggleSideNav} />
      </header>
      <main className="flex-1 overflow-y-auto container px-5 py-5">
        <div className="flex px-5 py-5 justify-center items-center text-xl font-semibold capitalize">
            payment Details
        </div>
        <div>
          <PaymentInfo />
        </div>
      </main>
      <footer className="bg-gray-300 py-4 text-center">
        &copy; 2023 Perfuma
      </footer>
      {open && <SideNav open={open} toggleSideNav={toggleSideNav} />}
    </div>
  );
}

export default Payment;
