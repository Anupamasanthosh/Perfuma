const express = require("express");
const router = express.Router();

const { signUp, 
    login,
    getCategory,
    getProducts
 } = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/getCategory", getCategory);
router.get('/getProducts',getProducts)

module.exports = router;
