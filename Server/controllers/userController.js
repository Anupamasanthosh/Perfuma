const express = require("express");
require("dotenv").config();
const User = require("../modals/userModal");
const jwt=require('jsonwebtoken')
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
          const payload = {
            email: userExist.email,
          };
          const token = jwt.sign(payload,'mysecret')
          res.status(200).json({ message: "Succesfull", userExist, token });
        } else {
          res.json({ message: "Invalid credentials" });
        }
      } else {
        res.json({ message: "No User" });
      }
    } catch(err) {
        res.status(500).json({message:err})
    }
  },
};
