const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const Category = require("../modals/categoryModal");
module.exports = {
  logIn: async (req, res) => {
    try {
      if (
        req.body.email === "admin@gmail.com" &&
        req.body.password === "Admin@123"
      ) {
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, "mysecret");
        res.status(200).json({ message: "Successfull", token });
      } else {
        res.status({ error: "Invalid Creddentials" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (users) {
        return res.status(200).json({ message: "users data", users });
      } else {
        return res.status(400).json({ err: "no data" });
      }
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  blockUser: async (req, res) => {
    try {
      if (req.body.blocked) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.body._id },
          {
            $set: { blocked: false },
          }
        );
        if (!updatedUser) {
          res.status(400).json({ message: "Not unblocked" });
        }
        res.status(200).json({ message: "unblocked", updatedUser });
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.body._id },
          {
            $set: { blocked: true },
          }
        );
        if (!updatedUser) {
          res.status(400).json({ message: "Not blocked" });
        }
        res.status(200).json({ message: "blocked", updatedUser });
      }
    } catch (err) {
      res.status(500).json({ err: "Something went wrong" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndDelete({ _id: req.body._id });
      if (updatedUser) {
        return res.status(200).json({ message: "User deleted", updatedUser });
      } else {
        return res.status(400).json({ message: "User not updated" });
      }
    } catch {
      res.status(500).json({ err: "Something went wrong" });
    }
  },
  addCategory: async (req, res) => {
    try {
      console.log("heooooo");
      const categoryExist = await Category.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
      });
      {
        if (categoryExist) {
          return res.status(400).json({ err: "Category Exist" });
        } else {
          Category.create({
            name: req.body.name,
            description: req.body.des,
            image: req.file.path,
          })
            .then((cat) => {
              return res.status(200).json({ message: "Category Added", cat });
            })
            .catch((err) => {
              return res.status(500).json({ message: "Somwthing happend" });
            });
        }
      }
    } catch {}
  },
  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      if (categories) {
        res.status(200).json({ message: "found", categories });
      } else {
        res.status(400).json({ message: "not found" });
      }
    } catch {
      res.status(500).json({ message: "something went wrong" });
    }
  },
  editCategory: async (req, res) => {
    try {
      const id=req.body.id
        const UpdatedCategory = await Category.findById({_id:id});
        if (!UpdatedCategory) {
          return res.status(400).json({ message: "no data" });
        }
        UpdatedCategory.name = req.body.name;
        UpdatedCategory.description = req.body.des;
        if (req.file) {
          UpdatedCategory.image = req.file.path;
        }
        const newCat = await UpdatedCategory.save();
        return res.status(200).json({ message: "updated", newCat });

    } catch(err) {
      console.log(err)
      return res.status(500).json({ message: "something went wrong" ,err});
    }
  },
  deleteCategory:async(req,res)=>
  {
    try
    {
      console.log(req.body,'bodyyy')
      const updatedCat = await Category.findByIdAndDelete({ _id: req.body._id });
      if(updatedCat)
      {
        return res.status(200).json({message:'Deleted',updatedCat})
      }
      else
      {
        return res.status(400).json({message:'not updated'})
      }
    }
    catch{
      return res.status(500).json({message:'something went wrong'})
    }
  }
};
