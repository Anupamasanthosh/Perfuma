const mongoose=require('mongoose')

const User=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        image:{type:String},
        gender:{type:String},
        phone:{type:String},
        blocked:{type:Boolean,default:false},
    },{
        collection:'users'
    }
)
const model=mongoose.model('Userdata',User)
module.exports=model