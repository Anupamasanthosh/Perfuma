const express=require('express')
const cors=require('cors')
require('dotenv').config()
require('./utils/database')

const app=express()

app.use(cors())
app.use(express.json());

//routes set up
const userRoutes=require('./routes/userRoutes')
const adminRoutes=require('./routes/adminRoutes')
//routes use
app.use('/api',userRoutes)
app.use('/admin/api',adminRoutes)

//port setup
app.listen(process.env.PORT,()=>
{
    console.log('server started')
})
