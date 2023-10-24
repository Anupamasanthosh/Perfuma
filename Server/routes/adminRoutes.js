const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer=require('multer')
const {storage}=require('../utils/cloudinaryConfig')
const upload=multer({storage})

const {
  logIn,
  getUsers,
  blockUser,
  deleteUser,
  addCategory,
  getCategory,
  editCategory,
  deleteCategory,
  addBrand,
  getbrand,
  editBrand,
  deleteBrand,
  addproduct,
  getProducts,
  editProduct,
  deleteProduct,
} = require("../controllers/adminController");



const verifyToken = (req, res, next) => {
  if (req.query.token) {
    const token = req.query.token;
    const decoded = jwt.verify(token, "mysecret");
    if (decoded.email === "admin@gmail.com") {
      next();
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

router.post("/login", logIn);

router.get("/getUsers", verifyToken, getUsers);

router.post("/blockUser", blockUser);

router.post("/deleteUser", deleteUser);

router.post('/addCategory',upload.single('image'),addCategory)

router.get('/getCategory',verifyToken,getCategory)

router.post('/editCategory',upload.single('image'),editCategory)

router.post('/deleteCategory',deleteCategory)

router.post('/addBrand',upload.single('image'),addBrand)

router.get('/getBrand',verifyToken,getbrand)

router.post('/editbrand',upload.single('image'),editBrand)

router.post('/deleteBrand',deleteBrand)

router.post('/addProducts',upload.array('image',5),addproduct)

router.get('/getProducts',verifyToken,getProducts)

router.post('/editproduct',upload.array('image',5),editProduct)

router.post('/deleteProduct',deleteProduct)

module.exports = router;
