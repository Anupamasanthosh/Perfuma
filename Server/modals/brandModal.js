const mongoose=require('mongoose')
const Category=require('./categoryModal')

const Brand=new mongoose.Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:true},
        image:{type:String},
        category:{type:mongoose.Schema.Types.ObjectId,ref:Category,required:true}

    },{
        collection:'Brand'
    }
)
const model=mongoose.model('Brand',Brand)
module.exports=model