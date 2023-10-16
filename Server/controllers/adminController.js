const express=require('express')
const jwt=require('jsonwebtoken')
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
    }
}