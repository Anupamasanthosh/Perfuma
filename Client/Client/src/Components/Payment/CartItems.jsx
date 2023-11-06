import React from "react";

function CartItems({ cartItems }) {
  console.log(cartItems, "from cart");
  return (
    <li class="grid grid-cols-6 gap-2 border-b-1">
      <div class="col-span-1 self-center">
        <img
          src={cartItems.image}
          alt="Product"
          class="rounded w-full"
        />
      </div>
      <div class="flex flex-col col-span-3 pt-2">
        <span class="text-gray-600 text-md font-semi-bold">
          {cartItems.name}
        </span>
        <span class="text-gray-400 text-sm inline-block pt-2">
          Red Headphone
        </span>
      </div>
      <div class="col-span-2 pt-3">
        <div class="flex items-center space-x-2 text-sm justify-between">
          <span class="text-gray-400">{cartItems.quantity} x {cartItems.price}</span>
          <span class="text-pink-400 font-semibold inline-block">€{cartItems.quantity*cartItems.price}</span>
        </div>
      </div>
    </li>
  );
}

export default CartItems;
