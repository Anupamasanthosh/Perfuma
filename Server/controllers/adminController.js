const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const Category = require("../modals/categoryModal");
const Brand = require("../modals/brandModal");
const Product = require("../modals/productModal");
const mongoose = require("mongoose");
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
        res.json({ error: "Invalid Creddentials" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
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
      res.status(500).json({ message: "Something went wrong" });
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
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  addCategory: async (req, res) => {
    try {
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
              console.log(cat);
              return res.status(200).json({ message: "Category Added", cat });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ message: "Somwthing happend" });
            });
        }
      }
    } catch (err) {
      console.log(err);
    }
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
      const id = req.body.id;
      const UpdatedCategory = await Category.findById({ _id: id });
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
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "something went wrong", err });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      console.log(req.body, "bodyyy");
      const updatedCat = await Category.findByIdAndDelete({
        _id: req.body._id,
      });
      if (updatedCat) {
        console.log(req.body._id);
        const productsToDelete = await Product.find({ category: req.body._id });
        for (const product of productsToDelete) {
          await Product.findByIdAndDelete(product._id);
        }
        const brandsToDelete = await Brand.find({ category: req.body._id });
        for (const brand of brandsToDelete) {
          await Brand.findByIdAndDelete(brand._id);
        }

        return res.status(200).json({ message: "Deleted", updatedCat });
      } else {
        return res.status(400).json({ message: "not updated" });
      }
    } catch {
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  addBrand: async (req, res) => {
    try {
      const brandExist = await Brand.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
      });
      if (brandExist) {
        return res.status(400).json({ message: "Brand already exists" });
      }

      const categoryName = await Category.findById(req.body.cat);
      const brandData = {
        name: req.body.name,
        description: req.body.des,
        category: categoryName._id,
      };

      if (req.file) {
        brandData.image = req.file.path;
      }

      const createdBrand = await Brand.create(brandData);

      res.status(200).json({
        message: "Brand added",
        newBrand: createdBrand,
        categoryName,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error" });
    }
  },

  getbrand: async (req, res) => {
    try {
      const brands = await Brand.find().populate("category");
      if (brands) {
        return res.status(200).json({ message: "brands get", brands });
      } else {
        return res.status(400).json({ message: "not get" });
      }
    } catch {
      res.status(500).json({ message: "error" });
    }
  },
  editBrand: async (req, res) => {
    try {
      const updatedBrand = await Brand.findById({ _id: req.body.id });
      if (!updatedBrand) {
        return res.status(400).json({ message: "not updated" });
      }
      const categoryId = req.body.cat;
      updatedBrand.name = req.body.name;
      updatedBrand.description = req.body.des;
      updatedBrand.category = categoryId;
      if (req.file) {
        updatedBrand.image = req.file.path;
      }

      const newBrand = await updatedBrand.save();
      return res
        .status(200)
        .json({ message: "brand edited succesfully", newBrand });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error" });
    }
  },
  deleteBrand: async (req, res) => {
    try {
      const updatedBrand = await Brand.findByIdAndDelete({
        _id: req.body._id,
      });
      if (updatedBrand) {
        const productsToDelete = await Product.find({ brand: req.body._id });
        for (const product of productsToDelete) {
          await Product.findByIdAndDelete(product._id);
        }

        return res.status(200).json({ message: "Deleted", updatedBrand });
      } else {
        return res.status(400).json({ message: "not updated" });
      }
    } catch (err) {
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  addproduct: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.files);
      const productExist = await Product.findOne({
        name: { $regex: new RegExp(`^${req.body.name}$`, "i") },
      });
      if (productExist) {
        return res.status(400).json({ message: "Product exist" });
      }

      const categoryName = await Category.findById(req.body.cat);
      const brandName = await Brand.findById(req.body.brand);
      const productData = {
        name: req.body.name,
        description: req.body.des,
        category: categoryName._id,
        brand: brandName._id,
        stock: req.body.stock,
      };
      if (req.files) {
        productData.image = req.files.map((file) => file.path);
      }

      const createProduct = await Product.create(productData);
      res.status(200).json({
        message: "Product added",
        createProduct,
        categoryName,
        brandName,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error" });
    }
  },
  editProduct: async (req, res) => {
    try {
      console.log(req.body, "noooo");
      const id = req.body.id;
      const updatedProduct = await Product.findById({ _id: id });
      if (!updatedProduct) {
        return res.status(400).json({ message: "not updated" });
      }
      updatedProduct.name = req.body.name;
      updatedProduct.description = req.body.des;
      updatedProduct.category = req.body.cat;
      updatedProduct.brand = req.body.brand;
      updatedProduct.stock = req.body.stock;
      if (req.file) {
        updatedProduct.image = req.files.map((file) => file.path);
      }
      const newProduct = await updatedProduct.save();
      console.log(newProduct);
      return res
        .status(200)
        .json({ message: "Product edited succesfully", newProduct });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndDelete({
        _id: req.body._id,
      });
      if (updatedProduct) {
        return res.status(200).json({ message: "Deleted", updatedProduct });
      } else {
        return res.status(400).json({ message: "not updated" });
      }
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("category")
        .populate("brand");
      if (products) {
        return res.status(200).json({ message: "product get", products });
      } else {
        res.status(400).json({ message: "not found" });
      }
    } catch {
      res.status(500).json({ message: "something went wrong" });
    }
  },
};
