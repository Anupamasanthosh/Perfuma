const mongoose = require("mongoose");
const User = require("../modals/userModal");
const Products = require("../modals/productModal");

const Cart = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Products,
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  {
    collection: "Cart",
  }
);
const model = mongoose.model("Cart", Cart);
module.exports = model;
