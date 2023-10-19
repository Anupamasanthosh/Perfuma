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

module.exports = router;
