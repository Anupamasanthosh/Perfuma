const mongoose=require('mongoose')
const User=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        blocked:{type:Boolean,default:false},
        address: [
            {
              state: { type: String, required: true },
              city: { type: String, required: true },
              street: { type: String, required: true },
              post: { type: String, required: true }
            }
          ]
    },{
        collection:'users'
    }
)
const model=mongoose.model('Userdata',User)
module.exports=model