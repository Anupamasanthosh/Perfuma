const express=require('express')
const router = express.Router();

const {
    signUp, login
}=require('../controllers/userController')

router.post('/signUp',signUp)
router.post('/login',login)

module.exports=router