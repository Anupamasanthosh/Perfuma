const express=require('express')
const jwt=require('jsonwebtoken')
const router = express.Router();

const { logIn,getUsers }
=require('../controllers/adminController')

const verifyToken=(req,res,next)=>
{
    if(req.query.token)
    {
        const token=req.query.token
        const decoded=jwt.verify(token,'mysecret')
        if(decoded.email==='admin@gmail.com')
        {
            next()
        }
    }
    else
    {
        return res.status(401).json({message:'Unauthorized'})
    }
}

router.post('/login',logIn)

router.get('/getUsers',verifyToken,getUsers)

module.exports=router