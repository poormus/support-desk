const path = require('path')
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




//routes
app.use('/api/users',require('./routes/UserRoutes'))
app.use('/api/tickets',require('./routes/TicketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'development') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (req, res) => {
      res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
  }

app.use(errorHandler)

app.listen(PORT,()=>{console.log('server started')})