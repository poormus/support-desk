
const asyncHandler = require('express-async-handler')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/UserModel')


//@desc register a new user
//@route /api/users
//@access public
const registerUser= asyncHandler( async(req,res)=>{
    
    const {name,email,password}=req.body

    //validation
    if(!name||!password||!email){
        res.status(400)
        throw new Error('please include all fields')
        
    }

    // check if user exists in data base
    const userExists=await User.findOne({email:email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')

    }

    //hash password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //create user
    const newUser= await User.create({
        name,
        email,
        password:hashedPassword,
        
    })

    if(newUser){
        res.status(201).json(
            {
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                token:generateToken(newUser._id)
            }
        )
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//@desc logs in a  user
//@route /api/users/login
//@access public
const logInUser= asyncHandler(  async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json(
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            }
        )
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

    
})

//@desc gets current user
//@route /api/users/me
//@access private
const getMe=asyncHandler( async (req,res)=>{

    const user={
        name:req.user.name,
        id:req.user._id,
        email:req.user.email
    }
    
    res.status(200).json(user)
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}



module.exports={
    registerUser,
    logInUser,
    getMe
}