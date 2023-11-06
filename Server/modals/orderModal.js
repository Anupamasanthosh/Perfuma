const mongoose=require('mongoose')
const User=require('./userModal')
const Product=require('./productModal')

const Order=new mongoose.Schema(
    {
       user:{type:mongoose.Schema.Types.ObjectId,ref:User,required:true},
       products:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:Product,required:true},
            quantity:{type:Number,required:true}
        }
       ],
       address:{type:mongoose.Schema.Types.ObjectId,required:true},
       createdAt:{type:Date,default:Date.now}
    },{
        collection:'Order'
    }
)
const model=mongoose.model('Order',Order)
module.exports=model