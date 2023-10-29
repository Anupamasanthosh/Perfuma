const mongoose=require('mongoose')
const Category=require('./categoryModal')
const Brand=require('./brandModal')

const Products=new mongoose.Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:true},
        image:{type:Array},
        category:{type:mongoose.Schema.Types.ObjectId,ref:Category,required:true},
        brand:{type:mongoose.Schema.Types.ObjectId,ref:Brand,required:true},
        createdAt: {
            type: Date,
            default: Date.now
          },
          price:{type:Number,required:true},
        stock:{type:Number,required:true}
    },{
        collection:'Products'
    }
)
const model=mongoose.model('Products',Products)
module.exports=model