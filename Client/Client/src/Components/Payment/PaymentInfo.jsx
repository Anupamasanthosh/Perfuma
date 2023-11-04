import React, { useState } from "react";
import Address from "./Address";

function PaymentInfo() {
  const [selectedAddress,setSelectedAddress]=useState()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-[30px]">
      <div className="">
        <Address setSelectedAddress={setSelectedAddress}/>
      </div>
      <div className="bg-green-600">
        heyyy
      </div>
    </div>
  );
}

export default PaymentInfo;
