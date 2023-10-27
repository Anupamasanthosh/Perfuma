const express = require("express");
require("dotenv").config();
const User = require("../modals/userModal");
const Category=require('../modals/categoryModal')
const Brand=require('../modals/brandModal')
const Product=require('../modals/productModal')
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
          if(userExist.blocked)
          {
            res.json({message:'user blocked'})
          }else
          {
            const payload = {
              email: userExist.email,
            };
            const token = jwt.sign(payload,'mysecret')
            res.status(200).json({ message: "Succesfull", userExist, token });
          }
          
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
  getCategory:async(req,res)=>
  {
    try
    {
      const categories=await Category.find()
      const brands=await Brand.find()
      if(brands||categories)
      {
        return res.status(200).json({message:'success',brands,categories})
      }
      else
      {
        res.status(400).json({message:'not get'})
      }
    }
    catch{
      res.status(500).json({message:'error'})
    }
  },
  getProducts:async (req,res)=>
  {
    try{
      const products=await Product.find().sort({createdAt:-1})
      if(products)
      {
        return res.status(200).json({message:'get',products})
      }
      else
      {
        return res.status(400).json({message:'not get'})
      }
    }
    catch{
      return res.status(500).json({message:'error'})
    }
  }
};
