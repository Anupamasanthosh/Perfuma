import React, { useState } from "react";
import Address from "./Address";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

function PaymentInfo() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [fullCart, setFullCart] = useState(false);

  const cart = useSelector((state) => state.Cart.Cart);
  const products = useSelector((state) => state.Home.Products);

  let totalAmount = 0;

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

  const slicedCart = cartItemsWithDetails.slice(0, 2);
  console.log(slicedCart, "sclied");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-[30px]">
      <div className="">
        <Address setSelectedAddress={setSelectedAddress} />
      </div>
      <div className="bg-green-600">
        <div className="flex flex-col items-center justify-center w-full h-auto mx-auto bg-white rounded-lg shadow ">
          <ul className="container flex flex-col divide-y divide w-full overflow-y-auto h-[400px] scroll-snap-y-start">
            {fullCart
              ? cartItemsWithDetails.map((cart, index) => (
                  <CartItems cartItems={cart} key={index} />
                ))
              : slicedCart.map((cart, index) => (
                  <CartItems cartItems={cart} key={index} />
                ))}
            {cartItemsWithDetails.length>2 && <button onClick={() => setFullCart(!fullCart)}>
              {fullCart ? "Hide" : "More"}
            </button>
              }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
