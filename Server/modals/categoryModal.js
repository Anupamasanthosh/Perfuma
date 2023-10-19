const mongoose=require('mongoose')

const Category=new mongoose.Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:true},
        image:{type:String},
    },{
        collection:'Category'
    }
)
const model=mongoose.model('Category',Category)
module.exports=model