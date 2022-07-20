
const express=require('express')
const router=express.Router()

//import from controller
const {registerUser,logInUser,getMe} =require('../controller/UserController')

const {protect}=require('../middleware/AuthMiddleware')


router.post('/',registerUser)

router.post('/login',logInUser)

router.post('/me',protect,getMe)


module.exports=router