const express = require("express");
const router = express.Router();

const { signUp, 
    login,
    getCategory,
    getProducts,
    addCartProducts,
    addToCart,
    getCart,
    deleteCart,
    deleteItem,
    addQuantity,
    minusQuantity
 } = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/getCategory", getCategory);
router.get('/getProducts',getProducts)
router.post('/addCartProducts',addCartProducts)
router.post('/addToCart',addToCart)
router.get('/getCart',getCart)
router.post('/deleteCart',deleteCart)
router.post('/deleteItem',deleteItem)
router.post('/addQuantity',addQuantity)
router.post('/minusQuantity',minusQuantity)

module.exports = router;
