const express=require('express')
const jwt=require('jsonwebtoken')
const User=require('../modals/userModal')
module.exports={
    logIn:async(req,res)=>
    {
        try
        {
            if(req.body.email==='admin@gmail.com'&&req.body.password==='Admin@123')
            {
                const payload={
                    email:req.body.email
                }
                const token=jwt.sign(payload,'mysecret')
                console.log(token)
                res.status(200).json({message:'Successfull',token})
            }
            else{
                res.status({error:'Invalid Creddentials'})
            }
        }catch(err){
            res.status(500).json({message:err})
        }
    },
    getUsers:async(req,res)=>{
        try
        {
            const users=await User.find()
            if(users)
            {
                return res.status(200).json({message:'users data',users})
            }
            else
            {
                return res.status(400).json({err:'no data'})
            }
        }
        catch(err){
            return res.status(500).json({err})
        }
    }
}