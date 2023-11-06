import React, { useState } from "react";
import Address from "./Address";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

function PaymentInfo({setSelectedAddress}) {
  
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

  const slicedCart = cartItemsWithDetails.slice(0, 1);
  console.log(slicedCart, "sclied");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-[30px]">
      <div className="">
        <Address setSelectedAddress={setSelectedAddress} />
      </div>
      <div className="">
        <div className="text-center">Order Details</div>
        <div class="col-span-1 bg-white lg:block hidden">
          <ul class="py-6 border-b space-y-6 px-8 overflow-y-auto overflow-x-hidden h-[220px] scroll-snap-y-start">
            {fullCart
              ? cartItemsWithDetails.map((cart, index) => (
                  <CartItems cartItems={cart} key={index} />
                ))
              : slicedCart.map((cart, index) => (
                  <CartItems cartItems={cart} key={index} />
                ))}
            {cartItemsWithDetails.length > 1 && (
              <button onClick={() => setFullCart(!fullCart)}>
                {fullCart ? "Hide" : "More"}
              </button>
            )}
          </ul>
          <div class="px-8 border-b">
            <div class="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span class="font-semibold text-pink-500">€{totalAmount}</span>
            </div>
            <div class="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span class="font-semibold text-pink-500">Free</span>
            </div>
          </div>
          <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>€{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentInfo;
