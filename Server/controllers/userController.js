const express = require("express");
require("dotenv").config();
const User = require("../modals/userModal");
const Category = require("../modals/categoryModal");
const Brand = require("../modals/brandModal");
const Product = require("../modals/productModal");
const Cart = require("../modals/cartModal");
const Order = require("../modals/orderModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    try {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        return res.json({ message: "User exist" });
      } else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        User.create(req.body)
          .then((user) => {
            return res.status(200).json({ message: "User created", user });
          })
          .catch((err) => {
            return res.status(500).json({ message: err });
          });
      }
    } catch {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  login: async (req, res) => {
    try {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        const validPass = await bcrypt.compare(
          req.body.password,
          userExist.password
        );
        if (validPass) {
          if (userExist.blocked) {
            res.json({ message: "user blocked" });
          } else {
            const payload = {
              email: userExist.email,
            };
            const token = jwt.sign(payload, "mysecret");
            res.status(200).json({ message: "Succesfull", userExist, token });
          }
        } else {
          res.json({ message: "Invalid credentials" });
        }
      } else {
        res.json({ message: "No User" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      const brands = await Brand.find();
      if (brands || categories) {
        return res.status(200).json({ message: "success", brands, categories });
      } else {
        res.status(400).json({ message: "not get" });
      }
    } catch {
      res.status(500).json({ message: "error" });
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      if (products) {
        return res.status(200).json({ message: "get", products });
      } else {
        return res.status(400).json({ message: "not get" });
      }
    } catch {
      return res.status(500).json({ message: "error" });
    }
  },
  addCartProducts: async (req, res) => {
    try {
      const { user, cart } = req.body;
      const userObj = JSON.parse(user);
      const cartItems = JSON.parse(cart);
      const existingCart = await Cart.findOne({ user: userObj._id });
      console.log(existingCart, "exist");
      if (existingCart) {
        for (const item of cartItems) {
          const existingProduct = existingCart.products.find(
            (product) => product.product.toString() === item.productId
          );
          if (existingProduct) {
            existingProduct.quantity += item.quantity;
          } else {
            existingCart.products.push({
              product: item.productId,
              quantity: item.quantity,
            });
          }
        }
        const updatedCart = await existingCart.save();
        res.status(200).json({
          message: "Items added to cart successfully",
          cart: updatedCart,
        });
      } else {
        const newCart = new Cart({
          user: userObj._id,
          products: cartItems.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
        });
        const updatedCart = await newCart.save();

        res.status(200).json({
          message: "Items added to cart successfully",
          cart: updatedCart,
        });
      }
    } catch {
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  addToCart: async (req, res) => {
    try {
      const userCart = await Cart.findOne({ user: req.body.user });
      console.log(userCart);
      if (userCart) {
        const itemExist = userCart.products.find(
          (item) => item.product.toString() === req.body.product
        );
        if (itemExist) {
          itemExist.quantity += 1;
        } else {
          let product = req.body.product;
          userCart.products.push({
            product,
            quantity: 1,
          });
        }
        const newCart = await userCart.save();
        res.status(200).json({ message: "added", cart: newCart });
      } else {
        const newCart = new Cart({
          user: req.body.user,
          products: [{ product: req.body.product, quantity: 1 }],
        });
        const cart = await newCart.save();
        res.status(200).json({ message: "cart added", cart: cart });
      }
    } catch {}
  },
  getCart: async (req, res) => {
    try {
      const cartItems = await Cart.findOne({ user: req.query.user });
      if (cartItems) {
        const cartItem = cartItems.products;
        res.status(200).json({ message: "get", cartItem });
      } else {
        res.json({ message: "no cart" });
      }
    } catch {}
  },
  deleteCart: async (req, res) => {
    try {
      const deleteCart = await Cart.findOneAndDelete({ user: req.body._id });
      if (deleteCart) {
        res.status(200).json({ message: "deleted", deleteCart });
      } else {
        res.status(400).json({ message: "not found" });
      }
    } catch {}
  },
  deleteItem: async (req, res) => {
    try {
      const userCart = await Cart.findOne({ user: req.body.user });
      if (userCart) {
        userCart.products = userCart.products.filter(
          (product) => product.product.toString() !== req.body.item
        );
        const newCart = await userCart.save();
        return res.status(200).json({ message: "Deleted", newCart });
      } else {
        res.status(400).json({ message: "no cart" });
      }
    } catch {}
  },
  addQuantity: async (req, res) => {
    try {
      const userCart = await Cart.findOne({ user: req.body.user });
      if (userCart) {
        const itemIndex = userCart.products.findIndex(
          (product) => product.product.toString() === req.body.item
        );
        if (itemIndex !== -1) {
          userCart.products[itemIndex].quantity += 1;
        }
        const newCart = await userCart.save();
        return res.status(200).json({ message: "incremented", newCart });
      } else {
        return res.status(400).json({ message: "not get" });
      }
    } catch {}
  },
  minusQuantity: async (req, res) => {
    try {
      const userCart = await Cart.findOne({ user: req.body.user });
      if (userCart) {
        const itemIndex = userCart.products.findIndex(
          (product) => product.product.toString() === req.body.item
        );
        if (itemIndex !== -1) {
          userCart.products[itemIndex].quantity -= 1;
          if (userCart.products[itemIndex].quantity <= 0) {
            userCart.products.splice(itemIndex, 1);
          }
        }
        const newCart = await userCart.save();
        return res.status(200).json({ message: "decremented", newCart });
      } else {
        return res.status(400).json({ message: "not get" });
      }
    } catch {}
  },
  addAddress: async (req, res) => {
    try {
      const { state, city, street, post } = req.body;
      const userExist = await User.findById({ _id: req.body.user });
      if (!userExist) {
        return res.status(404).json({ message: "User not found" });
      }
      const newAddress = {
        state,
        city,
        street,
        post,
      };
      userExist.address.push(newAddress);
      const newUser = await userExist.save();
      if (newUser) {
        return res.status(200).json({ message: "addded", newUser });
      } else {
        return res.status(400).json({ message: "not added" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  editAddress: async (req, res) => {
    try {
      console.log(req.body);
      const edited = await User.findOneAndUpdate(
        { _id: req.body.user, "address._id": req.body.address },
        {
          $set: {
            "address.$.street": req.body.street,
            "address.$.city": req.body.city,
            "address.$.state": req.body.state,
            "address.$.post": req.body.post,
          },
        },
        { new: true }
      );
      if (edited) {
        return res.status(200).json({ newUser: edited });
      } else {
        return res.status(400).json({ message: "not edited" });
      }
    } catch (err) {}
  },
  deleteAddress: async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.user },
        {
          $pull: { address: { _id: req.body.id } },
        },
        { new: true }
      );
      if (user) {
        return res.status(200).json({ message: "deleted", user });
      } else {
        return res.status(400).json({ message: "not deleted" });
      }
    } catch (err) {}
  },
  proceedOrder: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.body.user });
      if (user) {
        const cartItems = await Cart.findOne({ user: req.body.user });
        if (cartItems) {
          const orderProducts = cartItems.products.map((item) => ({
            product: item.product,
            quantity: item.quantity,
          }));
          const newOrder = {
            user: req.body.user,
            products: orderProducts,
            address: req.body.address,
          };
          const order = await Order.create(newOrder);
          if (order) {
            const newCart = await Cart.deleteOne({ user: req.body.user });
            console.log(newCart);
            return res
              .status(200)
              .json({ message: "order created and cart deleted" ,newOrder});
          } else {
            return res.status(400).json({ message: "not created" });
          }
        }
      }
    } catch {
       
    }
  },
};
