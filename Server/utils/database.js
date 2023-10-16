const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.URL).then(()=>
{
    console.log('Connected to Databse')
}).catch((err)=>
{
    console.log(err)
})
