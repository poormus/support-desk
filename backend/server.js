const express=require('express')
const dotenv=require('dotenv')
const colors=require('colors')
const {errorHandler}=require('./middleware/ErrorMiddleware')
const connectDB=require('./config/db')
const PORT=process.env.PORT||5000

dotenv.config()
//connect to data base
connectDB()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.json({message:'welcome to front desk api'})
})

//routes
app.use('/api/users',require('./routes/UserRoutes'))
app.use(errorHandler)


app.listen(PORT,()=>{console.log('server started')})